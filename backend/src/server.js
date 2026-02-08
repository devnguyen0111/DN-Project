import app from "./app.js";
import { connectDatabase } from "./config/database.js";
import logger from "./utils/logger.js";

const PORT = process.env.PORT || 5000;

// Start server
const startServer = async () => {
  try {
    // Connect to database
    await connectDatabase();

    // Start listening
    app.listen(PORT, () => {
      logger.success(`🚀 Server is running on port ${PORT}`);
      logger.info(`📝 Environment: ${process.env.NODE_ENV || "development"}`);
      logger.info(`🌐 API URL: http://localhost:${PORT}`);
      logger.info(`💚 Health check: http://localhost:${PORT}/health`);
    });
  } catch (error) {
    logger.error("Failed to start server:", error);
    process.exit(1);
  }
};

// Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
  logger.error("Unhandled Promise Rejection:", err);
  // Close server & exit process
  process.exit(1);
});

// Handle uncaught exceptions
process.on("uncaughtException", (err) => {
  logger.error("Uncaught Exception:", err);
  process.exit(1);
});

// Graceful shutdown
process.on("SIGTERM", () => {
  logger.info("SIGTERM signal received: closing HTTP server");
  process.exit(0);
});

process.on("SIGINT", () => {
  logger.info("SIGINT signal received: closing HTTP server");
  process.exit(0);
});

// Start the server
startServer();
