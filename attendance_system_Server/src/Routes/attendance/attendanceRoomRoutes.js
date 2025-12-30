const express = require('express');
const router = express.Router();
const attendanceRoomController = require('../../Controller/attendance/AttendanceRoomController');
const { requireAuth } = require('../../Utils/authMiddleware');

// All routes require authentication
router.use(requireAuth);

// Get all rooms
router.get('/', attendanceRoomController.getAllRooms.bind(attendanceRoomController));

// Get room by enrollment key (must be before /:uuid route)
router.get('/enrollment/:enrollmentKey', attendanceRoomController.getRoomByEnrollmentKey.bind(attendanceRoomController));

// Get room by UUID
router.get('/:uuid', attendanceRoomController.getRoomByUuid.bind(attendanceRoomController));

// Create room
router.post('/', attendanceRoomController.createRoom.bind(attendanceRoomController));

// Update room
router.put('/:uuid', attendanceRoomController.updateRoom.bind(attendanceRoomController));

// Delete room
router.delete('/:uuid', attendanceRoomController.deleteRoom.bind(attendanceRoomController));

// Archive room
router.patch('/:uuid/archive', attendanceRoomController.archiveRoom.bind(attendanceRoomController));

module.exports = router;

