import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema(
  {
    order_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },
    product_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
      default: 1,
    },
    price: {
      type: mongoose.Types.Decimal128,
      required: true,
      min: 0,
      get: (val) => (val ? parseFloat(val.toString()) : 0),
    },
  },
  {
    timestamps: true,
    toJSON: {
      getters: true,
      transform: function (doc, ret) {
        delete ret.createdAt;
        delete ret.updatedAt;
        delete ret.__v;
        return ret;
      },
    },
  },
);

// Index for faster queries
orderItemSchema.index({ order_id: 1 });
orderItemSchema.index({ product_id: 1 });

const OrderItem = mongoose.model("OrderItem", orderItemSchema);

export default OrderItem;
