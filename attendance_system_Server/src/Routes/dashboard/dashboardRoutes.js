const express = require('express');
const router = express.Router();
const dashboardController = require('../../Controller/dashboard/DashboardController');
const { authenticate } = require('../../middleware/auth');
const { asyncHandler } = require('../../Utils/errorHandler');

// All routes require authentication
router.use(authenticate);

// Get dashboard statistics
router.get(
  '/stats',
  asyncHandler(dashboardController.getStats)
);

module.exports = router;
