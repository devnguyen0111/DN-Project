import mongoose from "mongoose";

const productReviewSchema = new mongoose.Schema(
  {
    product_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    rating: {
      type: Number,
      required: [true, "Rating is required"],
      min: 1,
      max: 5,
    },
    review_text: {
      type: String,
      trim: true,
      maxlength: 1000,
    },
    is_verified_purchase: {
      type: Boolean,
      default: false,
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

// Ensure user can only review a product once
productReviewSchema.index({ product_id: 1, user_id: 1 }, { unique: true });
productReviewSchema.index({ product_id: 1, created_at: -1 });

const ProductReview = mongoose.model("ProductReview", productReviewSchema);

export default ProductReview;
