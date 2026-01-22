const Enrollment = require('../../Model/Enrollment');
const Attendee = require('../../Model/Attendee');
const AttendanceRoom = require('../../Model/AttendanceRoom');
const { ApiError } = require('../../Utils/errorHandler');

class EnrollmentService {
  /**
   * Create enrollment (enroll attendee in room)
   */
  async createEnrollment(roomId, attendeeId, enrolledBy) {
    try {
      // Check if room exists
      const room = await AttendanceRoom.findByPk(roomId);
      if (!room) {
        throw new ApiError('Attendance room not found', 404);
      }

      // Check if attendee exists
      const attendee = await Attendee.findByPk(attendeeId);
      if (!attendee) {
        throw new ApiError('Attendee not found', 404);
      }

      // Check if already enrolled
      const existing = await Enrollment.findOne({
        where: { roomId, attendeeId }
      });

      if (existing) {
        throw new ApiError('Attendee is already enrolled in this room', 409);
      }

      const enrollment = await Enrollment.create({
        roomId,
        attendeeId,
        enrolledBy,
        enrolledAt: new Date()
      });

      // Reload with associations
      await enrollment.reload({
        include: [
          { model: AttendanceRoom, as: 'room' },
          { model: Attendee, as: 'attendee' }
        ]
      });

      return enrollment;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(`Failed to create enrollment: ${error.message}`, 500, error);
    }
  }

  /**
   * Get all enrollments with filters
   */
  async getEnrollments(filters = {}) {
    try {
      const where = {};

      if (filters.roomId) {
        where.roomId = filters.roomId;
      }

      if (filters.attendeeId) {
        where.attendeeId = filters.attendeeId;
      }

      const enrollments = await Enrollment.findAll({
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
        order: [['enrolled_at', 'DESC']]
      });

      return enrollments;
    } catch (error) {
      throw new ApiError(`Failed to get enrollments: ${error.message}`, 500, error);
    }
  }

  /**
   * Get enrollment by UUID
   */
  async getEnrollmentByUuid(uuid) {
    try {
      const enrollment = await Enrollment.findByPk(uuid, {
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

      if (!enrollment) {
        throw new ApiError('Enrollment not found', 404);
      }

      return enrollment;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(`Failed to get enrollment: ${error.message}`, 500, error);
    }
  }

  /**
   * Delete enrollment (unenroll)
   */
  async deleteEnrollment(uuid) {
    try {
      const enrollment = await Enrollment.findByPk(uuid);

      if (!enrollment) {
        throw new ApiError('Enrollment not found', 404);
      }

      await enrollment.destroy();

      return { success: true };
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(`Failed to delete enrollment: ${error.message}`, 500, error);
    }
  }

  /**
   * Bulk create enrollments
   */
  async bulkCreateEnrollments(roomId, attendeeIds, enrolledBy) {
    try {
      if (!Array.isArray(attendeeIds) || attendeeIds.length === 0) {
        throw new ApiError('Attendee IDs must be a non-empty array', 400);
      }

      // Check if room exists
      const room = await AttendanceRoom.findByPk(roomId);
      if (!room) {
        throw new ApiError('Attendance room not found', 404);
      }

      // Check existing enrollments
      const existing = await Enrollment.findAll({
        where: {
          roomId,
          attendeeId: attendeeIds
        }
      });

      const existingIds = existing.map(e => e.attendeeId);
      const newIds = attendeeIds.filter(id => !existingIds.includes(id));

      if (newIds.length === 0) {
        throw new ApiError('All attendees are already enrolled', 409);
      }

      // Bulk create
      const enrollments = await Enrollment.bulkCreate(
        newIds.map(attendeeId => ({
          roomId,
          attendeeId,
          enrolledBy,
          enrolledAt: new Date()
        })),
        { returning: true }
      );

      return enrollments;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(`Failed to bulk create enrollments: ${error.message}`, 500, error);
    }
  }

  /**
   * Get enrollments for a room
   */
  async getEnrollmentsByRoom(roomId) {
    try {
      const enrollments = await Enrollment.findAll({
        where: { roomId },
        include: [
          {
            model: Attendee,
            as: 'attendee'
          }
        ],
        order: [['enrolled_at', 'DESC']]
      });

      return enrollments;
    } catch (error) {
      throw new ApiError(`Failed to get enrollments by room: ${error.message}`, 500, error);
    }
  }
}

module.exports = new EnrollmentService();
