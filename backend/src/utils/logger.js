import dotenv from "dotenv";

dotenv.config();

/**
 * Logger utility - can be extended with Winston or other logging libraries
 */
class Logger {
  constructor() {
    this.logLevel = process.env.LOG_LEVEL || "info";
  }

  info(message, meta = {}) {
    if (["info", "debug"].includes(this.logLevel)) {
      console.log(`ℹ️  [INFO] ${new Date().toISOString()} - ${message}`, meta);
    }
  }

  error(message, error = null, meta = {}) {
    console.error(`❌ [ERROR] ${new Date().toISOString()} - ${message}`, {
      error: error?.message || error,
      stack: error?.stack,
      ...meta,
    });
  }

  warn(message, meta = {}) {
    if (["info", "warn", "debug"].includes(this.logLevel)) {
      console.warn(`⚠️  [WARN] ${new Date().toISOString()} - ${message}`, meta);
    }
  }

  debug(message, meta = {}) {
    if (this.logLevel === "debug") {
      console.log(`🔍 [DEBUG] ${new Date().toISOString()} - ${message}`, meta);
    }
  }

  success(message, meta = {}) {
    console.log(`✅ [SUCCESS] ${new Date().toISOString()} - ${message}`, meta);
  }
}

export default new Logger();
