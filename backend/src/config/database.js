import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGODB_URI =
  process.env.MONGODB_URI ||
  "mongodb://localhost:27017/ecommerce_digital_goods";

export const connectDatabase = async () => {
  try {
    const conn = await mongoose.connect(MONGODB_URI, {
      // These options are deprecated in newer versions but kept for backward compatibility
      // Remove if using Mongoose 7+
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);

    // Handle connection events
    mongoose.connection.on("error", (err) => {
      console.error("❌ MongoDB connection error:", err);
    });

    mongoose.connection.on("disconnected", () => {
      console.log("⚠️  MongoDB disconnected");
    });

    return conn;
  } catch (error) {
    console.error("❌ Error connecting to MongoDB:", error.message);
    process.exit(1);
  }
};

export const disconnectDatabase = async () => {
  try {
    await mongoose.connection.close();
    console.log("🔌 MongoDB connection closed");
  } catch (error) {
    console.error("❌ Error closing MongoDB connection:", error.message);
  }
};

export default { connectDatabase, disconnectDatabase };
