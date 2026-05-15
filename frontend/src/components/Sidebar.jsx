import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  Users,
  Tags,
  Warehouse,
  CreditCard,
  Star,
  TicketPercent,
  BarChart3,
  Settings,
  UserCircle,
} from "lucide-react";

import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();

  const menuItems = [
    { icon: <LayoutDashboard size={20} />, label: "Dashboard", path: "/admin" },
    { icon: <ShoppingBag size={20} />, label: "Products", path: "/admin/products" },
    { icon: <Package size={20} />, label: "Orders", path: "/admin/orders" },
    { icon: <Users size={20} />, label: "Customers", path: "/admin/customers" },
    { icon: <Tags size={20} />, label: "Categories", path: "/admin/categories" },
    { icon: <Warehouse size={20} />, label: "Inventory", path: "/admin/inventory" },
    { icon: <CreditCard size={20} />, label: "Payments", path: "/admin/payments" },
    { icon: <Star size={20} />, label: "Reviews", path: "/admin/reviews" },
    { icon: <TicketPercent size={20} />, label: "Coupons", path: "/admin/coupons" },
    { icon: <BarChart3 size={20} />, label: "Analytics", path: "/admin/analytics" },
    { icon: <Settings size={20} />, label: "Settings", path: "/admin/settings" },
    { icon: <UserCircle size={20} />, label: "Profile", path: "/admin/profile" },
  ];

  return (
    <aside className="w-72 bg-[#111111] border-r border-white/10 hidden md:flex flex-col p-6">
      <h1 className="text-3xl font-bold mb-10 tracking-widest text-white">
        LUXE
      </h1>

      <nav className="flex flex-col gap-2">
        {menuItems.map((item, index) => (
          <Link
            key={index}
            to={item.path}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition
            ${
              location.pathname === item.path
                ? "bg-white text-black"
                : "text-white hover:bg-white/10"
            }`}
          >
            {item.icon}
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
