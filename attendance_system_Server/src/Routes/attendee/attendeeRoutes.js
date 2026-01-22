const express = require('express');
const router = express.Router();
const attendeeController = require('../../Controller/attendee/AttendeeController');
const { authenticate } = require('../../middleware/auth');
const { requirePermission, PERMISSIONS } = require('../../middleware/rbac');

// All routes require authentication
router.use(authenticate);

// Create attendee
router.post(
  '/',
  requirePermission(PERMISSIONS.ATTENDEES_CREATE),
  attendeeController.createAttendee
);

// Get all attendees
router.get(
  '/',
  requirePermission(PERMISSIONS.ATTENDEES_READ),
  attendeeController.getAllAttendees
);

// Get attendees by course
router.get(
  '/course/:course',
  requirePermission(PERMISSIONS.ATTENDEES_READ),
  attendeeController.getAttendeesByCourse
);

// Get attendees by room
router.get(
  '/room/:roomId',
  requirePermission(PERMISSIONS.ATTENDEES_READ),
  attendeeController.getAttendeesByRoom
);

// Get attendee by UUID
router.get(
  '/:uuid',
  requirePermission(PERMISSIONS.ATTENDEES_READ),
  attendeeController.getAttendeeByUuid
);

// Get attendee by student number
router.get(
  '/student-number/:studentNumber',
  requirePermission(PERMISSIONS.ATTENDEES_READ),
  attendeeController.getAttendeeByStudentNumber
);

// Update attendee
router.put(
  '/:uuid',
  requirePermission(PERMISSIONS.ATTENDEES_UPDATE),
  attendeeController.updateAttendee
);

// Delete attendee
router.delete(
  '/:uuid',
  requirePermission(PERMISSIONS.ATTENDEES_DELETE),
  attendeeController.deleteAttendee
);

// Bulk create attendees
router.post(
  '/bulk',
  requirePermission(PERMISSIONS.ATTENDEES_BULK_CREATE),
  attendeeController.bulkCreateAttendees
);

module.exports = router;
