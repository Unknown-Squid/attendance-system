const attendanceRoomService = require('../../Services/attendance/AttendanceRoomService');
const { asyncHandler } = require('../../Utils/errorHandler');

class AttendanceRoomController {
  /**
   * Get all attendance rooms
   */
  getAllRooms = asyncHandler(async (req, res) => {
    const { category, type } = req.query;
    const filters = {};
    
    if (category) filters.category = category;
    if (type) filters.type = type;
    
    // Teachers can only see their own rooms (unless admin)
    if (req.user.role === 'teacher') {
      filters.createdBy = req.user.uuid;
    }

    const rooms = await attendanceRoomService.getAllRooms(filters);
    
    res.json({
      success: true,
      rooms
    });
  });

  /**
   * Get room by UUID
   */
  getRoomByUuid = asyncHandler(async (req, res) => {
    const { uuid } = req.params;
    const room = await attendanceRoomService.getRoomByUuid(uuid);
    
    res.json({
      success: true,
      room
    });
  });

  /**
   * Get room by enrollment key
   */
  getRoomByEnrollmentKey = asyncHandler(async (req, res) => {
    const { enrollmentKey } = req.params;
    const decodedKey = decodeURIComponent(enrollmentKey);
    const room = await attendanceRoomService.getRoomByEnrollmentKey(decodedKey);
    
    res.json({
      success: true,
      room
    });
  });

  /**
   * Create a new attendance room
   */
  createRoom = asyncHandler(async (req, res) => {
    const { enrollmentKey, type, category, data, subjectId, teacherId, semester, academicYear } = req.body;

    if (!enrollmentKey || !type || !category || !data) {
      return res.status(400).json({
        success: false,
        message: 'Enrollment key, type, category, and data are required'
      });
    }

    const room = await attendanceRoomService.createRoom({
      enrollmentKey,
      type,
      category,
      data,
      subjectId,
      teacherId,
      semester,
      academicYear,
      createdBy: req.user.uuid
    });
    
    res.status(201).json({
      success: true,
      message: 'Attendance room created successfully',
      room
    });
  });

  /**
   * Update attendance room
   */
  updateRoom = asyncHandler(async (req, res) => {
    const { uuid } = req.params;
    const room = await attendanceRoomService.updateRoom(uuid, req.body);
    
    res.json({
      success: true,
      message: 'Attendance room updated successfully',
      room
    });
  });

  /**
   * Delete attendance room
   */
  deleteRoom = asyncHandler(async (req, res) => {
    const { uuid } = req.params;
    await attendanceRoomService.deleteRoom(uuid);
    
    res.json({
      success: true,
      message: 'Attendance room deleted successfully'
    });
  });

  /**
   * Archive attendance room
   */
  archiveRoom = asyncHandler(async (req, res) => {
    const { uuid } = req.params;
    const room = await attendanceRoomService.archiveRoom(uuid);
    
    res.json({
      success: true,
      message: 'Attendance room archived successfully',
      room
    });
  });
}

module.exports = new AttendanceRoomController();

