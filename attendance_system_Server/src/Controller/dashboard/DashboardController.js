const dashboardService = require('../../Services/dashboard/DashboardService');
const { asyncHandler } = require('../../Utils/errorHandler');

class DashboardController {
  /**
   * Get dashboard statistics
   */
  getStats = asyncHandler(async (req, res) => {
    const stats = await dashboardService.getDashboardStats(req.user);
    
    res.json({
      success: true,
      stats
    });
  });
}

module.exports = new DashboardController();
