import jwt from "jsonwebtoken";
import { jwtConfig } from "../config/jwt.js";

/**
 * Generate JWT access token
 */
export const generateAccessToken = (payload) => {
  return jwt.sign(payload, jwtConfig.secret, {
    expiresIn: jwtConfig.expiresIn,
  });
};

/**
 * Generate JWT refresh token
 */
export const generateRefreshToken = (payload) => {
  return jwt.sign(payload, jwtConfig.refreshTokenSecret, {
    expiresIn: jwtConfig.refreshTokenExpiresIn,
  });
};

/**
 * Verify JWT access token
 */
export const verifyAccessToken = (token) => {
  try {
    return jwt.verify(token, jwtConfig.secret);
  } catch (error) {
    throw new Error("Invalid or expired token");
  }
};

/**
 * Verify JWT refresh token
 */
export const verifyRefreshToken = (token) => {
  try {
    return jwt.verify(token, jwtConfig.refreshTokenSecret);
  } catch (error) {
    throw new Error("Invalid or expired refresh token");
  }
};

/**
 * Decode JWT token without verification
 */
export const decodeToken = (token) => {
  return jwt.decode(token);
};

export default {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
  decodeToken,
};
