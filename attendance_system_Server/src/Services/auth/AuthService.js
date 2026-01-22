const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../../Model/User');
const Session = require('../../Model/Session');

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
const JWT_ACCESS_EXPIRY = process.env.JWT_ACCESS_EXPIRY || '15m';
const JWT_REFRESH_EXPIRY = process.env.JWT_REFRESH_EXPIRY || '7d';

class AuthService {
  /**
   * Register a new user
   * @param {Object} userData - User registration data
   * @returns {Promise<Object>} Created user (without password)
   */
  async register(userData) {
    const { firstName, role, email, password, department } = userData;

    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      firstName,
      role,
      email,
      password: hashedPassword,
      department
    });

    // Generate JWT tokens
    const accessToken = jwt.sign(
      { userId: user.uuid, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: JWT_ACCESS_EXPIRY }
    );

    const refreshToken = jwt.sign(
      { userId: user.uuid, type: 'refresh' },
      JWT_SECRET,
      { expiresIn: JWT_REFRESH_EXPIRY }
    );

    // Return user without password and tokens
    const userJson = user.toJSON();
    delete userJson.password;
    return {
      user: userJson,
      accessToken,
      refreshToken
    };
  }

  /**
   * Login user and generate JWT tokens
   * @param {string} email - User email
   * @param {string} password - User password
   * @returns {Promise<Object>} User data and JWT tokens
   */
  async login(email, password) {
    // Find user by email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new Error('Invalid email or password');
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw new Error('Invalid email or password');
    }

    // Generate JWT tokens
    const accessToken = jwt.sign(
      { userId: user.uuid, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: JWT_ACCESS_EXPIRY }
    );

    const refreshToken = jwt.sign(
      { userId: user.uuid, type: 'refresh' },
      JWT_SECRET,
      { expiresIn: JWT_REFRESH_EXPIRY }
    );

    // Return user without password and tokens
    const userJson = user.toJSON();
    delete userJson.password;
    return {
      user: userJson,
      accessToken,
      refreshToken
    };
  }

  /**
   * Refresh access token
   * @param {string} refreshToken - Refresh token
   * @returns {Promise<Object>} New access token
   */
  async refreshToken(refreshToken) {
    try {
      // Verify refresh token
      const decoded = jwt.verify(refreshToken, JWT_SECRET);
      
      if (decoded.type !== 'refresh') {
        throw new Error('Invalid token type');
      }

      // Get user
      const user = await User.findByPk(decoded.userId);
      if (!user) {
        throw new Error('User not found');
      }

      // Generate new access token
      const accessToken = jwt.sign(
        { userId: user.uuid, email: user.email, role: user.role },
        JWT_SECRET,
        { expiresIn: JWT_ACCESS_EXPIRY }
      );

      return { accessToken };
    } catch (error) {
      throw new Error('Invalid or expired refresh token');
    }
  }

  /**
   * Get user by UUID
   * @param {string} uuid - User UUID
   * @returns {Promise<Object>} User data (without password)
   */
  async getUserByUuid(uuid) {
    const user = await User.findByPk(uuid);
    if (!user) {
      throw new Error('User not found');
    }

    const userJson = user.toJSON();
    delete userJson.password;
    return userJson;
  }

  /**
   * Get session by session ID
   * @param {string} sessionId - Session ID
   * @returns {Promise<Object>} Session data
   */
  async getSession(sessionId) {
    const session = await Session.findOne({
      where: { sessionId }
    });

    if (!session) {
      throw new Error('Session not found');
    }

    // Check if session is expired
    if (new Date() > new Date(session.expiresAt)) {
      await session.destroy();
      throw new Error('Session expired');
    }

    return session;
  }

  /**
   * Delete session (logout)
   * @param {string} sessionId - Session ID
   * @returns {Promise<boolean>} Success status
   */
  async deleteSession(sessionId) {
    const session = await Session.findOne({ where: { sessionId } });
    if (session) {
      await session.destroy();
      return true;
    }
    return false;
  }

  /**
   * Delete all sessions for a user
   * @param {string} userId - User UUID
   * @returns {Promise<number>} Number of deleted sessions
   */
  async deleteAllUserSessions(userId) {
    const deletedCount = await Session.destroy({ where: { userId } });
    return deletedCount;
  }

  /**
   * Clean up expired sessions
   * @returns {Promise<number>} Number of deleted sessions
   */
  async cleanupExpiredSessions() {
    const deletedCount = await Session.destroy({
      where: {
        expiresAt: {
          [require('sequelize').Op.lt]: new Date()
        }
      }
    });
    return deletedCount;
  }
}

module.exports = new AuthService();

