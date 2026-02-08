import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    total_amount: {
      type: mongoose.Types.Decimal128,
      required: true,
      min: 0,
      get: (val) => (val ? parseFloat(val.toString()) : 0),
    },
    status: {
      type: String,
      enum: ["pending", "paid", "delivered", "refunded", "cancelled"],
      default: "pending",
    },
    delivery_email: {
      type: String,
      required: [true, "Delivery email is required"],
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
    },
    payment_method: {
      type: String,
      enum: ["wallet", "stripe", "paypal", "vnpay"],
      default: "wallet",
    },
  },
  {
    timestamps: true,
    toJSON: {
      getters: true,
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
orderSchema.index({ user_id: 1, created_at: -1 });
orderSchema.index({ status: 1 });

const Order = mongoose.model("Order", orderSchema);

export default Order;
