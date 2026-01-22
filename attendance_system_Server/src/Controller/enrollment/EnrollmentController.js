const enrollmentService = require('../../Services/enrollment/EnrollmentService');
const { asyncHandler } = require('../../Utils/errorHandler');

class EnrollmentController {
  /**
   * Create enrollment
   */
  createEnrollment = asyncHandler(async (req, res) => {
    const { roomId, attendeeId } = req.body;
    
    if (!roomId || !attendeeId) {
      return res.status(400).json({
        success: false,
        message: 'Room ID and Attendee ID are required'
      });
    }

    const enrollment = await enrollmentService.createEnrollment(
      roomId,
      attendeeId,
      req.user.uuid
    );
    
    res.status(201).json({
      success: true,
      enrollment,
      message: 'Attendee enrolled successfully'
    });
  });

  /**
   * Get all enrollments
   */
  getAllEnrollments = asyncHandler(async (req, res) => {
    const { roomId, attendeeId } = req.query;
    
    const filters = {};
    if (roomId) filters.roomId = roomId;
    if (attendeeId) filters.attendeeId = attendeeId;
    
    const enrollments = await enrollmentService.getEnrollments(filters);
    
    res.json({
      success: true,
      enrollments
    });
  });

  /**
   * Get enrollment by UUID
   */
  getEnrollmentByUuid = asyncHandler(async (req, res) => {
    const { uuid } = req.params;
    const enrollment = await enrollmentService.getEnrollmentByUuid(uuid);
    
    res.json({
      success: true,
      enrollment
    });
  });

  /**
   * Delete enrollment (unenroll)
   */
  deleteEnrollment = asyncHandler(async (req, res) => {
    const { uuid } = req.params;
    await enrollmentService.deleteEnrollment(uuid);
    
    res.json({
      success: true,
      message: 'Attendee unenrolled successfully'
    });
  });

  /**
   * Bulk create enrollments
   */
  bulkCreateEnrollments = asyncHandler(async (req, res) => {
    const { roomId, attendeeIds } = req.body;
    
    if (!roomId || !Array.isArray(attendeeIds)) {
      return res.status(400).json({
        success: false,
        message: 'Room ID and array of Attendee IDs are required'
      });
    }

    const enrollments = await enrollmentService.bulkCreateEnrollments(
      roomId,
      attendeeIds,
      req.user.uuid
    );
    
    res.status(201).json({
      success: true,
      enrollments,
      message: `${enrollments.length} attendees enrolled successfully`
    });
  });

  /**
   * Get enrollments for a room
   */
  getEnrollmentsByRoom = asyncHandler(async (req, res) => {
    const { roomId } = req.params;
    const enrollments = await enrollmentService.getEnrollmentsByRoom(roomId);
    
    res.json({
      success: true,
      enrollments
    });
  });
}

module.exports = new EnrollmentController();
