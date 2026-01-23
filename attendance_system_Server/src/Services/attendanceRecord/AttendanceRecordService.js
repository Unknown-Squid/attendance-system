const AttendanceRecord = require('../../Model/AttendanceRecord');
const AttendanceRoom = require('../../Model/AttendanceRoom');
const Attendee = require('../../Model/Attendee');
const { ApiError } = require('../../Utils/errorHandler');
const { Op } = require('sequelize');

class AttendanceRecordService {
  /**
   * Create attendance record
   */
  async createRecord(recordData, markedBy) {
    try {
      // Validate required fields
      if (!recordData.roomId || !recordData.attendeeId || !recordData.date) {
        throw new ApiError('Room ID, Attendee ID, and date are required', 400);
      }

      // Check if room exists
      const room = await AttendanceRoom.findByPk(recordData.roomId);
      if (!room) {
        throw new ApiError('Attendance room not found', 404);
      }

      // Check if attendee exists
      const attendee = await Attendee.findByPk(recordData.attendeeId);
      if (!attendee) {
        throw new ApiError('Attendee not found', 404);
      }

      // Check if already marked for this date
      const existing = await AttendanceRecord.findOne({
        where: {
          roomId: recordData.roomId,
          attendeeId: recordData.attendeeId,
          date: recordData.date
        }
      });

      if (existing) {
        throw new ApiError('Attendance already marked for this date', 409);
      }

      const record = await AttendanceRecord.create({
        ...recordData,
        markedBy,
        time: recordData.time || new Date().toTimeString().slice(0, 5)
      });

      // Reload with associations
      await record.reload({
        include: [
          { model: AttendanceRoom, as: 'room' },
          { model: Attendee, as: 'attendee' }
        ]
      });

      return record;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(`Failed to create attendance record: ${error.message}`, 500, error);
    }
  }

  /**
   * Get all records with filters
   */
  async getRecords(filters = {}) {
    try {
      const where = {};

      if (filters.roomId) {
        where.roomId = filters.roomId;
      }

      if (filters.attendeeId) {
        where.attendeeId = filters.attendeeId;
      }

      if (filters.date) {
        where.date = filters.date;
      }

      if (filters.status) {
        where.status = filters.status;
      }

      if (filters.dateFrom && filters.dateTo) {
        where.date = {
          [Op.between]: [filters.dateFrom, filters.dateTo]
        };
      }

      const records = await AttendanceRecord.findAll({
        where,
        include: [
          {
            model: AttendanceRoom,
            as: 'room',
            include: [
              { model: require('../../Model/Subject'), as: 'subject' }
            ]
          },
          {
            model: Attendee,
            as: 'attendee'
          }
        ],
        order: [['date', 'DESC'], ['time', 'DESC']]
      });

      return records;
    } catch (error) {
      throw new ApiError(`Failed to get attendance records: ${error.message}`, 500, error);
    }
  }

  /**
   * Get record by UUID
   */
  async getRecordByUuid(uuid) {
    try {
      const record = await AttendanceRecord.findByPk(uuid, {
        include: [
          {
            model: AttendanceRoom,
            as: 'room',
            include: [
              { model: require('../../Model/Subject'), as: 'subject' }
            ]
          },
          {
            model: Attendee,
            as: 'attendee'
          }
        ]
      });

      if (!record) {
        throw new ApiError('Attendance record not found', 404);
      }

      return record;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(`Failed to get attendance record: ${error.message}`, 500, error);
    }
  }

  /**
   * Update record
   */
  async updateRecord(uuid, updateData) {
    try {
      const record = await AttendanceRecord.findByPk(uuid);

      if (!record) {
        throw new ApiError('Attendance record not found', 404);
      }

      await record.update(updateData);
      await record.reload({
        include: [
          { model: AttendanceRoom, as: 'room' },
          { model: Attendee, as: 'attendee' }
        ]
      });

      return record;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(`Failed to update attendance record: ${error.message}`, 500, error);
    }
  }

  /**
   * Delete record
   */
  async deleteRecord(uuid) {
    try {
      const record = await AttendanceRecord.findByPk(uuid);

      if (!record) {
        throw new ApiError('Attendance record not found', 404);
      }

      await record.destroy();

      return { success: true };
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(`Failed to delete attendance record: ${error.message}`, 500, error);
    }
  }

  /**
   * Get records for a room
   */
  async getRecordsByRoom(roomId, filters = {}) {
    try {
      const where = { roomId };

      if (filters.date) {
        where.date = filters.date;
      }

      if (filters.status) {
        where.status = filters.status;
      }

      const records = await AttendanceRecord.findAll({
        where,
        include: [
          {
            model: Attendee,
            as: 'attendee'
          }
        ],
        order: [['date', 'DESC'], ['time', 'DESC']]
      });

      return records;
    } catch (error) {
      throw new ApiError(`Failed to get records by room: ${error.message}`, 500, error);
    }
  }
}

module.exports = new AttendanceRecordService();
