import * as userService from "../services/user.service.js";
import { sendSuccess, sendError, sendPaginated } from "../utils/response.js";
import logger from "../utils/logger.js";

/**
 * @route   GET /api/v1/users/profile
 * @desc    Get current user profile
 * @access  Private
 */
export const getProfile = async (req, res) => {
  try {
    const user = await userService.getUserProfile(req.user._id);

    return sendSuccess(res, { user }, "Profile retrieved successfully");
  } catch (error) {
    logger.error("Error in getProfile controller:", error);
    return sendError(res, error.message, 404);
  }
};

/**
 * @route   PUT /api/v1/users/profile
 * @desc    Update current user profile
 * @access  Private
 */
export const updateProfile = async (req, res) => {
  try {
    const { display_name, email } = req.body;

    const user = await userService.updateUserProfile(req.user._id, {
      display_name,
      email,
    });

    return sendSuccess(res, { user }, "Profile updated successfully");
  } catch (error) {
    logger.error("Error in updateProfile controller:", error);
    return sendError(res, error.message, 400);
  }
};

/**
 * @route   PUT /api/v1/users/change-password
 * @desc    Change user password
 * @access  Private
 */
export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    const result = await userService.changePassword(
      req.user._id,
      currentPassword,
      newPassword,
    );

    return sendSuccess(res, null, result.message);
  } catch (error) {
    logger.error("Error in changePassword controller:", error);
    return sendError(res, error.message, 400);
  }
};

/**
 * @route   GET /api/v1/users
 * @desc    Get all users (Admin only)
 * @access  Private/Admin
 */
export const getAllUsers = async (req, res) => {
  try {
    const { page = 1, limit = 10, role, search } = req.query;

    const result = await userService.getAllUsers({
      page,
      limit,
      role,
      search,
    });

    return sendPaginated(
      res,
      result.users,
      result.pagination.page,
      result.pagination.limit,
      result.pagination.total,
      "Users retrieved successfully",
    );
  } catch (error) {
    logger.error("Error in getAllUsers controller:", error);
    return sendError(res, error.message, 500);
  }
};

/**
 * @route   GET /api/v1/users/:id
 * @desc    Get user by ID (Admin only)
 * @access  Private/Admin
 */
export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await userService.getUserById(id);

    return sendSuccess(res, { user }, "User retrieved successfully");
  } catch (error) {
    logger.error("Error in getUserById controller:", error);
    return sendError(res, error.message, 404);
  }
};

/**
 * @route   PUT /api/v1/users/:id/role
 * @desc    Update user role (Admin only)
 * @access  Private/Admin
 */
export const updateUserRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    const user = await userService.updateUserRole(id, role);

    return sendSuccess(res, { user }, "User role updated successfully");
  } catch (error) {
    logger.error("Error in updateUserRole controller:", error);
    return sendError(res, error.message, 400);
  }
};

/**
 * @route   DELETE /api/v1/users/:id
 * @desc    Delete user (Admin only)
 * @access  Private/Admin
 */
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    // Prevent admin from deleting themselves
    if (id === req.user._id.toString()) {
      return sendError(res, "Cannot delete your own account", 400);
    }

    const result = await userService.deleteUser(id);

    return sendSuccess(res, null, result.message);
  } catch (error) {
    logger.error("Error in deleteUser controller:", error);
    return sendError(res, error.message, 400);
  }
};

export default {
  getProfile,
  updateProfile,
  changePassword,
  getAllUsers,
  getUserById,
  updateUserRole,
  deleteUser,
};
