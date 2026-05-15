import mongoose from "mongoose";

const couponSchema = new mongoose.Schema(
  {
    code: { type: String, required: true, unique: true },
    discountType: { type: String, enum: ["percentage", "fixed"], default: "percentage" },
    discountAmount: { type: Number, required: true },
    minPurchase: { type: Number, default: 0 },
    expiryDate: { type: Date, required: true },
    status: { type: String, default: "Active" },
  },
  { timestamps: true }
);

export default mongoose.model("Coupon", couponSchema);
