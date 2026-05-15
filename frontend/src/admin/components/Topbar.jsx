import { Search, Bell, User } from "lucide-react";

export default function Topbar() {
  return (
    <header className="flex items-center justify-between mb-10">
      <div className="relative w-96">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        <input
          type="text"
          placeholder="Search analytics, orders, or products..."
          className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-white/20 transition"
        />
      </div>

      <div className="flex items-center gap-4">
        <button className="p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition relative">
          <Bell size={20} />
          <span className="absolute top-3 right-3 w-2 h-2 bg-red-500 rounded-full border-2 border-[#0F0F0F]"></span>
        </button>
        
        <div className="flex items-center gap-3 pl-4 border-l border-white/10">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold">Admin User</p>
            <p className="text-xs text-gray-400">Super Admin</p>
          </div>
          <div className="w-10 h-10 bg-gradient-to-tr from-gray-700 to-gray-600 rounded-xl flex items-center justify-center border border-white/10">
            <User size={20} />
          </div>
        </div>
      </div>
    </header>
  );
}
