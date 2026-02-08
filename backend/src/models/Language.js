import mongoose from "mongoose";

const languageSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: [true, "Language code is required"],
      unique: true,
      lowercase: true,
      trim: true,
      maxlength: 10,
    },
    name: {
      type: String,
      required: [true, "Language name is required"],
      trim: true,
      maxlength: 100,
    },
    is_active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (doc, ret) {
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
languageSchema.index({ code: 1 });
languageSchema.index({ is_active: 1 });

const Language = mongoose.model("Language", languageSchema);

export default Language;
