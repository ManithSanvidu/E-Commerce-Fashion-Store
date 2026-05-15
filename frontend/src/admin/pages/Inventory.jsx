import AdminLayout from "../layouts/AdminLayout";

export default function Inventory() {
  const stockItems = [
    { id: 1, name: "Luxury Hoodie", sku: "LH-001", stock: 24, price: "$120", status: "In Stock" },
    { id: 2, name: "Classic Tee", sku: "CT-002", stock: 5, price: "$45", status: "Low Stock" },
    { id: 3, name: "Premium Denim", sku: "PD-003", stock: 0, price: "$180", status: "Out of Stock" },
  ];

  return (
    <AdminLayout>
      <h1 className="text-4xl font-bold mb-10">Inventory</h1>

      <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
        <div className="space-y-4">
          {stockItems.map((item) => (
            <div key={item.id} className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5">
              <div>
                <p className="font-semibold">{item.name}</p>
                <p className="text-sm text-gray-400">SKU: {item.sku}</p>
              </div>
              <div className="text-center">
                <p className="text-gray-400 text-sm">Stock</p>
                <p className={`font-bold ${item.stock === 0 ? "text-red-400" : item.stock < 10 ? "text-yellow-400" : "text-white"}`}>
                  {item.stock}
                </p>
              </div>
              <div className="text-right">
                <span className={`px-3 py-1 rounded-full text-sm ${
                  item.status === "In Stock" ? "bg-green-500/20 text-green-400" : 
                  item.status === "Low Stock" ? "bg-yellow-500/20 text-yellow-400" : 
                  "bg-red-500/20 text-red-400"
                }`}>
                  {item.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
