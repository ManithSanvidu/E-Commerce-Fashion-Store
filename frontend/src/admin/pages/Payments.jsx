import AdminLayout from "../layouts/AdminLayout";

export default function Payments() {
  const transactions = [
    { id: 1, date: "2026-05-15", customer: "John Doe", amount: "$120.00", method: "Visa", status: "Completed" },
    { id: 2, date: "2026-05-14", customer: "Sarah Smith", amount: "$85.00", method: "Mastercard", status: "Pending" },
    { id: 3, date: "2026-05-14", customer: "Mike Johnson", amount: "$210.00", method: "PayPal", status: "Completed" },
  ];

  return (
    <AdminLayout>
      <h1 className="text-4xl font-bold mb-10">Payments</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-gradient-to-br from-green-500/20 to-transparent border border-green-500/20 rounded-2xl p-6">
          <p className="text-gray-400">Total Revenue</p>
          <h2 className="text-3xl font-bold mt-2">$48,920</h2>
        </div>
        <div className="bg-gradient-to-br from-yellow-500/20 to-transparent border border-yellow-500/20 rounded-2xl p-6">
          <p className="text-gray-400">Pending</p>
          <h2 className="text-3xl font-bold mt-2">$1,240</h2>
        </div>
        <div className="bg-gradient-to-br from-blue-500/20 to-transparent border border-blue-500/20 rounded-2xl p-6">
          <p className="text-gray-400">Refunded</p>
          <h2 className="text-3xl font-bold mt-2">$420</h2>
        </div>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10 text-gray-400">
              <th className="py-4 text-left">Date</th>
              <th className="py-4 text-left">Customer</th>
              <th className="py-4 text-left">Amount</th>
              <th className="py-4 text-left">Method</th>
              <th className="py-4 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx) => (
              <tr key={tx.id} className="border-b border-white/5 hover:bg-white/[0.02] transition">
                <td className="py-4 text-gray-400">{tx.date}</td>
                <td className="py-4 font-medium">{tx.customer}</td>
                <td className="py-4 font-bold">{tx.amount}</td>
                <td className="py-4">{tx.method}</td>
                <td className="py-4">
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    tx.status === "Completed" ? "bg-green-500/20 text-green-400" : "bg-yellow-500/20 text-yellow-400"
                  }`}>
                    {tx.status}
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
