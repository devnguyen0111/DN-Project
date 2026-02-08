import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { errorHandler, notFoundHandler } from "./middlewares/index.js";
import logger from "./utils/logger.js";

// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// Middleware
app.use(
  cors({
    origin: process.env.CORS_ORIGIN?.split(",") || "http://localhost:3000",
    credentials: true,
  }),
);
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cookieParser());

// Request logging middleware
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.path}`, {
    ip: req.ip,
    userAgent: req.get("user-agent"),
  });
  next();
});

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({
    success: true,
    message: "Server is running",
    timestamp: new Date().toISOString(),
  });
});

// API Routes
const API_VERSION = process.env.API_VERSION || "v1";

// TODO: Import and use route files
// import authRoutes from './routes/auth.routes.js';
// import userRoutes from './routes/user.routes.js';
// import productRoutes from './routes/product.routes.js';
// import orderRoutes from './routes/order.routes.js';
// ... etc

// app.use(`/api/${API_VERSION}/auth`, authRoutes);
// app.use(`/api/${API_VERSION}/users`, userRoutes);
// app.use(`/api/${API_VERSION}/products`, productRoutes);
// app.use(`/api/${API_VERSION}/orders`, orderRoutes);

// Welcome route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Welcome to E-commerce Digital Goods API",
    version: API_VERSION,
    documentation: `/api/${API_VERSION}/docs`,
  });
});

// 404 handler
app.use(notFoundHandler);

// Global error handler (must be last)
app.use(errorHandler);

export default app;
