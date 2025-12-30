/**
 * Middleware to check if user is authenticated
 */
const requireAuth = (req, res, next) => {
  if (req.session && req.session.isAuthenticated) {
    return next();
  }
  return res.status(401).json({
    success: false,
    message: 'Authentication required'
  });
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

