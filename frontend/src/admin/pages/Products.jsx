import { useState, useEffect } from "react";
import AdminLayout from "../layouts/AdminLayout";
import AddProductModal from "../components/AddProductModal";
import EditProductModal from "../components/EditProductModal";
import axios from "axios";
import { Trash2, Edit } from "lucide-react";

export default function Products() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await axios.delete(`http://localhost:5000/api/products/${id}`);
        fetchProducts();
      } catch (error) {
        console.error("Error deleting product:", error);
        alert("Failed to delete product");
      }
    }
  };

  const openEditModal = (product) => {
    setEditingProduct(product);
    setIsEditModalOpen(true);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-bold">Products</h1>

        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-white text-black px-6 py-3 rounded-xl font-semibold hover:bg-gray-200 transition"
        >
          Add Product
        </button>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10 text-gray-400">
              <th className="py-4 text-left font-medium">Image</th>
              <th className="py-4 text-left font-medium">Name</th>
              <th className="py-4 text-left font-medium">Category</th>
              <th className="py-4 text-left font-medium">Price</th>
              <th className="py-4 text-left font-medium">Section</th>
              <th className="py-4 text-left font-medium">Actions</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" className="py-10 text-center text-gray-400">Loading products...</td>
              </tr>
            ) : products.length === 0 ? (
              <tr>
                <td colSpan="6" className="py-10 text-center text-gray-400">No products found. Add your first product!</td>
              </tr>
            ) : (
              products.map((product) => (
                <tr key={product._id} className="border-b border-white/5 hover:bg-white/[0.02] transition">
                  <td className="py-4">
                    <img
                      src={product.image.startsWith('http') ? product.image : `http://localhost:5000${product.image}`}
                      alt={product.name}
                      className="w-14 h-14 rounded-lg object-cover bg-white/5"
                    />
                  </td>

                  <td className="py-4 font-medium">{product.name}</td>
                  <td className="py-4 text-gray-400">{product.category}</td>
                  <td className="py-4 font-bold">${product.price}</td>
                  <td className="py-4 uppercase text-xs tracking-wider text-gold">{product.section || "none"}</td>

                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      <button 
                        onClick={() => openEditModal(product)}
                        className="p-2 hover:bg-blue-500/20 text-blue-400 rounded-lg transition"
                      >
                        <Edit size={18} />
                      </button>
                      <button 
                        onClick={() => handleDelete(product._id)}
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

      <AddProductModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onProductAdded={fetchProducts}
      />

      {editingProduct && (
        <EditProductModal 
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setEditingProduct(null);
          }}
          onProductUpdated={fetchProducts}
          product={editingProduct}
        />
      )}
    </AdminLayout>
  );
}
