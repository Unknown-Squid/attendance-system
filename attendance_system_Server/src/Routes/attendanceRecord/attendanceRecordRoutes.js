const express = require('express');
const router = express.Router();
const attendanceRecordController = require('../../Controller/attendanceRecord/AttendanceRecordController');
const { authenticate } = require('../../middleware/auth');
const { requirePermission, PERMISSIONS } = require('../../middleware/rbac');

// All routes require authentication
router.use(authenticate);

// Create record
router.post(
  '/',
  requirePermission(PERMISSIONS.RECORDS_CREATE),
  attendanceRecordController.createRecord
);

// Get all records
router.get(
  '/',
  requirePermission(PERMISSIONS.RECORDS_READ),
  attendanceRecordController.getAllRecords
);

// Get records by room
router.get(
  '/room/:roomId',
  requirePermission(PERMISSIONS.RECORDS_READ),
  attendanceRecordController.getRecordsByRoom
);

// Get record by UUID
router.get(
  '/:uuid',
  requirePermission(PERMISSIONS.RECORDS_READ),
  attendanceRecordController.getRecordByUuid
);

// Update record
router.put(
  '/:uuid',
  requirePermission(PERMISSIONS.RECORDS_UPDATE),
  attendanceRecordController.updateRecord
);

// Delete record - allow if user has permission OR if user created the record
router.delete(
  '/:uuid',
  requirePermission(PERMISSIONS.RECORDS_DELETE, false, true), // allowOwnership = true
  attendanceRecordController.deleteRecord
);

module.exports = router;
