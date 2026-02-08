import mongoose from "mongoose";

const loyaltyPointSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    points: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      enum: ["earn", "redeem", "adjustment", "expired"],
      required: true,
    },
    reference: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      maxlength: 500,
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
loyaltyPointSchema.index({ user_id: 1, created_at: -1 });
loyaltyPointSchema.index({ type: 1 });

const LoyaltyPoint = mongoose.model("LoyaltyPoint", loyaltyPointSchema);

export default LoyaltyPoint;
