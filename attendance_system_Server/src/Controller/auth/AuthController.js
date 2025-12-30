const authService = require('../../Services/auth/AuthService');

class AuthController {
  /**
   * Register a new user
   */
  async register(req, res) {
    try {
      const { firstName, role, email, password } = req.body;

      // Validate required fields
      if (!firstName || !email || !password) {
        return res.status(400).json({
          success: false,
          message: 'First name, email, and password are required'
        });
      }

      const user = await authService.register({ firstName, role, email, password });

      // Set session
      req.session.user = user;
      req.session.isAuthenticated = true;

      res.status(201).json({
        success: true,
        message: 'User registered successfully',
        user
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }

  /**
   * Login user
   */
  async login(req, res) {
    try {
      const { email, password } = req.body;

      // Validate required fields
      if (!email || !password) {
        return res.status(400).json({
          success: false,
          message: 'Email and password are required'
        });
      }

      // Get session metadata
      const sessionData = {
        ipAddress: req.ip || req.connection.remoteAddress,
        userAgent: req.get('user-agent')
      };

      const { user, sessionId, expiresAt } = await authService.login(email, password, sessionData);

      // Set session in express session
      req.session.userId = user.uuid;
      req.session.user = user;
      req.session.sessionId = sessionId;
      req.session.isAuthenticated = true;

      res.json({
        success: true,
        message: 'Login successful',
        user,
        sessionId,
        expiresAt
      });
    } catch (error) {
      res.status(401).json({
        success: false,
        message: error.message
      });
    }
  }

  /**
   * Logout user
   */
  async logout(req, res) {
    try {
      const sessionId = req.session?.sessionId;

      // Delete session from database if exists
      if (sessionId) {
        await authService.deleteSession(sessionId);
      }

      req.session.destroy((err) => {
        if (err) {
          return res.status(500).json({
            success: false,
            message: 'Error logging out'
          });
        }
        res.clearCookie('connect.sid');
        res.json({
          success: true,
          message: 'Logout successful'
        });
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  /**
   * Get current user
   */
  async getCurrentUser(req, res) {
    try {
      if (!req.session.userId || !req.session.sessionId) {
        return res.status(401).json({
          success: false,
          message: 'Not authenticated'
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

      const user = await authService.getUserByUuid(req.session.userId);
      res.json({
        success: true,
        user
      });
    } catch (error) {
      res.status(401).json({
        success: false,
        message: error.message
      });
    }
  }
}

module.exports = new AuthController();

