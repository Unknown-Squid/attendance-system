const express = require('express');
const router = express.Router();
const subjectController = require('../../Controller/subject/SubjectController');
const { authenticate } = require('../../middleware/auth');
const { requirePermission, PERMISSIONS } = require('../../middleware/rbac');
const { asyncHandler } = require('../../Utils/errorHandler');

// All routes require authentication
router.use(authenticate);

// Create subject
router.post(
  '/',
  requirePermission(PERMISSIONS.SUBJECTS_CREATE),
  asyncHandler(subjectController.createSubject)
);

// Get all subjects
router.get(
  '/',
  requirePermission(PERMISSIONS.SUBJECTS_READ),
  asyncHandler(subjectController.getAllSubjects)
);

// Get subject by code
router.get(
  '/code/:code',
  requirePermission(PERMISSIONS.SUBJECTS_READ),
  asyncHandler(subjectController.getSubjectByCode)
);

// Get subject by UUID
router.get(
  '/:uuid',
  requirePermission(PERMISSIONS.SUBJECTS_READ),
  asyncHandler(subjectController.getSubjectByUuid)
);

// Update subject
router.put(
  '/:uuid',
  requirePermission(PERMISSIONS.SUBJECTS_UPDATE),
  asyncHandler(subjectController.updateSubject)
);

// Delete subject
router.delete(
  '/:uuid',
  requirePermission(PERMISSIONS.SUBJECTS_UPDATE),
  asyncHandler(subjectController.deleteSubject)
);

module.exports = router;
