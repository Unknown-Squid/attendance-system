const express = require('express');
const router = express.Router();
const studentController = require('../../Controller/student/StudentController');
const { authenticate } = require('../../middleware/auth');
const { requirePermission, PERMISSIONS } = require('../../middleware/rbac');

// All routes require authentication
router.use(authenticate);

// Create student
router.post(
  '/',
  requirePermission(PERMISSIONS.MANAGE_STUDENTS),
  studentController.createStudent
);

// Get all students
router.get(
  '/',
  requirePermission(PERMISSIONS.VIEW_STUDENTS),
  studentController.getStudents
);

// Get student by student number
router.get(
  '/student-number/:studentNumber',
  requirePermission(PERMISSIONS.VIEW_STUDENTS),
  studentController.getStudentByStudentNumber
);

// Get student by UUID
router.get(
  '/:uuid',
  requirePermission(PERMISSIONS.VIEW_STUDENTS),
  studentController.getStudentByUuid
);

// Update student
router.put(
  '/:uuid',
  requirePermission(PERMISSIONS.MANAGE_STUDENTS),
  studentController.updateStudent
);

// Delete student
router.delete(
  '/:uuid',
  requirePermission(PERMISSIONS.MANAGE_STUDENTS),
  studentController.deleteStudent
);

module.exports = router;
