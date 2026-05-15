import { useState, useEffect } from "react";
import { useUser, useAuth } from "@clerk/clerk-react";
import api from "../services/api";
import { Navigate } from "react-router-dom";

export default function AdminDashboard() {
  const { user, isLoaded } = useUser();
  const { getToken } = useAuth();
  const [activeTab, setActiveTab] = useState("products");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    price: "",
    category: "Men",
    image: "",
    description: "",
    color: "",
    size: ""
  });

  const isAdmin = user?.publicMetadata?.role === "admin";

  useEffect(() => {
    if (isAdmin && activeTab === "payments") {
      fetchOrders();
    }
  }, [isAdmin, activeTab]);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const token = await getToken();
      const { data } = await api.get("/api/orders/all", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setOrders(data);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleProductSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = await getToken();
      const productData = {
        ...formData,
        price: Number(formData.price),
        size: formData.size.split(",").map(s => s.trim())
      };
      
      await api.post("/api/products", productData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      alert("Product added successfully!");
      setFormData({
        name: "", brand: "", price: "", category: "Men", image: "", description: "", color: "", size: ""
      });
    } catch (error) {
      alert("Failed to add product: " + (error.response?.data?.message || error.message));
    }
  };

  if (!isLoaded) return <div className="min-h-screen flex items-center justify-center text-white">Loading...</div>;
  if (!isAdmin) return <Navigate to="/" />;

  return (
    <div className="p-6 md:p-12 lg:p-20 min-h-screen bg-transparent">
      <div className="max-w-[1200px] mx-auto">
        <div className="mb-12 flex flex-col md:flex-row justify-between items-end gap-6">
          <div>
            <h1 className="text-5xl md:text-6xl font-black tracking-tighter text-white uppercase italic">
              Admin <span className="text-gold">Panel</span>
            </h1>
            <p className="text-gray-400 mt-2 font-medium tracking-widest uppercase text-sm">Management Console</p>
          </div>
          
          <div className="flex glass p-1 rounded-2xl border-white/5">
            <button 
              onClick={() => setActiveTab("products")}
              className={`px-8 py-3 rounded-xl font-bold transition-all ${activeTab === "products" ? "bg-white text-black shadow-lg" : "text-gray-400 hover:text-white"}`}
            >
              ADD PRODUCT
            </button>
            <button 
              onClick={() => setActiveTab("payments")}
              className={`px-8 py-3 rounded-xl font-bold transition-all ${activeTab === "payments" ? "bg-white text-black shadow-lg" : "text-gray-400 hover:text-white"}`}
            >
              PAYMENTS
            </button>
          </div>
        </div>

        {activeTab === "products" ? (
          <div className="glass rounded-[3rem] p-8 md:p-12 border-white/10 shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-500">
            <form onSubmit={handleProductSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-gray-400 text-sm font-bold uppercase tracking-wider ml-2">Product Name</label>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. Silk Evening Gown"
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 text-white rounded-2xl py-4 px-6 focus:ring-2 focus:ring-gold outline-none transition-all"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-gray-400 text-sm font-bold uppercase tracking-wider ml-2">Brand</label>
                    <input 
                      type="text" 
                      required
                      value={formData.brand}
                      onChange={e => setFormData({...formData, brand: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 text-white rounded-2xl py-4 px-6 focus:ring-2 focus:ring-gold outline-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-gray-400 text-sm font-bold uppercase tracking-wider ml-2">Price ($)</label>
                    <input 
                      type="number" 
                      required
                      value={formData.price}
                      onChange={e => setFormData({...formData, price: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 text-white rounded-2xl py-4 px-6 focus:ring-2 focus:ring-gold outline-none"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-gray-400 text-sm font-bold uppercase tracking-wider ml-2">Category</label>
                  <select 
                    value={formData.category}
                    onChange={e => setFormData({...formData, category: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 text-white rounded-2xl py-4 px-6 focus:ring-2 focus:ring-gold outline-none appearance-none"
                  >
                    <option value="Men" className="bg-primary">Men</option>
                    <option value="Women" className="bg-primary">Women</option>
                    <option value="Accessories" className="bg-primary">Accessories</option>
                  </select>
                </div>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-gray-400 text-sm font-bold uppercase tracking-wider ml-2">Image URL</label>
                  <input 
                    type="url" 
                    required
                    value={formData.image}
                    onChange={e => setFormData({...formData, image: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 text-white rounded-2xl py-4 px-6 focus:ring-2 focus:ring-gold outline-none"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-gray-400 text-sm font-bold uppercase tracking-wider ml-2">Color</label>
                    <input 
                      type="text" 
                      value={formData.color}
                      onChange={e => setFormData({...formData, color: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 text-white rounded-2xl py-4 px-6 focus:ring-2 focus:ring-gold outline-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-gray-400 text-sm font-bold uppercase tracking-wider ml-2">Sizes (comma separated)</label>
                    <input 
                      type="text" 
                      placeholder="S, M, L"
                      value={formData.size}
                      onChange={e => setFormData({...formData, size: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 text-white rounded-2xl py-4 px-6 focus:ring-2 focus:ring-gold outline-none"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-gray-400 text-sm font-bold uppercase tracking-wider ml-2">Description</label>
                  <textarea 
                    rows="4"
                    value={formData.description}
                    onChange={e => setFormData({...formData, description: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 text-white rounded-2xl py-4 px-6 focus:ring-2 focus:ring-gold outline-none resize-none"
                  />
                </div>
              </div>

              <div className="md:col-span-2 pt-4">
                <button 
                  type="submit"
                  className="w-full py-5 rounded-3xl bg-gold text-white font-black text-xl hover:bg-white hover:text-black transition-all duration-500 shadow-2xl shadow-gold/20 transform hover:scale-[1.01] active:scale-95"
                >
                  ADD PRODUCT TO COLLECTION
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="glass rounded-[3rem] overflow-hidden border-white/10 shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-white/5 border-b border-white/10">
                    <th className="px-8 py-6 text-gray-400 font-bold uppercase text-xs tracking-widest">Order ID</th>
                    <th className="px-8 py-6 text-gray-400 font-bold uppercase text-xs tracking-widest">Customer ID</th>
                    <th className="px-8 py-6 text-gray-400 font-bold uppercase text-xs tracking-widest">Amount</th>
                    <th className="px-8 py-6 text-gray-400 font-bold uppercase text-xs tracking-widest">Status</th>
                    <th className="px-8 py-6 text-gray-400 font-bold uppercase text-xs tracking-widest">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {loading ? (
                    <tr>
                      <td colSpan="5" className="px-8 py-20 text-center text-gray-400 animate-pulse font-medium">Fetching secure payment records...</td>
                    </tr>
                  ) : orders.length > 0 ? (
                    orders.map(order => (
                      <tr key={order._id} className="hover:bg-white/5 transition-colors group">
                        <td className="px-8 py-6 text-white font-mono text-sm">#{order._id.slice(-8).toUpperCase()}</td>
                        <td className="px-8 py-6 text-gray-300 font-medium">{order.userId}</td>
                        <td className="px-8 py-6 text-gold font-black">${order.totalAmount || order.total}</td>
                        <td className="px-8 py-6">
                          <span className="px-3 py-1 rounded-full bg-green-500/10 text-green-500 text-xs font-black uppercase tracking-tighter border border-green-500/20">
                            Success
                          </span>
                        </td>
                        <td className="px-8 py-6 text-gray-400 text-sm">{new Date(order.createdAt).toLocaleDateString()}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="px-8 py-20 text-center text-gray-400">No payment history available.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
