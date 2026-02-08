import Joi from "joi";

/**
 * Validation schema for user registration
 */
export const registerSchema = Joi.object({
  email: Joi.string().email().required().lowercase().trim().messages({
    "string.email": "Please provide a valid email address",
    "any.required": "Email is required",
  }),
  password: Joi.string().min(6).required().messages({
    "string.min": "Password must be at least 6 characters long",
    "any.required": "Password is required",
  }),
  display_name: Joi.string().min(2).max(100).required().trim().messages({
    "string.min": "Display name must be at least 2 characters long",
    "string.max": "Display name cannot exceed 100 characters",
    "any.required": "Display name is required",
  }),
});

/**
 * Validation schema for user login
 */
export const loginSchema = Joi.object({
  email: Joi.string().email().required().lowercase().trim().messages({
    "string.email": "Please provide a valid email address",
    "any.required": "Email is required",
  }),
  password: Joi.string().required().messages({
    "any.required": "Password is required",
  }),
});

/**
 * Validation schema for refresh token
 */
export const refreshTokenSchema = Joi.object({
  refreshToken: Joi.string().required().messages({
    "any.required": "Refresh token is required",
  }),
});

export default {
  registerSchema,
  loginSchema,
  refreshTokenSchema,
};
