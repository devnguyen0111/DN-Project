import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    subject: {
      type: String,
      required: [true, "Subject is required"],
      trim: true,
      maxlength: 200,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
      maxlength: 2000,
    },
    status: {
      type: String,
      enum: ["open", "in_progress", "closed"],
      default: "open",
    },
    assigned_staff_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high", "urgent"],
      default: "medium",
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
ticketSchema.index({ user_id: 1, created_at: -1 });
ticketSchema.index({ status: 1 });
ticketSchema.index({ assigned_staff_id: 1 });

const Ticket = mongoose.model("Ticket", ticketSchema);

export default Ticket;
