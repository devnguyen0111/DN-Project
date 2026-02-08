import { verifyAccessToken } from "../utils/jwt.js";
import { sendError } from "../utils/response.js";
import { User } from "../models/index.js";

/**
 * Middleware to verify JWT token and authenticate user
 */
export const authenticate = async (req, res, next) => {
  try {
    // Get token from header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return sendError(res, "No token provided", 401);
    }

    const token = authHeader.split(" ")[1];

    // Verify token
    const decoded = verifyAccessToken(token);

    // Get user from database
    const user = await User.findById(decoded.userId).select("-password_hash");

    if (!user) {
      return sendError(res, "User not found", 404);
    }

    // Attach user to request object
    req.user = user;

    next();
  } catch (error) {
    return sendError(res, error.message || "Invalid or expired token", 401);
  }
};

/**
 * Optional authentication - doesn't fail if no token
 */
export const optionalAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith("Bearer ")) {
      const token = authHeader.split(" ")[1];
      const decoded = verifyAccessToken(token);
      const user = await User.findById(decoded.userId).select("-password_hash");

      if (user) {
        req.user = user;
      }
    }

    next();
  } catch (error) {
    // Don't fail, just continue without user
    next();
  }
};

export default { authenticate, optionalAuth };
