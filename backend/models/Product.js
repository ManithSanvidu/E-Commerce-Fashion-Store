import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: String,
    price: Number,
    image: String,
    category: String,
    description: String,
    sizes: [String],
    section: { type: String, default: "none" },
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);