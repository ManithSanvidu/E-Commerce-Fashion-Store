import AdminLayout from "../layouts/AdminLayout";
import { User, Mail, Shield, LogOut } from "lucide-react";
import { useClerk, useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const { signOut } = useClerk();
  const { user } = useUser();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <AdminLayout>
      <h1 className="text-4xl font-bold mb-10">Profile</h1>

      <div className="max-w-4xl bg-white/5 border border-white/10 rounded-2xl p-8">
        <div className="flex items-center gap-8 mb-10">
          <div className="w-24 h-24 bg-gradient-to-tr from-gray-700 to-gray-600 rounded-2xl flex items-center justify-center border-2 border-white/10 overflow-hidden">
            {user?.imageUrl ? (
              <img src={user.imageUrl} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <User size={48} />
            )}
          </div>
          <div>
            <h2 className="text-3xl font-bold">{user?.fullName || "Admin User"}</h2>
            <p className="text-gray-400">Super Administrator</p>
          </div>
        </div>

        <div className="grid gap-6 mb-10">
          <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-white/5">
            <Mail className="text-gray-400" size={20} />
            <div>
              <p className="text-sm text-gray-400">Email Address</p>
              <p className="font-medium">{user?.primaryEmailAddress?.emailAddress || "admin@luxe.com"}</p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-white/5">
            <Shield className="text-gray-400" size={20} />
            <div>
              <p className="text-sm text-gray-400">Access Level</p>
              <p className="font-medium">Full System Access</p>
            </div>
          </div>
        </div>

        <button 
          onClick={handleLogout}
          className="flex items-center gap-2 text-red-400 hover:text-red-300 transition font-semibold"
        >
          <LogOut size={20} />
          Logout from Dashboard
        </button>
      </div>
    </AdminLayout>
  );
}
