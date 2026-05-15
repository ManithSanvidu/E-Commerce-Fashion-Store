import { Routes, Route, useLocation } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { useEffect } from "react";
import axios from "axios";

import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";

// Admin Pages
import AdminDashboard from "./admin/pages/Dashboard";
import AdminProducts from "./admin/pages/Products";
import AdminOrders from "./admin/pages/Orders";
import AdminCustomers from "./admin/pages/Customers";
import AdminCategories from "./admin/pages/Categories";
import AdminInventory from "./admin/pages/Inventory";
import AdminPayments from "./admin/pages/Payments";
import AdminReviews from "./admin/pages/Reviews";
import AdminCoupons from "./admin/pages/Coupons";
import AdminAnalytics from "./admin/pages/Analytics";
import AdminSettings from "./admin/pages/Settings";
import AdminProfile from "./admin/pages/Profile";

import { SignIn, SignUp } from "@clerk/clerk-react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Contact from "./pages/Contact";

export default function App() {
  const { user } = useUser();
  const location = useLocation();
  const isAdminPath = location.pathname.startsWith("/admin");
  const isAdmin = user?.publicMetadata?.role === "admin";

  useEffect(() => {
    const syncUser = async () => {
      if (user) {
        try {
          await axios.post("http://localhost:5000/api/users/sync", {
            userId: user.id,
            email: user.emailAddresses[0].emailAddress,
            name: user.firstName,
          });
        } catch (error) {
          console.log("User sync failed:", error.message);
        }
      }
    };

    syncUser();
  }, [user]);

  return (
    <>
      {!isAdminPath && !isAdmin && <Navbar />}
      <Routes>
        {/* User Routes - Only visible to non-admins */}
        {!isAdmin && (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
          </>
        )}
        
        {/* Admin Routes - Only accessible to admins */}
        {isAdmin && (
          <>
            <Route path="/" element={<AdminDashboard />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/products" element={<AdminProducts />} />
            <Route path="/admin/orders" element={<AdminOrders />} />
            <Route path="/admin/customers" element={<AdminCustomers />} />
            <Route path="/admin/categories" element={<AdminCategories />} />
            <Route path="/admin/inventory" element={<AdminInventory />} />
            <Route path="/admin/payments" element={<AdminPayments />} />
            <Route path="/admin/reviews" element={<AdminReviews />} />
            <Route path="/admin/coupons" element={<AdminCoupons />} />
            <Route path="/admin/analytics" element={<AdminAnalytics />} />
            <Route path="/admin/settings" element={<AdminSettings />} />
            <Route path="/admin/profile" element={<AdminProfile />} />
          </>
        )}

        <Route 
          path="/sign-in/*" 
          element={
            <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] py-10 px-4">
              <SignIn 
                routing="path" 
                path="/sign-in" 
                appearance={{
                  elements: {
                    rootBox: "w-full flex justify-center",
                    card: "glass border-white/10 rounded-[2.5rem] p-6 md:p-12 shadow-2xl backdrop-blur-2xl w-full max-w-md",
                    headerTitle: "text-white font-black text-3xl tracking-tighter mb-1",
                    headerSubtitle: "text-gray-400 font-medium mb-8 text-base",
                    dividerRow: "my-6",
                    dividerLine: "bg-white/5",
                    dividerText: "text-gray-500 font-bold uppercase text-[10px] tracking-[0.2em]",
                    formFieldLabel: "text-gray-300 font-semibold mb-2 text-sm",
                    formFieldInput: "bg-white/5 border-white/10 text-white rounded-2xl focus:border-gold focus:ring-1 focus:ring-gold transition-all duration-300 py-4 px-6 text-base",
                    formButtonPrimary: "bg-white hover:bg-gold text-black hover:text-white font-black py-4 rounded-2xl transition-all duration-500 transform hover:scale-[1.02] active:scale-95 shadow-xl mt-4",
                    socialButtonsBlockButton: "glass hover:bg-white/10 border-white/10 text-white transition-all duration-300 py-3.5 rounded-2xl mb-2",
                    footerActionText: "text-gray-500 font-medium",
                    footerActionLink: "text-gold hover:text-gold/80 font-extrabold transition-colors",
                    identityPreviewText: "text-white font-bold",
                    identityPreviewEditButton: "text-gold hover:text-gold/80",
                    footer: "mt-6",
                  },
                  layout: {
                    headerTitle: "Sign in to Ecommerce fashion",
                    headerSubtitle: "Welcome back! Please sign in to continue",
                    logoPlacement: "none",
                    showOptionalFields: false,
                  }
                }}
              />
            </div>
          } 
        />
        <Route 
          path="/sign-up/*" 
          element={
            <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] py-10 px-4">
              <SignUp 
                routing="path" 
                path="/sign-up" 
                appearance={{
                  elements: {
                    rootBox: "w-full flex justify-center",
                    card: "glass border-white/10 rounded-[2.5rem] p-6 md:p-12 shadow-2xl backdrop-blur-2xl w-full max-w-md",
                    headerTitle: "text-white font-black text-3xl tracking-tighter mb-1",
                    headerSubtitle: "text-gray-400 font-medium mb-8 text-base",
                    dividerRow: "my-6",
                    dividerLine: "bg-white/5",
                    dividerText: "text-gray-500 font-bold uppercase text-[10px] tracking-[0.2em]",
                    formFieldLabel: "text-gray-300 font-semibold mb-2 text-sm",
                    formFieldInput: "bg-white/5 border-white/10 text-white rounded-2xl focus:border-gold focus:ring-1 focus:ring-gold transition-all duration-300 py-4 px-6 text-base",
                    formButtonPrimary: "bg-white hover:bg-gold text-black hover:text-white font-black py-4 rounded-2xl transition-all duration-500 transform hover:scale-[1.02] active:scale-95 shadow-xl mt-4",
                    socialButtonsBlockButton: "glass hover:bg-white/10 border-white/10 text-white transition-all duration-300 py-3.5 rounded-2xl mb-2",
                    footerActionText: "text-gray-500 font-medium",
                    footerActionLink: "text-gold hover:text-gold/80 font-extrabold transition-colors",
                    identityPreviewText: "text-white font-bold",
                    identityPreviewEditButton: "text-gold hover:text-gold/80",
                    footer: "mt-6",
                  },
                  layout: {
                    headerTitle: "Join Ecommerce fashion",
                    headerSubtitle: "Create an account to start your fashion journey",
                    logoPlacement: "none",
                  }
                }}
              />
            </div>
          } 
        />
      </Routes>
      {!isAdminPath && !isAdmin && <Footer />}
    </>
  );
}