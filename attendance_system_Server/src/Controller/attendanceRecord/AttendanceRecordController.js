const attendanceRecordService = require('../../Services/attendanceRecord/AttendanceRecordService');
const { asyncHandler } = require('../../Utils/errorHandler');

class AttendanceRecordController {
  /**
   * Create attendance record
   */
  createRecord = asyncHandler(async (req, res) => {
    const record = await attendanceRecordService.createRecord(req.body, req.user.uuid);
    
    res.status(201).json({
      success: true,
      record,
      message: 'Attendance recorded successfully'
    });
  });

  /**
   * Get all records
   */
  getAllRecords = asyncHandler(async (req, res) => {
    const { roomId, attendeeId, date, status, dateFrom, dateTo } = req.query;
    
    const filters = {};
    if (roomId) filters.roomId = roomId;
    if (attendeeId) filters.attendeeId = attendeeId;
    if (date) filters.date = date;
    if (status) filters.status = status;
    if (dateFrom && dateTo) {
      filters.dateFrom = dateFrom;
      filters.dateTo = dateTo;
    }
    
    const records = await attendanceRecordService.getRecords(filters);
    
    res.json({
      success: true,
      records
    });
  });

  /**
   * Get record by UUID
   */
  getRecordByUuid = asyncHandler(async (req, res) => {
    const { uuid } = req.params;
    const record = await attendanceRecordService.getRecordByUuid(uuid);
    
    res.json({
      success: true,
      record
    });
  });

  /**
   * Update record
   */
  updateRecord = asyncHandler(async (req, res) => {
    const { uuid } = req.params;
    const record = await attendanceRecordService.updateRecord(uuid, req.body);
    
    res.json({
      success: true,
      record,
      message: 'Attendance record updated successfully'
    });
  });

  /**
   * Delete record
   * Allows deletion if user has RECORDS_DELETE permission OR if user created the record
   */
  deleteRecord = asyncHandler(async (req, res) => {
    const { uuid } = req.params;
    const userId = req.user.uuid;
    const userRole = req.user.role;
    
    // If ownership check is needed (user doesn't have general permission)
    if (req.checkOwnership) {
      // Get the record to check ownership
      const record = await attendanceRecordService.getRecordByUuid(uuid);
      
      // Admins can delete any record
      if (userRole === 'admin') {
        await attendanceRecordService.deleteRecord(uuid);
        return res.json({
          success: true,
          message: 'Attendance record deleted successfully'
        });
      }
      
      // Check if user created this record
      if (!record.markedBy || record.markedBy !== userId) {
        return res.status(403).json({
          success: false,
          message: 'You can only delete attendance records you created'
        });
      }
    }
    
    await attendanceRecordService.deleteRecord(uuid);
    
    res.json({
      success: true,
      message: 'Attendance record deleted successfully'
    });
  });

  /**
   * Get records for a room
   */
  getRecordsByRoom = asyncHandler(async (req, res) => {
    const { roomId } = req.params;
    const { date, status } = req.query;
    
    const filters = {};
    if (date) filters.date = date;
    if (status) filters.status = status;
    
    const records = await attendanceRecordService.getRecordsByRoom(roomId, filters);
    
    res.json({
      success: true,
      records
    });
  });
}

module.exports = new AttendanceRecordController();
