import dotenv from "dotenv";

dotenv.config();

export const jwtConfig = {
  secret:
    process.env.JWT_SECRET ||
    "your_super_secret_jwt_key_change_this_in_production",
  expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  refreshTokenSecret:
    process.env.REFRESH_TOKEN_SECRET ||
    "your_super_secret_refresh_token_key_change_this",
  refreshTokenExpiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN || "30d",
};

export default jwtConfig;
