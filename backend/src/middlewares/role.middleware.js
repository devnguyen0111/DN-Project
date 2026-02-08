import { sendError } from "../utils/response.js";
import { ROLES, hasPermission } from "../constants/roles.js";

/**
 * Middleware to check if user has required role
 */
export const requireRole = (requiredRole) => {
  return (req, res, next) => {
    if (!req.user) {
      return sendError(res, "Authentication required", 401);
    }

    if (!hasPermission(req.user.role, requiredRole)) {
      return sendError(res, "Insufficient permissions", 403);
    }

    next();
  };
};

/**
 * Middleware to check if user is admin
 */
export const requireAdmin = requireRole(ROLES.ADMIN);

/**
 * Middleware to check if user is staff or admin
 */
export const requireStaff = requireRole(ROLES.STAFF);

/**
 * Middleware to check if user is customer (any authenticated user)
 */
export const requireCustomer = requireRole(ROLES.CUSTOMER);

export default { requireRole, requireAdmin, requireStaff, requireCustomer };
