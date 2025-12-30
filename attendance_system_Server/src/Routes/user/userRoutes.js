const express = require('express');
const router = express.Router();
const userController = require('../../Controller/user/UserController');
const { requireAuth, requireRole } = require('../../Utils/authMiddleware');

// All routes require authentication and admin role
router.use(requireAuth);
router.use(requireRole('admin'));

// Get all users
router.get('/', userController.getAllUsers.bind(userController));

// Get user by UUID
router.get('/:uuid', userController.getUserByUuid.bind(userController));

// Create user
router.post('/', userController.createUser.bind(userController));

// Update user
router.put('/:uuid', userController.updateUser.bind(userController));

// Delete user
router.delete('/:uuid', userController.deleteUser.bind(userController));

module.exports = router;

