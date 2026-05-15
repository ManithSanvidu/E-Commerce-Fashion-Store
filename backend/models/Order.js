import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: String,
    products: Array,
    totalAmount: Number,
    paymentMethod: String, 
    status: {
      type: String,
      default: "Pending",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);