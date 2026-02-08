import dotenv from "dotenv";

dotenv.config();

export const mailerConfig = {
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: parseInt(process.env.SMTP_PORT) || 587,
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  from: {
    email: process.env.EMAIL_FROM || "noreply@ecommerce.com",
    name: process.env.EMAIL_FROM_NAME || "E-commerce Digital Goods",
  },
};

export default mailerConfig;
