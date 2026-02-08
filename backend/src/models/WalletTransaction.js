import mongoose from "mongoose";

const walletTransactionSchema = new mongoose.Schema(
  {
    wallet_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Wallet",
      required: true,
    },
    type: {
      type: String,
      enum: ["deposit", "refund", "payment", "withdrawal"],
      required: true,
    },
    amount: {
      type: mongoose.Types.Decimal128,
      required: true,
      min: 0,
      get: (val) => (val ? parseFloat(val.toString()) : 0),
    },
    status: {
      type: String,
      enum: ["pending", "completed", "failed"],
      default: "pending",
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
      getters: true,
      transform: function (doc, ret) {
        ret.created_at = ret.createdAt;
        delete ret.createdAt;
        delete ret.updatedAt;
        delete ret.__v;
        return ret;
      },
    },
  },
);

// Index for faster queries
walletTransactionSchema.index({ wallet_id: 1, created_at: -1 });
walletTransactionSchema.index({ status: 1 });
walletTransactionSchema.index({ reference: 1 });

const WalletTransaction = mongoose.model(
  "WalletTransaction",
  walletTransactionSchema,
);

export default WalletTransaction;
