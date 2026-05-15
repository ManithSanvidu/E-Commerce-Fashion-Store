import { useState } from "react";
import { X } from "lucide-react";
import axios from "axios";

export default function AddCouponModal({ isOpen, onClose, onCouponAdded }) {
  const [formData, setFormData] = useState({
    code: "",
    discountType: "percentage",
    discountAmount: "",
    minPurchase: 0,
    expiryDate: "",
  });
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post("http://localhost:5000/api/coupons", formData);
      onCouponAdded();
      onClose();
      setFormData({
        code: "",
        discountType: "percentage",
        discountAmount: "",
        minPurchase: 0,
        expiryDate: "",
      });
    } catch (error) {
      console.error("Error adding coupon:", error);
      alert("Failed to add coupon");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-[#111111] border border-white/10 w-full max-w-md rounded-3xl overflow-hidden shadow-2xl">
        <div className="flex justify-between items-center p-6 border-b border-white/10">
          <h2 className="text-2xl font-bold text-white">Create New Coupon</h2>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition">
            <X size={24} className="text-gray-400" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-400">Coupon Code</label>
            <input
              required
              type="text"
              placeholder="Ex: SUMMER25"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-white/20 outline-none transition font-mono uppercase"
              value={formData.code}
              onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-400">Type</label>
              <select
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-white/20 outline-none transition"
                value={formData.discountType}
                onChange={(e) => setFormData({ ...formData, discountType: e.target.value })}
              >
                <option value="percentage" className="bg-[#111]">Percentage (%)</option>
                <option value="fixed" className="bg-[#111]">Fixed Amount ($)</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-400">Amount</label>
              <input
                required
                type="number"
                placeholder="0"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-white/20 outline-none transition"
                value={formData.discountAmount}
                onChange={(e) => setFormData({ ...formData, discountAmount: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-400">Min Purchase ($)</label>
            <input
              type="number"
              placeholder="0"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-white/20 outline-none transition"
              value={formData.minPurchase}
              onChange={(e) => setFormData({ ...formData, minPurchase: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-400">Expiry Date</label>
            <input
              required
              type="date"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-white/20 outline-none transition text-white"
              value={formData.expiryDate}
              onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
            />
          </div>

          <div className="pt-4">
            <button
              disabled={loading}
              type="submit"
              className="w-full bg-white text-black font-bold py-4 rounded-2xl hover:bg-gray-200 transition disabled:opacity-50"
            >
              {loading ? "Creating..." : "Create Coupon"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
