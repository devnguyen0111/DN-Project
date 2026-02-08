import { User } from "../models/index.js";
import { hashPassword } from "../utils/hash.js";
import { getPaginationOptions } from "../utils/pagination.js";
import logger from "../utils/logger.js";

/**
 * Get user profile with wallet information
 */
export const getUserProfile = async (userId) => {
  try {
    const user = await User.findById(userId)
      .select("-password_hash")
      .populate("wallet_id", "balance");

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  } catch (error) {
    logger.error("Error in getUserProfile service:", error);
    throw error;
  }
};

/**
 * Update user profile
 */
export const updateUserProfile = async (userId, updateData) => {
  try {
    const { display_name, email } = updateData;

    // Check if email is being changed and if it already exists
    if (email) {
      const existingUser = await User.findOne({ email, _id: { $ne: userId } });
      if (existingUser) {
        throw new Error("Email already exists");
      }
    }

    // Build update object
    const updates = {};
    if (display_name) updates.display_name = display_name;
    if (email) updates.email = email;

    // Update user
    const user = await User.findByIdAndUpdate(userId, updates, {
      new: true,
      runValidators: true,
    })
      .select("-password_hash")
      .populate("wallet_id", "balance");

    if (!user) {
      throw new Error("User not found");
    }

    logger.info("User profile updated", { userId });

    return user;
  } catch (error) {
    logger.error("Error in updateUserProfile service:", error);
    throw error;
  }
};

/**
 * Change user password
 */
export const changePassword = async (userId, currentPassword, newPassword) => {
  try {
    const { comparePassword } = await import("../utils/hash.js");

    // Get user with password
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    // Verify current password
    const isPasswordValid = await comparePassword(
      currentPassword,
      user.password_hash,
    );
    if (!isPasswordValid) {
      throw new Error("Current password is incorrect");
    }

    // Hash new password
    const password_hash = await hashPassword(newPassword);

    // Update password
    user.password_hash = password_hash;
    await user.save();

    logger.info("User password changed", { userId });

    return { message: "Password changed successfully" };
  } catch (error) {
    logger.error("Error in changePassword service:", error);
    throw error;
  }
};

/**
 * Get all users (Admin only)
 */
export const getAllUsers = async (query) => {
  try {
    const { page = 1, limit = 10, role, search } = query;
    const {
      skip,
      limit: limitNum,
      page: pageNum,
    } = getPaginationOptions(page, limit);

    // Build filter
    const filter = {};
    if (role) filter.role = role;
    if (search) {
      filter.$or = [
        { email: { $regex: search, $options: "i" } },
        { display_name: { $regex: search, $options: "i" } },
      ];
    }

    // Get users with pagination
    const [users, total] = await Promise.all([
      User.find(filter)
        .select("-password_hash")
        .populate("wallet_id", "balance")
        .sort({ created_at: -1 })
        .skip(skip)
        .limit(limitNum),
      User.countDocuments(filter),
    ]);

    return {
      users,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        totalPages: Math.ceil(total / limitNum),
      },
    };
  } catch (error) {
    logger.error("Error in getAllUsers service:", error);
    throw error;
  }
};

/**
 * Get user by ID (Admin only)
 */
export const getUserById = async (userId) => {
  try {
    const user = await User.findById(userId)
      .select("-password_hash")
      .populate("wallet_id", "balance");

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  } catch (error) {
    logger.error("Error in getUserById service:", error);
    throw error;
  }
};

/**
 * Update user role (Admin only)
 */
export const updateUserRole = async (userId, role) => {
  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { role },
      { new: true, runValidators: true },
    )
      .select("-password_hash")
      .populate("wallet_id", "balance");

    if (!user) {
      throw new Error("User not found");
    }

    logger.info("User role updated", { userId, newRole: role });

    return user;
  } catch (error) {
    logger.error("Error in updateUserRole service:", error);
    throw error;
  }
};

/**
 * Delete user (Admin only)
 */
export const deleteUser = async (userId) => {
  try {
    const user = await User.findByIdAndDelete(userId);

    if (!user) {
      throw new Error("User not found");
    }

    // Delete associated wallet
    if (user.wallet_id) {
      const { Wallet } = await import("../models/index.js");
      await Wallet.findByIdAndDelete(user.wallet_id);
    }

    logger.info("User deleted", { userId });

    return { message: "User deleted successfully" };
  } catch (error) {
    logger.error("Error in deleteUser service:", error);
    throw error;
  }
};

export default {
  getUserProfile,
  updateUserProfile,
  changePassword,
  getAllUsers,
  getUserById,
  updateUserRole,
  deleteUser,
};
