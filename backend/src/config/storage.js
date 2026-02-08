import dotenv from "dotenv";

dotenv.config();

export const storageConfig = {
  // AWS S3 Configuration
  aws: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    bucketName: process.env.AWS_BUCKET_NAME,
    region: process.env.AWS_REGION || "ap-southeast-1",
    s3Url: process.env.AWS_S3_URL,
  },

  // Cloudinary Configuration
  cloudinary: {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY,
    apiSecret: process.env.CLOUDINARY_API_SECRET,
  },

  // File upload settings
  maxFileSize: parseInt(process.env.MAX_FILE_SIZE) || 10485760, // 10MB default
  allowedFileTypes: process.env.ALLOWED_FILE_TYPES?.split(",") || [
    "image/jpeg",
    "image/png",
    "image/gif",
    "application/pdf",
    "application/zip",
  ],
};

export default storageConfig;
