const User = require('../../Model/User');
const bcrypt = require('bcrypt');

class UserService {
  /**
   * Get all users
   * @param {Object} filters - Optional filters (role, search)
   * @returns {Promise<Array>} List of users (without passwords)
   */
  async getAllUsers(filters = {}) {
    const where = {};
    
    if (filters.role) {
      where.role = filters.role;
    }
    
    if (filters.search) {
      where[require('sequelize').Op.or] = [
        { firstName: { [require('sequelize').Op.like]: `%${filters.search}%` } },
        { email: { [require('sequelize').Op.like]: `%${filters.search}%` } }
      ];
    }

    const users = await User.findAll({
      where,
      attributes: { exclude: ['password'] },
      order: [['created_at', 'DESC']]
    });

    return users.map(user => user.toJSON());
  }

  /**
   * Get user by UUID
   * @param {string} uuid - User UUID
   * @returns {Promise<Object>} User data (without password)
   */
  async getUserByUuid(uuid) {
    const user = await User.findByPk(uuid, {
      attributes: { exclude: ['password'] }
    });

    if (!user) {
      throw new Error('User not found');
    }

    return user.toJSON();
  }

  /**
   * Create a new user
   * @param {Object} userData - User data
   * @returns {Promise<Object>} Created user (without password)
   */
  async createUser(userData) {
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
      role: role || 'student',
      email,
      password: hashedPassword
    });

    // Return user without password
    const userJson = user.toJSON();
    delete userJson.password;
    return userJson;
  }

  /**
   * Update user
   * @param {string} uuid - User UUID
   * @param {Object} userData - Updated user data
   * @returns {Promise<Object>} Updated user (without password)
   */
  async updateUser(uuid, userData) {
    const user = await User.findByPk(uuid);
    if (!user) {
      throw new Error('User not found');
    }

    const { firstName, role, email, password } = userData;

    // Check if email is being changed and if it's already taken
    if (email && email !== user.email) {
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        throw new Error('User with this email already exists');
      }
      user.email = email;
    }

    if (firstName) user.firstName = firstName;
    if (role) user.role = role;

    // Hash new password if provided
    if (password) {
      user.password = await bcrypt.hash(password, 10);
    }

    await user.save();

    // Return user without password
    const userJson = user.toJSON();
    delete userJson.password;
    return userJson;
  }

  /**
   * Delete user
   * @param {string} uuid - User UUID
   * @returns {Promise<boolean>} Success status
   */
  async deleteUser(uuid) {
    const user = await User.findByPk(uuid);
    if (!user) {
      throw new Error('User not found');
    }

    await user.destroy();
    return true;
  }
}

module.exports = new UserService();

