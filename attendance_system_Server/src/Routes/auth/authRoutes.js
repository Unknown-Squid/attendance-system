const express = require('express');
const router = express.Router();
const authController = require('../../Controller/auth/AuthController');

// Register route
router.post('/register', authController.register.bind(authController));

// Login route
router.post('/login', authController.login.bind(authController));

// Logout route
router.post('/logout', authController.logout.bind(authController));

// Get current user route
router.get('/me', authController.getCurrentUser.bind(authController));

module.exports = router;

