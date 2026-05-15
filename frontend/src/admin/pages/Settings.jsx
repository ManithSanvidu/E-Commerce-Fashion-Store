import AdminLayout from "../layouts/AdminLayout";

export default function Settings() {
  return (
    <AdminLayout>
      <h1 className="text-4xl font-bold mb-10">Settings</h1>

      <div className="max-w-4xl space-y-8">
        <section className="bg-white/5 border border-white/10 rounded-2xl p-8">
          <h2 className="text-xl font-bold mb-6">General Settings</h2>
          <div className="grid gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-sm text-gray-400">Store Name</label>
              <input type="text" defaultValue="LUXE Fashion" className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-white/20 transition" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm text-gray-400">Contact Email</label>
              <input type="email" defaultValue="admin@luxe.com" className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-white/20 transition" />
            </div>
          </div>
        </section>

        <section className="bg-white/5 border border-white/10 rounded-2xl p-8">
          <h2 className="text-xl font-bold mb-6">Payment Configuration</h2>
          <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white flex items-center justify-center rounded-lg">
                <span className="text-black font-bold">Stripe</span>
              </div>
              <div>
                <p className="font-semibold">Stripe Payments</p>
                <p className="text-sm text-gray-400">Connected</p>
              </div>
            </div>
            <button className="text-red-400 text-sm hover:underline">Disconnect</button>
          </div>
        </section>

        <div className="flex justify-end">
          <button className="bg-white text-black px-8 py-3 rounded-xl font-bold hover:bg-gray-200 transition">
            Save Changes
          </button>
        </div>
      </div>
    </AdminLayout>
  );
}
