const bcrypt = require('bcrypt');
const User = require('../../Model/User');
const Session = require('../../Model/Session');

class AuthService {
  /**
   * Register a new user
   * @param {Object} userData - User registration data
   * @returns {Promise<Object>} Created user (without password)
   */
  async register(userData) {
    const { firstName, role, email, password } = userData;

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
      password: hashedPassword
    });

    // Return user without password
    const userJson = user.toJSON();
    delete userJson.password;
    return userJson;
  }

  /**
   * Login user
   * @param {string} email - User email
   * @param {string} password - User password
   * @param {Object} sessionData - Session metadata (ipAddress, userAgent)
   * @returns {Promise<Object>} User data and session info (without password)
   */
  async login(email, password, sessionData = {}) {
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

    // Create session (expires in 24 hours)
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 24);

    const session = await Session.create({
      userId: user.uuid,
      expiresAt,
      ipAddress: sessionData.ipAddress || null,
      userAgent: sessionData.userAgent || null
    });

    // Return user without password and session info
    const userJson = user.toJSON();
    delete userJson.password;
    return {
      user: userJson,
      sessionId: session.sessionId,
      expiresAt: session.expiresAt
    };
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

