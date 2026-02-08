import { sendError } from "../utils/response.js";

/**
 * Validation middleware factory
 */
export const validate = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      const errors = error.details.map((detail) => detail.message);
      return sendError(res, "Validation error", 400, errors);
    }

    next();
  };
};

/**
 * Validate query parameters
 */
export const validateQuery = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.query, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      const errors = error.details.map((detail) => detail.message);
      return sendError(res, "Query validation error", 400, errors);
    }

    next();
  };
};

/**
 * Validate route parameters
 */
export const validateParams = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.params, {
      abortEarly: false,
    });

    if (error) {
      const errors = error.details.map((detail) => detail.message);
      return sendError(res, "Parameter validation error", 400, errors);
    }

    next();
  };
};

export default { validate, validateQuery, validateParams };
