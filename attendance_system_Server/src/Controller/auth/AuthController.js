const authService = require('../../Services/auth/AuthService');
const { asyncHandler } = require('../../Utils/errorHandler');
const { authenticate } = require('../../middleware/auth');

class AuthController {
  /**
   * Register a new user
   */
  async register(req, res) {
    try {
      const { firstName, role, email, password, department } = req.body;

      // Validate required fields
      if (!firstName || !email || !password) {
        return res.status(400).json({
          success: false,
          message: 'First name, email, and password are required'
        });
      }

      const { user, accessToken, refreshToken } = await authService.register({ firstName, role, email, password, department });

      res.status(201).json({
        success: true,
        message: 'User registered successfully',
        user,
        accessToken,
        refreshToken
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

      const { user, accessToken, refreshToken } = await authService.login(email, password);

      res.json({
        success: true,
        message: 'Login successful',
        user,
        accessToken,
        refreshToken
      });
    } catch (error) {
      res.status(401).json({
        success: false,
        message: error.message
      });
    }
  }

  /**
   * Logout user (JWT - just return success, client clears tokens)
   */
  logout = asyncHandler(async (req, res) => {
    res.json({
      success: true,
      message: 'Logout successful'
    });
  });

  /**
   * Refresh access token
   */
  refreshToken = asyncHandler(async (req, res) => {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(400).json({
        success: false,
        message: 'Refresh token is required'
      });
    }

    const { accessToken } = await authService.refreshToken(refreshToken);

    res.json({
      success: true,
      accessToken
    });
  });

  /**
   * Get current user (uses JWT from authenticate middleware)
   */
  getCurrentUser = asyncHandler(async (req, res) => {
    const user = await authService.getUserByUuid(req.user.uuid);
    
    res.json({
      success: true,
      user
    });
  });
}

module.exports = new AuthController();

