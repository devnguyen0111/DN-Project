import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

const SALT_ROUNDS = parseInt(process.env.BCRYPT_SALT_ROUNDS) || 10;

/**
 * Hash a password
 */
export const hashPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  } catch (error) {
    throw new Error("Error hashing password");
  }
};

/**
 * Compare password with hash
 */
export const comparePassword = async (password, hashedPassword) => {
  try {
    return await bcrypt.compare(password, hashedPassword);
  } catch (error) {
    throw new Error("Error comparing password");
  }
};

export default { hashPassword, comparePassword };
