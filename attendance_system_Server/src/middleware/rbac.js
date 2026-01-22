// RBAC (Role-Based Access Control) Middleware
const { hasPermission, hasAnyPermission, PERMISSIONS } = require('../Utils/permissions');
const { ApiError } = require('../Utils/errorHandler');

/**
 * Middleware to check if user has required permission
 * @param {string|string[]} requiredPermission - Single permission or array of permissions
 * @param {boolean} requireAll - If true, requires all permissions; if false, requires any
 * @param {boolean} allowOwnership - If true, allows access if user owns the resource
 */
const requirePermission = (requiredPermission, requireAll = false, allowOwnership = false) => {
  return async (req, res, next) => {
    try {
      // Get user from request (set by auth middleware)
      const user = req.user;
      
      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'Authentication required'
        });
      }

      const userRole = user.role;
      const permissions = Array.isArray(requiredPermission) 
        ? requiredPermission 
        : [requiredPermission];

      // Check permissions
      let hasAccess = requireAll
        ? hasAnyPermission(userRole, permissions) && 
          permissions.every(p => hasPermission(userRole, p))
        : hasAnyPermission(userRole, permissions);

      // If user doesn't have permission but ownership is allowed, check ownership
      if (!hasAccess && allowOwnership) {
        // Store ownership check flag for controller to use
        req.checkOwnership = true;
        req.userId = user.uuid;
        // Allow through - controller will check ownership
        return next();
      }

      if (!hasAccess) {
        return res.status(403).json({
          success: false,
          message: 'Insufficient permissions to perform this action'
        });
      }

      next();
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Error checking permissions',
        error: error.message
      });
    }
  };
};

/**
 * Middleware to check if user has required role
 * @param {string|string[]} requiredRoles - Single role or array of roles
 */
const requireRole = (requiredRoles) => {
  return async (req, res, next) => {
    try {
      const user = req.user;
      
      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'Authentication required'
        });
      }

      const roles = Array.isArray(requiredRoles) ? requiredRoles : [requiredRoles];
      
      if (!roles.includes(user.role)) {
        return res.status(403).json({
          success: false,
          message: 'Insufficient role privileges'
        });
      }

      next();
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Error checking role',
        error: error.message
      });
    }
  };
};

/**
 * Middleware to check resource ownership
 * Used for operations where users can only modify their own resources
 * @param {Function} getResourceOwnerId - Function to get owner ID from resource
 */
const requireOwnership = (getResourceOwnerId) => {
  return async (req, res, next) => {
    try {
      const user = req.user;
      
      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'Authentication required'
        });
      }

      // Admins can access everything
      if (user.role === 'admin') {
        return next();
      }

      // Get resource owner ID
      const ownerId = await getResourceOwnerId(req);
      
      // Check if user owns the resource
      if (ownerId !== user.uuid) {
        return res.status(403).json({
          success: false,
          message: 'You can only modify your own resources'
        });
      }

      next();
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Error checking ownership',
        error: error.message
      });
    }
  };
};

module.exports = {
  requirePermission,
  requireRole,
  requireOwnership,
  PERMISSIONS,
};
