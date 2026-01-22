const express = require('express');
const router = express.Router();
const authController = require('../../Controller/auth/AuthController');
const { authenticate } = require('../../middleware/auth');
const { asyncHandler } = require('../../Utils/errorHandler');

// Register route (no auth required)
router.post('/register', asyncHandler(authController.register.bind(authController)));

// Login route (no auth required)
router.post('/login', asyncHandler(authController.login.bind(authController)));

// Refresh token route (no auth required)
router.post('/refresh', asyncHandler(authController.refreshToken.bind(authController)));

// Logout route (requires auth)
router.post('/logout', authenticate, asyncHandler(authController.logout.bind(authController)));

// Get current user route (requires auth)
router.get('/me', authenticate, asyncHandler(authController.getCurrentUser.bind(authController)));

module.exports = router;

