const express = require('express');
const router = express.Router();
const attendanceRoomController = require('../../Controller/attendance/AttendanceRoomController');
const { authenticate } = require('../../middleware/auth');
const { requirePermission, PERMISSIONS } = require('../../middleware/rbac');
const { asyncHandler } = require('../../Utils/errorHandler');

// All routes require authentication
router.use(authenticate);

// Get all rooms
router.get(
  '/',
  requirePermission(PERMISSIONS.ROOMS_READ),
  asyncHandler(attendanceRoomController.getAllRooms.bind(attendanceRoomController))
);

// Get room by enrollment key (must be before /:uuid route)
router.get(
  '/enrollment/:enrollmentKey',
  requirePermission(PERMISSIONS.ROOMS_READ),
  asyncHandler(attendanceRoomController.getRoomByEnrollmentKey.bind(attendanceRoomController))
);

// Get room by UUID
router.get(
  '/:uuid',
  requirePermission(PERMISSIONS.ROOMS_READ),
  asyncHandler(attendanceRoomController.getRoomByUuid.bind(attendanceRoomController))
);

// Create room
router.post(
  '/',
  requirePermission(PERMISSIONS.ROOMS_CREATE),
  asyncHandler(attendanceRoomController.createRoom.bind(attendanceRoomController))
);

// Update room
router.put(
  '/:uuid',
  requirePermission(PERMISSIONS.ROOMS_UPDATE),
  asyncHandler(attendanceRoomController.updateRoom.bind(attendanceRoomController))
);

// Delete room
router.delete(
  '/:uuid',
  requirePermission(PERMISSIONS.ROOMS_DELETE),
  asyncHandler(attendanceRoomController.deleteRoom.bind(attendanceRoomController))
);

// Archive room
router.patch(
  '/:uuid/archive',
  requirePermission(PERMISSIONS.ROOMS_ARCHIVE),
  asyncHandler(attendanceRoomController.archiveRoom.bind(attendanceRoomController))
);

module.exports = router;

