import mongoose from "mongoose";

const productTranslationSchema = new mongoose.Schema(
  {
    product_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    language_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Language",
      required: true,
    },
    name: {
      type: String,
      required: [true, "Translated product name is required"],
      trim: true,
      maxlength: 200,
    },
    description: {
      type: String,
      trim: true,
      maxlength: 2000,
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

// Ensure one translation per product per language
productTranslationSchema.index(
  { product_id: 1, language_id: 1 },
  { unique: true },
);

const ProductTranslation = mongoose.model(
  "ProductTranslation",
  productTranslationSchema,
);

export default ProductTranslation;
