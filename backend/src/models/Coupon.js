import mongoose from "mongoose";

const couponSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: [true, "Coupon code is required"],
      unique: true,
      uppercase: true,
      trim: true,
      maxlength: 50,
    },
    description: {
      type: String,
      trim: true,
      maxlength: 500,
    },
    discount_type: {
      type: String,
      enum: ["percentage", "fixed"],
      required: true,
    },
    discount_value: {
      type: mongoose.Types.Decimal128,
      required: true,
      min: 0,
      get: (val) => (val ? parseFloat(val.toString()) : 0),
    },
    min_order_amount: {
      type: mongoose.Types.Decimal128,
      default: 0,
      min: 0,
      get: (val) => (val ? parseFloat(val.toString()) : 0),
    },
    max_discount_value: {
      type: mongoose.Types.Decimal128,
      get: (val) => (val ? parseFloat(val.toString()) : null),
    },
    usage_limit: {
      type: Number,
      min: 0,
    },
    usage_count: {
      type: Number,
      default: 0,
      min: 0,
    },
    valid_from: {
      type: Date,
      required: true,
    },
    valid_to: {
      type: Date,
      required: true,
    },
    is_active: {
      type: Boolean,
      default: true,
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
couponSchema.index({ code: 1 });
couponSchema.index({ is_active: 1, valid_from: 1, valid_to: 1 });

const Coupon = mongoose.model("Coupon", couponSchema);

export default Coupon;
