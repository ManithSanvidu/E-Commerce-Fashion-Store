import { useState, useEffect } from "react";
import AdminLayout from "../layouts/AdminLayout";
import AddCouponModal from "../components/AddCouponModal";
import { TicketPercent } from "lucide-react";
import axios from "axios";

export default function Coupons() {
  const [coupons, setCoupons] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchCoupons = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/coupons");
      setCoupons(response.data);
    } catch (error) {
      console.error("Error fetching coupons:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-bold">Coupons</h1>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-white text-black px-6 py-3 rounded-xl font-semibold hover:bg-gray-200 transition"
        >
          Create Coupon
        </button>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10 text-gray-400">
              <th className="py-4 text-left">Code</th>
              <th className="py-4 text-left">Discount</th>
              <th className="py-4 text-left">Min Purchase</th>
              <th className="py-4 text-left">Expiry</th>
              <th className="py-4 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5" className="py-10 text-center text-gray-400">Loading coupons...</td>
              </tr>
            ) : coupons.length === 0 ? (
              <tr>
                <td colSpan="5" className="py-10 text-center text-gray-400">No coupons found.</td>
              </tr>
            ) : (
              coupons.map((coupon) => (
                <tr key={coupon._id} className="border-b border-white/5 hover:bg-white/[0.02] transition">
                  <td className="py-4">
                    <div className="flex items-center gap-2">
                      <TicketPercent size={16} className="text-gray-400" />
                      <span className="font-mono font-bold text-lg">{coupon.code}</span>
                    </div>
                  </td>
                  <td className="py-4 text-green-400 font-bold">
                    {coupon.discountType === "percentage" ? `${coupon.discountAmount}%` : `$${coupon.discountAmount}`}
                  </td>
                  <td className="py-4 text-gray-400">${coupon.minPurchase}</td>
                  <td className="py-4 text-gray-400">{new Date(coupon.expiryDate).toLocaleDateString()}</td>
                  <td className="py-4">
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      coupon.status === "Active" ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"
                    }`}>
                      {coupon.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <AddCouponModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onCouponAdded={fetchCoupons} 
      />
    </AdminLayout>
  );
}
