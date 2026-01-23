const Attendee = require('../../Model/Attendee');
const Student = require('../../Model/Student');
const AttendanceRoom = require('../../Model/AttendanceRoom');
const { ApiError } = require('../../Utils/errorHandler');
const { Op } = require('sequelize');

class AttendeeService {
  /**
   * Create a new attendee (for a specific attendance room)
   */
  async createAttendee(attendeeData, createdBy) {
    try {
      // Validate required fields
      if (!attendeeData.roomId) {
        throw new ApiError('Room ID is required', 400);
      }

      // Check if room exists
      const room = await AttendanceRoom.findByPk(attendeeData.roomId);
      if (!room) {
        throw new ApiError('Attendance room not found', 404);
      }

      // If studentId is provided, get student data
      let student = null;
      if (attendeeData.studentId) {
        student = await Student.findByPk(attendeeData.studentId);
        if (!student) {
          throw new ApiError('Student not found', 404);
        }
        
        // Use student's data for attendee
        attendeeData.name = attendeeData.name || `${student.firstName}${student.middleName ? ` ${student.middleName}` : ''} ${student.surname}`.trim();
        attendeeData.studentNumber = attendeeData.studentNumber || student.studentNumber;
        attendeeData.sex = attendeeData.sex || student.sex;
      } else {
        // If no studentId, name is required
        if (!attendeeData.name) {
          throw new ApiError('Name is required when student ID is not provided', 400);
        }
      }

      // If type is teacher, userId is required
      if (attendeeData.type === 'teacher' && !attendeeData.userId) {
        throw new ApiError('User ID is required for teacher attendees', 400);
      }

      // Check if attendee already exists for this room and student
      if (attendeeData.studentId) {
        const existing = await Attendee.findOne({
          where: {
            roomId: attendeeData.roomId,
            studentId: attendeeData.studentId
          }
        });

        if (existing) {
          throw new ApiError('Student is already enrolled as attendee in this room', 409);
        }
      }

      const attendee = await Attendee.create({
        ...attendeeData,
        status: attendeeData.status || 'active'
      });

      // Reload with associations
      await attendee.reload({
        include: [
          { model: Student, as: 'student' },
          { model: AttendanceRoom, as: 'room' }
        ]
      });

      return attendee;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(`Failed to create attendee: ${error.message}`, 500, error);
    }
  }

  /**
   * Get all attendees with filters
   */
  async getAttendees(filters = {}) {
    try {
      const where = {};

      if (filters.type) {
        where.type = filters.type;
      }

      if (filters.course) {
        where.course = filters.course;
      }

      if (filters.status) {
        where.status = filters.status;
      }

      if (filters.search) {
        where[Op.or] = [
          { name: { [Op.like]: `%${filters.search}%` } },
          { studentNumber: { [Op.like]: `%${filters.search}%` } },
          { email: { [Op.like]: `%${filters.search}%` } }
        ];
      }

      const attendees = await Attendee.findAll({
        where,
        order: [['created_at', 'DESC']],
        include: [
          {
            model: Student,
            as: 'student',
            required: false
          },
          ...(filters.includeUser ? [{
            model: require('../../Model/User'),
            as: 'user',
            attributes: ['uuid', 'firstName', 'lastName', 'email', 'role']
          }] : [])
        ]
      });

      return attendees;
    } catch (error) {
      throw new ApiError(`Failed to get attendees: ${error.message}`, 500, error);
    }
  }

  /**
   * Get attendee by UUID
   */
  async getAttendeeByUuid(uuid) {
    try {
      const attendee = await Attendee.findByPk(uuid, {
        include: [
          {
            model: Student,
            as: 'student'
          },
          {
            model: require('../../Model/User'),
            as: 'user',
            attributes: ['uuid', 'firstName', 'lastName', 'email', 'role']
          }
        ]
      });

      if (!attendee) {
        throw new ApiError('Attendee not found', 404);
      }

      return attendee;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(`Failed to get attendee: ${error.message}`, 500, error);
    }
  }

  /**
   * Get attendee by student number (for a specific room)
   */
  async getAttendeeByStudentNumber(studentNumber, roomId) {
    try {
      const where = { studentNumber };
      if (roomId) {
        where.roomId = roomId;
      }

      const attendee = await Attendee.findOne({
        where,
        include: [
          {
            model: Student,
            as: 'student'
          },
          {
            model: require('../../Model/User'),
            as: 'user',
            attributes: ['uuid', 'firstName', 'lastName', 'email', 'role']
          }
        ]
      });

      if (!attendee) {
        throw new ApiError('Attendee not found', 404);
      }

      return attendee;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(`Failed to get attendee: ${error.message}`, 500, error);
    }
  }

  /**
   * Get attendees by room
   */
  async getAttendeesByRoom(roomId) {
    try {
      const attendees = await Attendee.findAll({
        where: { roomId },
        include: [
          {
            model: Student,
            as: 'student'
          },
          {
            model: require('../../Model/User'),
            as: 'user',
            attributes: ['uuid', 'firstName', 'lastName', 'email', 'role']
          }
        ],
        order: [['created_at', 'DESC']]
      });

      return attendees;
    } catch (error) {
      throw new ApiError(`Failed to get attendees by room: ${error.message}`, 500, error);
    }
  }

  /**
   * Update attendee
   */
  async updateAttendee(uuid, updateData) {
    try {
      const attendee = await Attendee.findByPk(uuid);

      if (!attendee) {
        throw new ApiError('Attendee not found', 404);
      }

      await attendee.update(updateData);
      await attendee.reload();

      return attendee;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(`Failed to update attendee: ${error.message}`, 500, error);
    }
  }

  /**
   * Delete attendee
   */
  async deleteAttendee(uuid) {
    try {
      const attendee = await Attendee.findByPk(uuid);

      if (!attendee) {
        throw new ApiError('Attendee not found', 404);
      }

      await attendee.destroy();

      return { success: true };
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(`Failed to delete attendee: ${error.message}`, 500, error);
    }
  }

  /**
   * Bulk create attendees
   */
  async bulkCreateAttendees(attendeesData) {
    try {
      if (!Array.isArray(attendeesData) || attendeesData.length === 0) {
        throw new ApiError('Attendees data must be a non-empty array', 400);
      }

      // Validate all attendees have required fields
      for (const attendee of attendeesData) {
        if (!attendee.name) {
          throw new ApiError('All attendees must have a name', 400);
        }
      }

      const attendees = await Attendee.bulkCreate(attendeesData, {
        validate: true,
        returning: true
      });

      return attendees;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(`Failed to bulk create attendees: ${error.message}`, 500, error);
    }
  }

  /**
   * Get attendees by course
   */
  async getAttendeesByCourse(course) {
    try {
      const attendees = await Attendee.findAll({
        where: {
          course,
          type: 'student',
          status: 'active'
        },
        order: [['name', 'ASC']]
      });

      return attendees;
    } catch (error) {
      throw new ApiError(`Failed to get attendees by course: ${error.message}`, 500, error);
    }
  }
}

module.exports = new AttendeeService();
