const Attendee = require('../../Model/Attendee');
const Student = require('../../Model/Student');
const AttendanceRoom = require('../../Model/AttendanceRoom');
const AttendanceRecord = require('../../Model/AttendanceRecord');
const Enrollment = require('../../Model/Enrollment');
const { Op } = require('sequelize');
const { sequelize } = require('../../../config/database');

class DashboardService {
  /**
   * Get dashboard statistics
   */
  async getDashboardStats(user) {
    try {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const todayStr = today.toISOString().split('T')[0];

      // Get total students (from Student table - created by admin)
      const totalStudents = await Student.count({
        where: { status: 'active' }
      });

      // Get students by gender (from Student table)
      const studentsByGender = await Student.findAll({
        where: { status: 'active' },
        attributes: [
          'sex',
          [sequelize.fn('COUNT', sequelize.col('Student.uuid')), 'count']
        ],
        group: ['sex'],
        raw: true
      });

      const genderStats = {
        male: 0,
        female: 0,
        other: 0
      };

      studentsByGender.forEach(stat => {
        if (stat.sex === 'male') genderStats.male = parseInt(stat.count) || 0;
        else if (stat.sex === 'female') genderStats.female = parseInt(stat.count) || 0;
        else if (stat.sex === 'other') genderStats.other = parseInt(stat.count) || 0;
      });

      // Get total rooms (filter by user role)
      const roomWhere = {};
      if (user.role === 'teacher') {
        roomWhere.createdBy = user.uuid;
      }

      const totalRooms = await AttendanceRoom.count({
        where: { ...roomWhere, category: { [Op.ne]: 'archive' } }
      });

      const roomsByType = await AttendanceRoom.findAll({
        where: { ...roomWhere, category: { [Op.ne]: 'archive' } },
        attributes: [
          'type',
          [sequelize.fn('COUNT', sequelize.col('AttendanceRoom.uuid')), 'count']
        ],
        group: ['type'],
        raw: true
      });

      const roomTypeStats = {
        regular: 0,
        event: 0
      };

      roomsByType.forEach(stat => {
        if (stat.type === 'regular') roomTypeStats.regular = parseInt(stat.count) || 0;
        else if (stat.type === 'event') roomTypeStats.event = parseInt(stat.count) || 0;
      });

      // Get total attendance records
      const attendanceStats = await AttendanceRecord.findAll({
        attributes: [
          'status',
          [sequelize.fn('COUNT', sequelize.col('AttendanceRecord.uuid')), 'count']
        ],
        group: ['status'],
        raw: true
      });

      const attendanceCounts = {
        present: 0,
        absent: 0,
        late: 0,
        excused: 0
      };

      attendanceStats.forEach(stat => {
        const status = stat.status?.toLowerCase();
        if (status && attendanceCounts.hasOwnProperty(status)) {
          attendanceCounts[status] = parseInt(stat.count) || 0;
        }
      });

      // Get today's attendance
      const todayRecords = await AttendanceRecord.findAll({
        where: {
          date: todayStr
        },
        include: [{
          model: AttendanceRoom,
          as: 'room',
          where: user.role === 'teacher' ? roomWhere : {},
          required: false
        }]
      });

      const todayStats = {
        present: 0,
        absent: 0,
        late: 0,
        excused: 0
      };

      todayRecords.forEach(record => {
        const status = record.status?.toLowerCase();
        if (status && todayStats.hasOwnProperty(status)) {
          todayStats[status]++;
        }
      });

      // Get total enrolled students for today
      const enrolledStudents = await Enrollment.count({
        include: [{
          model: AttendanceRoom,
          as: 'room',
          where: { ...roomWhere, category: { [Op.ne]: 'archive' } },
          required: true
        }]
      });

      const todayAttendance = {
        totalStudents: enrolledStudents,
        present: todayStats.present,
        absent: todayStats.absent,
        late: todayStats.late,
        excused: todayStats.excused,
        notRecorded: enrolledStudents - (todayStats.present + todayStats.absent + todayStats.late + todayStats.excused)
      };

      // Get monthly attendance (last 12 months)
      const monthlyAttendance = [];
      const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                     'July', 'August', 'September', 'October', 'November', 'December'];
      
      for (let i = 11; i >= 0; i--) {
        const date = new Date();
        date.setMonth(date.getMonth() - i);
        const monthStart = new Date(date.getFullYear(), date.getMonth(), 1);
        const monthEnd = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        
        const monthRecords = await AttendanceRecord.findAll({
          where: {
            date: {
              [Op.between]: [monthStart.toISOString().split('T')[0], monthEnd.toISOString().split('T')[0]]
            }
          },
          include: [{
            model: AttendanceRoom,
            as: 'room',
            where: user.role === 'teacher' ? roomWhere : {},
            required: false
          }]
        });

        let present = 0;
        let absent = 0;

        monthRecords.forEach(record => {
          if (record.status === 'present') present++;
          else if (record.status === 'absent') absent++;
        });

        monthlyAttendance.push({
          month: months[date.getMonth()],
          present,
          absent
        });
      }

      // Get gender comparison by course (from Student table)
      const genderComparison = await Student.findAll({
        where: { status: 'active' },
        attributes: [
          'course',
          'sex',
          [sequelize.fn('COUNT', sequelize.col('Student.uuid')), 'count']
        ],
        group: ['course', 'sex'],
        raw: true
      });

      const genderCompMap = new Map();
      genderComparison.forEach(stat => {
        const course = stat.course || 'Unassigned';
        if (!genderCompMap.has(course)) {
          genderCompMap.set(course, { category: course, male: 0, female: 0, other: 0 });
        }
        const comp = genderCompMap.get(course);
        if (stat.sex === 'male') comp.male = parseInt(stat.count) || 0;
        else if (stat.sex === 'female') comp.female = parseInt(stat.count) || 0;
        else if (stat.sex === 'other') comp.other = parseInt(stat.count) || 0;
      });

      // Get recent activity (last 10 attendance records)
      const recentRecordsQuery = {
        limit: 10,
        order: [['created_at', 'DESC']],
        include: [
          {
            model: AttendanceRoom,
            as: 'room',
            required: false,
            ...(user.role === 'teacher' ? { where: roomWhere } : {})
          },
          {
            model: Attendee,
            as: 'attendee',
            required: false
          }
        ]
      };

      const recentRecords = await AttendanceRecord.findAll(recentRecordsQuery);

      const recentActivity = recentRecords.map(record => ({
        id: record.uuid,
        type: 'attendance',
        description: `${record.attendee?.name || 'Unknown'} marked as ${record.status} in ${record.room?.enrollmentKey || 'room'}`,
        timestamp: record.createdAt || new Date().toISOString(),
        user: record.markedBy
      }));

      return {
        totalStudents,
        totalStudentsByGender: genderStats,
        totalRooms,
        totalRoomsByType: roomTypeStats,
        totalAttendance: attendanceCounts,
        todayAttendance,
        monthlyAttendance,
        genderComparison: Array.from(genderCompMap.values()),
        recentActivity
      };
    } catch (error) {
      console.error('DashboardService Error:', error);
      throw new Error(`Failed to get dashboard stats: ${error.message}`);
    }
  }
}

module.exports = new DashboardService();
