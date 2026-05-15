import { useState, useEffect } from "react";
import AdminLayout from "../layouts/AdminLayout";
import AddCategoryModal from "../components/AddCategoryModal";
import EditCategoryModal from "../components/EditCategoryModal";
import axios from "axios";
import { Trash2, Edit } from "lucide-react";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/categories");
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this category?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/categories/${id}`);
      fetchCategories();
    } catch (error) {
      console.error("Error deleting category:", error);
      alert("Failed to delete category");
    }
  };

  const openEditModal = (category) => {
    setEditingCategory(category);
    setIsEditModalOpen(true);
  };

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-bold">Categories</h1>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-white text-black px-6 py-3 rounded-xl font-semibold hover:bg-gray-200 transition"
        >
          Add Category
        </button>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10 text-gray-400">
              <th className="py-4 text-left font-medium">Name</th>
              <th className="py-4 text-left font-medium">Description</th>
              <th className="py-4 text-left font-medium">Slug</th>
              <th className="py-4 text-left font-medium">Status</th>
              <th className="py-4 text-left font-medium">Actions</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5" className="py-10 text-center text-gray-400">Loading categories...</td>
              </tr>
            ) : categories.length === 0 ? (
              <tr>
                <td colSpan="5" className="py-10 text-center text-gray-400">No categories found.</td>
              </tr>
            ) : (
              categories.map((category) => (
                <tr key={category._id} className="border-b border-white/5 hover:bg-white/[0.02] transition">
                  <td className="py-4 font-medium">{category.name}</td>
                  <td className="py-4 text-gray-400">{category.description || "No description"}</td>
                  <td className="py-4">
                    <span className="text-sm bg-white/10 px-3 py-1 rounded-lg">/{category.slug}</span>
                  </td>
                  <td className="py-4">
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      category.status === "Active"
                        ? "bg-green-500/20 text-green-400"
                        : "bg-red-500/20 text-red-400"
                    }`}>
                      {category.status}
                    </span>
                  </td>
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => openEditModal(category)}
                        className="p-2 hover:bg-blue-500/20 text-blue-400 rounded-lg transition"
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(category._id)}
                        className="p-2 hover:bg-red-500/20 text-red-400 rounded-lg transition"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <AddCategoryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCategoryAdded={fetchCategories}
      />

      {editingCategory && (
        <EditCategoryModal
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setEditingCategory(null);
          }}
          onCategoryUpdated={fetchCategories}
          category={editingCategory}
        />
      )}
    </AdminLayout>
  );
}
