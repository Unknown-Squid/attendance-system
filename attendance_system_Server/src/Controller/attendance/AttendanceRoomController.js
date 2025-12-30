const attendanceRoomService = require('../../Services/attendance/AttendanceRoomService');

class AttendanceRoomController {
  /**
   * Get all attendance rooms
   */
  async getAllRooms(req, res) {
    try {
      const { category, type } = req.query;
      const filters = {};
      
      if (category) filters.category = category;
      if (type) filters.type = type;
      if (req.session.userId) filters.createdBy = req.session.userId;

      const rooms = await attendanceRoomService.getAllRooms(filters);
      
      res.json({
        success: true,
        rooms
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  /**
   * Get room by UUID
   */
  async getRoomByUuid(req, res) {
    try {
      const { uuid } = req.params;
      const room = await attendanceRoomService.getRoomByUuid(uuid);
      
      res.json({
        success: true,
        room
      });
    } catch (error) {
      res.status(404).json({
        success: false,
        message: error.message
      });
    }
  }

  /**
   * Get room by enrollment key
   */
  async getRoomByEnrollmentKey(req, res) {
    try {
      const { enrollmentKey } = req.params;
      const decodedKey = decodeURIComponent(enrollmentKey);
      const room = await attendanceRoomService.getRoomByEnrollmentKey(decodedKey);
      
      res.json({
        success: true,
        room
      });
    } catch (error) {
      res.status(404).json({
        success: false,
        message: error.message
      });
    }
  }

  /**
   * Create a new attendance room
   */
  async createRoom(req, res) {
    try {
      const { enrollmentKey, type, category, data } = req.body;

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
        createdBy: req.session.userId
      });
      
      res.status(201).json({
        success: true,
        message: 'Attendance room created successfully',
        room
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }

  /**
   * Update attendance room
   */
  async updateRoom(req, res) {
    try {
      const { uuid } = req.params;
      const { enrollmentKey, type, category, data } = req.body;

      const room = await attendanceRoomService.updateRoom(uuid, {
        enrollmentKey,
        type,
        category,
        data
      });
      
      res.json({
        success: true,
        message: 'Attendance room updated successfully',
        room
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }

  /**
   * Delete attendance room
   */
  async deleteRoom(req, res) {
    try {
      const { uuid } = req.params;
      await attendanceRoomService.deleteRoom(uuid);
      
      res.json({
        success: true,
        message: 'Attendance room deleted successfully'
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }

  /**
   * Archive attendance room
   */
  async archiveRoom(req, res) {
    try {
      const { uuid } = req.params;
      const room = await attendanceRoomService.archiveRoom(uuid);
      
      res.json({
        success: true,
        message: 'Attendance room archived successfully',
        room
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }
}

module.exports = new AttendanceRoomController();

