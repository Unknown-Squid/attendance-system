const userService = require('../../Services/user/UserService');

class UserController {
  /**
   * Get all users
   */
  async getAllUsers(req, res) {
    try {
      const { role, search } = req.query;
      const filters = {};
      
      if (role) filters.role = role;
      if (search) filters.search = search;

      const users = await userService.getAllUsers(filters);
      
      res.json({
        success: true,
        users
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  /**
   * Get user by UUID
   */
  async getUserByUuid(req, res) {
    try {
      const { uuid } = req.params;
      const user = await userService.getUserByUuid(uuid);
      
      res.json({
        success: true,
        user
      });
    } catch (error) {
      res.status(404).json({
        success: false,
        message: error.message
      });
    }
  }

  /**
   * Create a new user
   */
  async createUser(req, res) {
    try {
      const { firstName, role, email, password } = req.body;

      if (!firstName || !email || !password) {
        return res.status(400).json({
          success: false,
          message: 'First name, email, and password are required'
        });
      }

      const user = await userService.createUser({ firstName, role, email, password });
      
      res.status(201).json({
        success: true,
        message: 'User created successfully',
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
   * Update user
   */
  async updateUser(req, res) {
    try {
      const { uuid } = req.params;
      const { firstName, role, email, password } = req.body;

      const user = await userService.updateUser(uuid, { firstName, role, email, password });
      
      res.json({
        success: true,
        message: 'User updated successfully',
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
   * Delete user
   */
  async deleteUser(req, res) {
    try {
      const { uuid } = req.params;
      
      // Prevent deleting yourself
      if (req.session.userId === uuid) {
        return res.status(400).json({
          success: false,
          message: 'You cannot delete your own account'
        });
      }

      await userService.deleteUser(uuid);
      
      res.json({
        success: true,
        message: 'User deleted successfully'
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }
}

module.exports = new UserController();

