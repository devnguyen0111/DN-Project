import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema(
  {
    cart_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ShoppingCart",
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
    added_at: {
      type: Date,
      default: Date.now,
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

// Ensure a product can only be added once per cart
cartItemSchema.index({ cart_id: 1, product_id: 1 }, { unique: true });
cartItemSchema.index({ cart_id: 1 });

const CartItem = mongoose.model("CartItem", cartItemSchema);

export default CartItem;
