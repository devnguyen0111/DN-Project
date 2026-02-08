import { sendSuccess, sendError, sendPaginated } from "./response.js";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
  decodeToken,
} from "./jwt.js";
import { hashPassword, comparePassword } from "./hash.js";
import {
  getPaginationOptions,
  getSortOptions,
  getPaginationMetadata,
} from "./pagination.js";
import logger from "./logger.js";

export {
  // Response utilities
  sendSuccess,
  sendError,
  sendPaginated,
  // JWT utilities
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
  decodeToken,
  // Hash utilities
  hashPassword,
  comparePassword,
  // Pagination utilities
  getPaginationOptions,
  getSortOptions,
  getPaginationMetadata,
  // Logger
  logger,
};

export default {
  sendSuccess,
  sendError,
  sendPaginated,
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
  decodeToken,
  hashPassword,
  comparePassword,
  getPaginationOptions,
  getSortOptions,
  getPaginationMetadata,
  logger,
};
