import { useState } from "react";
import { X } from "lucide-react";
import axios from "axios";

const generateSlug = (value) =>
  value
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9\-]/g, "");

export default function AddCategoryModal({ isOpen, onClose, onCategoryAdded }) {
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        ...formData,
        slug: generateSlug(formData.slug || formData.name),
      };

      await axios.post("http://localhost:5000/api/categories", payload);
      onCategoryAdded();
      onClose();
      setFormData({ name: "", slug: "", description: "" });
    } catch (error) {
      console.error("Error adding category:", error);
      alert(
        error.response?.data?.message ||
          error.message ||
          "Failed to add category"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-[#111111] border border-white/10 w-full max-w-md rounded-3xl overflow-hidden shadow-2xl">
        <div className="flex justify-between items-center p-6 border-b border-white/10">
          <h2 className="text-2xl font-bold text-white">Add New Category</h2>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition">
            <X size={24} className="text-gray-400" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-400">Category Name</label>
            <input
              required
              type="text"
              placeholder="Ex: Men, Women"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-white/20 outline-none transition"
              value={formData.name}
              onChange={(e) => {
                const newName = e.target.value;
                setFormData({
                  ...formData,
                  name: newName,
                  slug: generateSlug(newName),
                });
              }}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-400">Slug</label>
            <input
              required
              type="text"
              placeholder="ex-category-slug"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-white/20 outline-none transition"
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: generateSlug(e.target.value) })}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-400">Description</label>
            <textarea
              rows="3"
              placeholder="Category description..."
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-white/20 outline-none transition resize-none"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            ></textarea>
          </div>

          <div className="pt-4">
            <button
              disabled={loading}
              type="submit"
              className="w-full bg-white text-black font-bold py-4 rounded-2xl hover:bg-gray-200 transition disabled:opacity-50"
            >
              {loading ? "Adding..." : "Create Category"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
