const express = require('express');
const router = express.Router();
const userController = require('../../Controller/user/UserController');
const { authenticate } = require('../../middleware/auth');
const { requirePermission, PERMISSIONS } = require('../../middleware/rbac');
const { asyncHandler } = require('../../Utils/errorHandler');

// All routes require authentication
router.use(authenticate);

// Get all users
router.get(
  '/',
  requirePermission(PERMISSIONS.USERS_READ),
  asyncHandler(userController.getAllUsers.bind(userController))
);

// Get user by UUID
router.get(
  '/:uuid',
  requirePermission(PERMISSIONS.USERS_READ),
  asyncHandler(userController.getUserByUuid.bind(userController))
);

// Create user
router.post(
  '/',
  requirePermission(PERMISSIONS.USERS_CREATE),
  asyncHandler(userController.createUser.bind(userController))
);

// Update user
router.put(
  '/:uuid',
  requirePermission(PERMISSIONS.USERS_UPDATE),
  asyncHandler(userController.updateUser.bind(userController))
);

// Delete user
router.delete(
  '/:uuid',
  requirePermission(PERMISSIONS.USERS_DELETE),
  asyncHandler(userController.deleteUser.bind(userController))
);

module.exports = router;

