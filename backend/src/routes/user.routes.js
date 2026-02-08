import express from "express";
import * as userController from "../controllers/user.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { requireAdmin } from "../middlewares/role.middleware.js";
import {
  validate,
  validateParams,
  validateQuery,
} from "../middlewares/validation.middleware.js";
import {
  updateProfileSchema,
  changePasswordSchema,
  updateRoleSchema,
  userIdParamSchema,
  getUsersQuerySchema,
} from "../validators/user.validator.js";

const router = express.Router();

// All user routes require authentication
router.use(authenticate);

/**
 * @route   GET /api/v1/users/profile
 * @desc    Get current user profile
 * @access  Private
 */
router.get("/profile", userController.getProfile);

/**
 * @route   PUT /api/v1/users/profile
 * @desc    Update current user profile
 * @access  Private
 */
router.put(
  "/profile",
  validate(updateProfileSchema),
  userController.updateProfile,
);

/**
 * @route   PUT /api/v1/users/change-password
 * @desc    Change user password
 * @access  Private
 */
router.put(
  "/change-password",
  validate(changePasswordSchema),
  userController.changePassword,
);

// Admin only routes
/**
 * @route   GET /api/v1/users
 * @desc    Get all users (Admin only)
 * @access  Private/Admin
 */
router.get(
  "/",
  requireAdmin,
  validateQuery(getUsersQuerySchema),
  userController.getAllUsers,
);

/**
 * @route   GET /api/v1/users/:id
 * @desc    Get user by ID (Admin only)
 * @access  Private/Admin
 */
router.get(
  "/:id",
  requireAdmin,
  validateParams(userIdParamSchema),
  userController.getUserById,
);

/**
 * @route   PUT /api/v1/users/:id/role
 * @desc    Update user role (Admin only)
 * @access  Private/Admin
 */
router.put(
  "/:id/role",
  requireAdmin,
  validateParams(userIdParamSchema),
  validate(updateRoleSchema),
  userController.updateUserRole,
);

/**
 * @route   DELETE /api/v1/users/:id
 * @desc    Delete user (Admin only)
 * @access  Private/Admin
 */
router.delete(
  "/:id",
  requireAdmin,
  validateParams(userIdParamSchema),
  userController.deleteUser,
);

export default router;
