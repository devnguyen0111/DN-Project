import { authenticate, optionalAuth } from "./auth.middleware.js";
import {
  requireRole,
  requireAdmin,
  requireStaff,
  requireCustomer,
} from "./role.middleware.js";
import { errorHandler, notFoundHandler } from "./errorHandler.middleware.js";
import {
  validate,
  validateQuery,
  validateParams,
} from "./validation.middleware.js";

export {
  // Auth middlewares
  authenticate,
  optionalAuth,
  // Role middlewares
  requireRole,
  requireAdmin,
  requireStaff,
  requireCustomer,
  // Error handling
  errorHandler,
  notFoundHandler,
  // Validation
  validate,
  validateQuery,
  validateParams,
};

export default {
  authenticate,
  optionalAuth,
  requireRole,
  requireAdmin,
  requireStaff,
  requireCustomer,
  errorHandler,
  notFoundHandler,
  validate,
  validateQuery,
  validateParams,
};
