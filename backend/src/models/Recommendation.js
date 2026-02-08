import mongoose from "mongoose";

const recommendationSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    product_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    recommended_at: {
      type: Date,
      default: Date.now,
    },
    reason: {
      type: String,
      enum: [
        "popular",
        "similar_purchases",
        "category_match",
        "high_rating",
        "personalized",
        "trending",
      ],
      default: "personalized",
    },
    score: {
      type: Number,
      default: 0,
      min: 0,
      max: 1,
    },
  },
  {
    timestamps: false,
    toJSON: {
      transform: function (doc, ret) {
        delete ret.__v;
        return ret;
      },
    },
  },
);

// Index for faster queries
recommendationSchema.index({ user_id: 1, recommended_at: -1 });
recommendationSchema.index({ product_id: 1 });
recommendationSchema.index({ user_id: 1, product_id: 1 });

const Recommendation = mongoose.model("Recommendation", recommendationSchema);

export default Recommendation;
