import { sendError } from "../utils/response.js";
import logger from "../utils/logger.js";

/**
 * Global error handler middleware
 */
export const errorHandler = (err, req, res, next) => {
  // Log error
  logger.error("Error occurred:", err, {
    method: req.method,
    path: req.path,
    ip: req.ip,
  });

  // Default error
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal server error";

  // Mongoose validation error
  if (err.name === "ValidationError") {
    statusCode = 400;
    const errors = Object.values(err.errors).map((e) => e.message);
    return sendError(res, "Validation error", statusCode, errors);
  }

  // Mongoose duplicate key error
  if (err.code === 11000) {
    statusCode = 400;
    const field = Object.keys(err.keyPattern)[0];
    message = `${field} already exists`;
  }

  // Mongoose cast error (invalid ObjectId)
  if (err.name === "CastError") {
    statusCode = 400;
    message = "Invalid ID format";
  }

  // JWT errors
  if (err.name === "JsonWebTokenError") {
    statusCode = 401;
    message = "Invalid token";
  }

  if (err.name === "TokenExpiredError") {
    statusCode = 401;
    message = "Token expired";
  }

  return sendError(res, message, statusCode);
};

/**
 * 404 Not Found handler
 */
export const notFoundHandler = (req, res) => {
  return sendError(res, `Route ${req.originalUrl} not found`, 404);
};

export default { errorHandler, notFoundHandler };
