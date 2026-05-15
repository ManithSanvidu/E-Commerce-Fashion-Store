import { useState, useEffect } from "react";
import { X, Upload } from "lucide-react";
import axios from "axios";

export default function AddProductModal({ isOpen, onClose, onProductAdded }) {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    sizes: "",
    section: "none",
  });
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/categories");
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    data.append("name", formData.name);
    data.append("price", formData.price);
    data.append("category", formData.category);
    data.append("description", formData.description);
    data.append("sizes", formData.sizes);
    data.append("section", formData.section);
    if (image) data.append("image", image);

    try {
      await axios.post("http://localhost:5000/api/products", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      onProductAdded();
      onClose();
      setFormData({ name: "", price: "", category: "", description: "", sizes: "", section: "none" });
      setImage(null);
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to add product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-[#111111] border border-white/10 w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl">
        <div className="flex justify-between items-center p-6 border-b border-white/10">
          <h2 className="text-2xl font-bold text-white">Add New Product</h2>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition">
            <X size={24} className="text-gray-400" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6 max-h-[80vh] overflow-y-auto">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-400">Product Name</label>
              <input
                required
                type="text"
                placeholder="Ex: Luxury Silk Shirt"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-white/20 outline-none transition"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-400">Price ($)</label>
              <input
                required
                type="number"
                placeholder="0.00"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-white/20 outline-none transition"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-400">Category</label>
              <select
                required
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-white/20 outline-none transition"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              >
                <option value="" className="bg-[#111]">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat.name} className="bg-[#111]">
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-400">Sizes (comma separated)</label>
              <input
                type="text"
                placeholder="S, M, L, XL"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-white/20 outline-none transition"
                value={formData.sizes}
                onChange={(e) => setFormData({ ...formData, sizes: e.target.value })}
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-400">Home Section</label>
              <select
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-white/20 outline-none transition"
                value={formData.section}
                onChange={(e) => setFormData({ ...formData, section: e.target.value })}
              >
                <option value="none" className="bg-[#111]">None</option>
                <option value="trending" className="bg-[#111]">Trending Now</option>
                <option value="new-arrivals" className="bg-[#111]">New Arrivals</option>
                <option value="best-sellers" className="bg-[#111]">Best Sellers</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-400">Description</label>
            <textarea
              required
              rows="4"
              placeholder="Tell us about the product..."
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-white/20 outline-none transition resize-none"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            ></textarea>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-400">Product Image</label>
            <div className="relative border-2 border-dashed border-white/10 rounded-2xl p-8 hover:border-white/20 transition group cursor-pointer">
              <input
                type="file"
                className="absolute inset-0 opacity-0 cursor-pointer"
                onChange={(e) => setImage(e.target.files[0])}
                accept="image/*"
              />
              <div className="flex flex-col items-center gap-2">
                <Upload size={32} className="text-gray-400 group-hover:text-white transition" />
                <p className="text-gray-400 group-hover:text-white transition">
                  {image ? image.name : "Click or drag to upload image"}
                </p>
              </div>
            </div>
          </div>

          <div className="pt-4">
            <button
              disabled={loading}
              type="submit"
              className="w-full bg-white text-black font-bold py-4 rounded-2xl hover:bg-gray-200 transition disabled:opacity-50"
            >
              {loading ? "Adding Product..." : "Create Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
