import { User, Wallet } from "../models/index.js";
import { hashPassword, comparePassword } from "../utils/hash.js";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt.js";
import logger from "../utils/logger.js";

/**
 * Register a new user
 */
export const registerUser = async (userData) => {
  try {
    const { email, password, display_name } = userData;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error("Email already exists");
    }

    // Hash password
    const password_hash = await hashPassword(password);

    // Create user
    const user = await User.create({
      email,
      password_hash,
      display_name,
      role: "customer",
    });

    // Create wallet for user
    const wallet = await Wallet.create({
      user_id: user._id,
      balance: 0,
    });

    // Update user with wallet_id
    user.wallet_id = wallet._id;
    await user.save();

    logger.info("User registered successfully", { userId: user._id, email });

    // Generate tokens
    const accessToken = generateAccessToken({ userId: user._id });
    const refreshToken = generateRefreshToken({ userId: user._id });

    return {
      user: user.toJSON(),
      accessToken,
      refreshToken,
    };
  } catch (error) {
    logger.error("Error in registerUser service:", error);
    throw error;
  }
};

/**
 * Login user
 */
export const loginUser = async (email, password) => {
  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("Invalid email or password");
    }

    // Compare password
    const isPasswordValid = await comparePassword(password, user.password_hash);
    if (!isPasswordValid) {
      throw new Error("Invalid email or password");
    }

    logger.info("User logged in successfully", { userId: user._id, email });

    // Generate tokens
    const accessToken = generateAccessToken({ userId: user._id });
    const refreshToken = generateRefreshToken({ userId: user._id });

    return {
      user: user.toJSON(),
      accessToken,
      refreshToken,
    };
  } catch (error) {
    logger.error("Error in loginUser service:", error);
    throw error;
  }
};

/**
 * Refresh access token
 */
export const refreshAccessToken = async (userId) => {
  try {
    // Find user
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    // Generate new access token
    const accessToken = generateAccessToken({ userId: user._id });

    return { accessToken };
  } catch (error) {
    logger.error("Error in refreshAccessToken service:", error);
    throw error;
  }
};

/**
 * Get user by ID
 */
export const getUserById = async (userId) => {
  try {
    const user = await User.findById(userId).select("-password_hash");
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  } catch (error) {
    logger.error("Error in getUserById service:", error);
    throw error;
  }
};

export default {
  registerUser,
  loginUser,
  refreshAccessToken,
  getUserById,
};
