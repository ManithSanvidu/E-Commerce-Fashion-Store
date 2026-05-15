import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    userId: String,
    products: [
      {
        productId: String,
        name: String,
        price: Number,
        image: String,
        quantity: Number,
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Cart", cartSchema);