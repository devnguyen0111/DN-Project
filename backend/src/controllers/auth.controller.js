import * as authService from "../services/auth.service.js";
import { sendSuccess, sendError } from "../utils/response.js";
import { verifyRefreshToken } from "../utils/jwt.js";
import logger from "../utils/logger.js";

/**
 * @route   POST /api/v1/auth/register
 * @desc    Register a new user
 * @access  Public
 */
export const register = async (req, res) => {
  try {
    const { email, password, display_name } = req.body;

    const result = await authService.registerUser({
      email,
      password,
      display_name,
    });

    return sendSuccess(
      res,
      {
        user: result.user,
        accessToken: result.accessToken,
        refreshToken: result.refreshToken,
      },
      "User registered successfully",
      201,
    );
  } catch (error) {
    logger.error("Error in register controller:", error);
    return sendError(res, error.message, 400);
  }
};

/**
 * @route   POST /api/v1/auth/login
 * @desc    Login user
 * @access  Public
 */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const result = await authService.loginUser(email, password);

    return sendSuccess(
      res,
      {
        user: result.user,
        accessToken: result.accessToken,
        refreshToken: result.refreshToken,
      },
      "Login successful",
    );
  } catch (error) {
    logger.error("Error in login controller:", error);
    return sendError(res, error.message, 401);
  }
};

/**
 * @route   POST /api/v1/auth/refresh
 * @desc    Refresh access token
 * @access  Public
 */
export const refresh = async (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return sendError(res, "Refresh token is required", 400);
    }

    // Verify refresh token
    const decoded = verifyRefreshToken(refreshToken);

    // Generate new access token
    const result = await authService.refreshAccessToken(decoded.userId);

    return sendSuccess(
      res,
      {
        accessToken: result.accessToken,
      },
      "Token refreshed successfully",
    );
  } catch (error) {
    logger.error("Error in refresh controller:", error);
    return sendError(res, error.message, 401);
  }
};

/**
 * @route   POST /api/v1/auth/logout
 * @desc    Logout user (client-side token removal)
 * @access  Private
 */
export const logout = async (req, res) => {
  try {
    // In a stateless JWT setup, logout is handled on client side
    // If using Redis/blacklist, add token to blacklist here

    logger.info("User logged out", { userId: req.user._id });

    return sendSuccess(res, null, "Logout successful");
  } catch (error) {
    logger.error("Error in logout controller:", error);
    return sendError(res, error.message, 500);
  }
};

/**
 * @route   GET /api/v1/auth/me
 * @desc    Get current user
 * @access  Private
 */
export const getMe = async (req, res) => {
  try {
    const user = await authService.getUserById(req.user._id);

    return sendSuccess(res, { user }, "User retrieved successfully");
  } catch (error) {
    logger.error("Error in getMe controller:", error);
    return sendError(res, error.message, 404);
  }
};

export default {
  register,
  login,
  refresh,
  logout,
  getMe,
};
