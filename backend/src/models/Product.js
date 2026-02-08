import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
      maxlength: 200,
    },
    description: {
      type: String,
      trim: true,
      maxlength: 2000,
    },
    price: {
      type: mongoose.Types.Decimal128,
      required: [true, "Price is required"],
      min: 0,
      get: (val) => (val ? parseFloat(val.toString()) : 0),
    },
    digital_file_url: {
      type: String,
      trim: true,
    },
    is_active: {
      type: Boolean,
      default: true,
    },
    category: {
      type: String,
      trim: true,
    },
    image_url: {
      type: String,
      trim: true,
    },
    average_rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    review_count: {
      type: Number,
      default: 0,
      min: 0,
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
productSchema.index({ name: "text", description: "text" });
productSchema.index({ is_active: 1 });
productSchema.index({ category: 1 });
productSchema.index({ average_rating: -1 });

const Product = mongoose.model("Product", productSchema);

export default Product;
