import mongoose from "mongoose";

const orderCouponSchema = new mongoose.Schema(
  {
    order_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },
    coupon_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Coupon",
      required: true,
    },
    discount_amount: {
      type: mongoose.Types.Decimal128,
      required: true,
      min: 0,
      get: (val) => (val ? parseFloat(val.toString()) : 0),
    },
    applied_at: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: false,
    toJSON: {
      getters: true,
      transform: function (doc, ret) {
        delete ret.__v;
        return ret;
      },
    },
  },
);

// Index for faster queries
orderCouponSchema.index({ order_id: 1 });
orderCouponSchema.index({ coupon_id: 1 });

const OrderCoupon = mongoose.model("OrderCoupon", orderCouponSchema);

export default OrderCoupon;
