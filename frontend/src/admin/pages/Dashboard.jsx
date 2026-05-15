import AdminLayout from "../layouts/AdminLayout";
import StatCard from "../components/StatCard";

export default function Dashboard() {
  const stats = [
    { title: "Total Sales", value: "$48,920", change: "+12%" },
    { title: "Orders", value: "1,245", change: "+8%" },
    { title: "Customers", value: "892", change: "+15%" },
    { title: "Revenue", value: "$12,340", change: "+6%" },
  ];

  return (
    <AdminLayout>
      <h1 className="text-4xl font-bold mb-10">
        Admin Dashboard
      </h1>

      <div className="grid md:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6 mt-10">

        <div className="lg:col-span-2 bg-white/5 border border-white/10 rounded-2xl p-6">
          <h2 className="text-2xl font-semibold mb-6">
            Revenue Analytics
          </h2>

          <div className="h-80 bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl flex items-center justify-center text-gray-400">
            Revenue Chart Here
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <h2 className="text-2xl font-semibold mb-6">
            Recent Orders
          </h2>

          <div className="space-y-4">
            <div className="bg-white/5 p-4 rounded-xl border border-white/5 hover:border-white/10 transition">
              <p className="font-semibold">#1024</p>
              <p className="text-gray-400">John Doe</p>
              <span className="text-green-400">Paid</span>
            </div>

            <div className="bg-white/5 p-4 rounded-xl border border-white/5 hover:border-white/10 transition">
              <p className="font-semibold">#1025</p>
              <p className="text-gray-400">Sarah Smith</p>
              <span className="text-yellow-400">Pending</span>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
