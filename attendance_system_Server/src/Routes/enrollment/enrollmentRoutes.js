const express = require('express');
const router = express.Router();
const enrollmentController = require('../../Controller/enrollment/EnrollmentController');
const { authenticate } = require('../../middleware/auth');
const { requirePermission, PERMISSIONS } = require('../../middleware/rbac');

// All routes require authentication
router.use(authenticate);

// Create enrollment
router.post(
  '/',
  requirePermission(PERMISSIONS.ENROLLMENTS_CREATE),
  enrollmentController.createEnrollment
);

// Get all enrollments
router.get(
  '/',
  requirePermission(PERMISSIONS.ENROLLMENTS_READ),
  enrollmentController.getAllEnrollments
);

// Get enrollments by room
router.get(
  '/room/:roomId',
  requirePermission(PERMISSIONS.ENROLLMENTS_READ),
  enrollmentController.getEnrollmentsByRoom
);

// Get enrollment by UUID
router.get(
  '/:uuid',
  requirePermission(PERMISSIONS.ENROLLMENTS_READ),
  enrollmentController.getEnrollmentByUuid
);

// Delete enrollment
router.delete(
  '/:uuid',
  requirePermission(PERMISSIONS.ENROLLMENTS_DELETE),
  enrollmentController.deleteEnrollment
);

// Bulk create enrollments
router.post(
  '/bulk',
  requirePermission(PERMISSIONS.ENROLLMENTS_BULK_CREATE),
  enrollmentController.bulkCreateEnrollments
);

module.exports = router;
