import Joi from "joi";

/**
 * Validation schema for updating user profile
 */
export const updateProfileSchema = Joi.object({
  display_name: Joi.string().min(2).max(100).trim().messages({
    "string.min": "Display name must be at least 2 characters long",
    "string.max": "Display name cannot exceed 100 characters",
  }),
  email: Joi.string().email().lowercase().trim().messages({
    "string.email": "Please provide a valid email address",
  }),
})
  .min(1)
  .messages({
    "object.min": "At least one field must be provided",
  });

/**
 * Validation schema for changing password
 */
export const changePasswordSchema = Joi.object({
  currentPassword: Joi.string().required().messages({
    "any.required": "Current password is required",
  }),
  newPassword: Joi.string()
    .min(6)
    .required()
    .invalid(Joi.ref("currentPassword"))
    .messages({
      "string.min": "New password must be at least 6 characters long",
      "any.required": "New password is required",
      "any.invalid": "New password must be different from current password",
    }),
  confirmPassword: Joi.string()
    .valid(Joi.ref("newPassword"))
    .required()
    .messages({
      "any.only": "Passwords do not match",
      "any.required": "Password confirmation is required",
    }),
});

/**
 * Validation schema for updating user role (Admin)
 */
export const updateRoleSchema = Joi.object({
  role: Joi.string().valid("customer", "staff", "admin").required().messages({
    "any.only": "Role must be one of: customer, staff, admin",
    "any.required": "Role is required",
  }),
});

/**
 * Validation schema for user ID parameter
 */
export const userIdParamSchema = Joi.object({
  id: Joi.string()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .required()
    .messages({
      "string.pattern.base": "Invalid user ID format",
      "any.required": "User ID is required",
    }),
});

/**
 * Validation schema for query parameters when getting all users
 */
export const getUsersQuerySchema = Joi.object({
  page: Joi.number().integer().min(1).default(1).messages({
    "number.base": "Page must be a number",
    "number.min": "Page must be at least 1",
  }),
  limit: Joi.number().integer().min(1).max(100).default(10).messages({
    "number.base": "Limit must be a number",
    "number.min": "Limit must be at least 1",
    "number.max": "Limit cannot exceed 100",
  }),
  role: Joi.string().valid("customer", "staff", "admin").messages({
    "any.only": "Role must be one of: customer, staff, admin",
  }),
  search: Joi.string().trim().messages({
    "string.base": "Search must be a string",
  }),
});

export default {
  updateProfileSchema,
  changePasswordSchema,
  updateRoleSchema,
  userIdParamSchema,
  getUsersQuerySchema,
};
