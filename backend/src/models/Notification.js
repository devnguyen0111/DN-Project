import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      enum: [
        "order_confirmation",
        "order_delivered",
        "order_refunded",
        "ticket_reply",
        "ticket_closed",
        "wallet_deposit",
        "wallet_refund",
        "promotion",
        "system",
      ],
      required: true,
    },
    content: {
      type: String,
      required: [true, "Notification content is required"],
      trim: true,
      maxlength: 500,
    },
    status: {
      type: String,
      enum: ["unread", "read"],
      default: "unread",
    },
    read_at: {
      type: Date,
    },
    metadata: {
      type: mongoose.Schema.Types.Mixed,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (doc, ret) {
        ret.created_at = ret.createdAt;
        delete ret.updatedAt;
        delete ret.__v;
        return ret;
      },
    },
  },
);

// Index for faster queries
notificationSchema.index({ user_id: 1, created_at: -1 });
notificationSchema.index({ status: 1 });

const Notification = mongoose.model("Notification", notificationSchema);

export default Notification;
