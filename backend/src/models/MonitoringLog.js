import mongoose from "mongoose";

const monitoringLogSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    event_type: {
      type: String,
      required: true,
      trim: true,
      enum: [
        "user_login",
        "user_logout",
        "user_register",
        "order_created",
        "order_paid",
        "order_delivered",
        "product_viewed",
        "cart_updated",
        "review_submitted",
        "ticket_created",
        "wallet_transaction",
        "error",
        "system_event",
      ],
    },
    event_data: {
      type: mongoose.Schema.Types.Mixed,
    },
    ip_address: {
      type: String,
      trim: true,
    },
    user_agent: {
      type: String,
      trim: true,
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
monitoringLogSchema.index({ event_type: 1, created_at: -1 });
monitoringLogSchema.index({ user_id: 1, created_at: -1 });

const MonitoringLog = mongoose.model("MonitoringLog", monitoringLogSchema);

export default MonitoringLog;
