const userService = require('../../Services/user/UserService');
const { asyncHandler } = require('../../Utils/errorHandler');

class UserController {
  /**
   * Get all users
   */
  getAllUsers = asyncHandler(async (req, res) => {
    const { role, search } = req.query;
    const filters = {};
    
    if (role) filters.role = role;
    if (search) filters.search = search;

    const users = await userService.getAllUsers(filters);
    
    res.json({
      success: true,
      users
    });
  });

  /**
   * Get user by UUID
   */
  getUserByUuid = asyncHandler(async (req, res) => {
    const { uuid } = req.params;
    const user = await userService.getUserByUuid(uuid);
    
    res.json({
      success: true,
      user
    });
  });

  /**
   * Create a new user
   */
  createUser = asyncHandler(async (req, res) => {
    const user = await userService.createUser(req.body);
    
    res.status(201).json({
      success: true,
      message: 'User created successfully',
      user
    });
  });

  /**
   * Update user
   */
  updateUser = asyncHandler(async (req, res) => {
    const { uuid } = req.params;
    const user = await userService.updateUser(uuid, req.body);
    
    res.json({
      success: true,
      message: 'User updated successfully',
      user
    });
  });

  /**
   * Delete user
   */
  deleteUser = asyncHandler(async (req, res) => {
    const { uuid } = req.params;
    await userService.deleteUser(uuid);
    
    res.json({
      success: true,
      message: 'User deleted successfully'
    });
  });
}

module.exports = new UserController();
