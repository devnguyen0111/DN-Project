import mongoose from "mongoose";

const walletSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    balance: {
      type: mongoose.Types.Decimal128,
      default: 0,
      min: 0,
      get: (val) => (val ? parseFloat(val.toString()) : 0),
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
walletSchema.index({ user_id: 1 });

const Wallet = mongoose.model("Wallet", walletSchema);

export default Wallet;
