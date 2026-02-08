import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
    },
    password_hash: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
    },
    display_name: {
      type: String,
      required: [true, "Display name is required"],
      trim: true,
      minlength: 2,
      maxlength: 100,
    },
    role: {
      type: String,
      enum: ["customer", "staff", "admin"],
      default: "customer",
    },
    wallet_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Wallet",
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (doc, ret) {
        delete ret.password_hash;
        ret.created_at = ret.createdAt;
        ret.updated_at = ret.updatedAt;
        delete ret.createdAt;
        delete ret.updatedAt;
        delete ret.__v;
        return ret;
      },
    },
  },
);

// Index for faster queries
userSchema.index({ email: 1 });
userSchema.index({ role: 1 });

const User = mongoose.model("User", userSchema);

export default User;
