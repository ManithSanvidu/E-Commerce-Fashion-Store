import AdminLayout from "../layouts/AdminLayout";

export default function Orders() {
  return (
    <AdminLayout>
      <h1 className="text-4xl font-bold mb-10">
        Orders
      </h1>

      <div className="space-y-4">
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex justify-between items-center hover:bg-white/[0.07] transition">
          <div>
            <p className="font-semibold text-lg">#1024</p>
            <p className="text-gray-400">John Doe</p>
          </div>

          <div>
            <span className="bg-green-500/20 text-green-400 px-4 py-2 rounded-full text-sm font-medium">
              Paid
            </span>
          </div>
        </div>
        
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex justify-between items-center hover:bg-white/[0.07] transition">
          <div>
            <p className="font-semibold text-lg">#1025</p>
            <p className="text-gray-400">Sarah Smith</p>
          </div>

          <div>
            <span className="bg-yellow-500/20 text-yellow-400 px-4 py-2 rounded-full text-sm font-medium">
              Pending
            </span>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
