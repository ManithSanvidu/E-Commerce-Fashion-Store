import AdminLayout from "../layouts/AdminLayout";

export default function Customers() {
  const customers = [
    { id: 1, name: "John Doe", email: "john@example.com", orders: 12, spent: "$1,200", status: "Active" },
    { id: 2, name: "Sarah Smith", email: "sarah@example.com", orders: 8, spent: "$850", status: "Active" },
    { id: 3, name: "Mike Johnson", email: "mike@example.com", orders: 5, spent: "$420", status: "Inactive" },
  ];

  return (
    <AdminLayout>
      <h1 className="text-4xl font-bold mb-10">Customers</h1>

      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10 text-gray-400">
              <th className="py-4 text-left">Name</th>
              <th className="py-4 text-left">Email</th>
              <th className="py-4 text-left">Orders</th>
              <th className="py-4 text-left">Total Spent</th>
              <th className="py-4 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer.id} className="border-b border-white/5 hover:bg-white/[0.02] transition">
                <td className="py-4 font-medium">{customer.name}</td>
                <td className="py-4 text-gray-400">{customer.email}</td>
                <td className="py-4">{customer.orders}</td>
                <td className="py-4">{customer.spent}</td>
                <td className="py-4">
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    customer.status === "Active" ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"
                  }`}>
                    {customer.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}
