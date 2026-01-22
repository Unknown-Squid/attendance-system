const attendeeService = require('../../Services/attendee/AttendeeService');
const { asyncHandler } = require('../../Utils/errorHandler');

class AttendeeController {
  /**
   * Create a new attendee
   */
  createAttendee = asyncHandler(async (req, res) => {
    const attendee = await attendeeService.createAttendee(req.body, req.user.uuid);
    
    res.status(201).json({
      success: true,
      attendee,
      message: 'Attendee created successfully'
    });
  });

  /**
   * Get all attendees
   */
  getAllAttendees = asyncHandler(async (req, res) => {
    const { type, course, status, search } = req.query;
    
    const filters = {};
    if (type) filters.type = type;
    if (course) filters.course = course;
    if (status) filters.status = status;
    if (search) filters.search = search;
    
    const attendees = await attendeeService.getAttendees(filters);
    
    res.json({
      success: true,
      attendees
    });
  });

  /**
   * Get attendee by UUID
   */
  getAttendeeByUuid = asyncHandler(async (req, res) => {
    const { uuid } = req.params;
    const attendee = await attendeeService.getAttendeeByUuid(uuid);
    
    res.json({
      success: true,
      attendee
    });
  });

  /**
   * Get attendee by student number (optionally for a specific room)
   */
  getAttendeeByStudentNumber = asyncHandler(async (req, res) => {
    const { studentNumber } = req.params;
    const { roomId } = req.query;
    const attendee = await attendeeService.getAttendeeByStudentNumber(studentNumber, roomId);
    
    res.json({
      success: true,
      attendee
    });
  });

  /**
   * Get attendees by room
   */
  getAttendeesByRoom = asyncHandler(async (req, res) => {
    const { roomId } = req.params;
    const attendees = await attendeeService.getAttendeesByRoom(roomId);
    
    res.json({
      success: true,
      attendees
    });
  });

  /**
   * Update attendee
   */
  updateAttendee = asyncHandler(async (req, res) => {
    const { uuid } = req.params;
    const attendee = await attendeeService.updateAttendee(uuid, req.body);
    
    res.json({
      success: true,
      attendee,
      message: 'Attendee updated successfully'
    });
  });

  /**
   * Delete attendee
   */
  deleteAttendee = asyncHandler(async (req, res) => {
    const { uuid } = req.params;
    await attendeeService.deleteAttendee(uuid);
    
    res.json({
      success: true,
      message: 'Attendee deleted successfully'
    });
  });

  /**
   * Bulk create attendees
   */
  bulkCreateAttendees = asyncHandler(async (req, res) => {
    const { attendees } = req.body;
    const createdAttendees = await attendeeService.bulkCreateAttendees(attendees);
    
    res.status(201).json({
      success: true,
      attendees: createdAttendees,
      message: `${createdAttendees.length} attendees created successfully`
    });
  });

  /**
   * Get attendees by course
   */
  getAttendeesByCourse = asyncHandler(async (req, res) => {
    const { course } = req.params;
    const attendees = await attendeeService.getAttendeesByCourse(course);
    
    res.json({
      success: true,
      attendees
    });
  });
}

module.exports = new AttendeeController();
