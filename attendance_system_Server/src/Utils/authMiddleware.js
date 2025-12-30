const authService = require('../Services/auth/AuthService');

/**
 * Middleware to check if user is authenticated
 * Verifies session exists in both express session and database
 */
const requireAuth = async (req, res, next) => {
  try {
    if (!req.session.userId || !req.session.sessionId) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required'
      });
    }

    // Verify session is still valid in database
    try {
      await authService.getSession(req.session.sessionId);
    } catch (error) {
      // Session expired or invalid, destroy express session
      req.session.destroy();
      return res.status(401).json({
        success: false,
        message: 'Session expired'
      });
    }

    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error.message
    });
  }
};

/**
 * Middleware to check if user has specific role
 */
const requireRole = (...roles) => {
  return (req, res, next) => {
    if (!req.session || !req.session.isAuthenticated) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required'
      });
    }

    if (!req.session.user || !roles.includes(req.session.user.role)) {
      return res.status(403).json({
        success: false,
        message: 'Insufficient permissions'
      });
    }

    next();
  };
};

module.exports = {
  requireAuth,
  requireRole
};

