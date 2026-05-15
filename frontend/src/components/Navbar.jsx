import { Link } from "react-router-dom";
import { SignedIn, SignedOut, UserButton, useUser } from "@clerk/clerk-react";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

export default function Navbar() {
  const { user } = useUser();
  const { cart } = useContext(CartContext);

  return (
    <nav className="glass sticky top-5 z-50 mx-8 mt-5 rounded-3xl flex justify-between items-center px-10 py-5 transition-all duration-300">
      <h1 className="text-3xl font-black tracking-tighter text-white">LUX<span className="text-gold">E</span></h1>

      <div className="flex gap-8 items-center">
        <Link className="text-gray-300 hover:text-white font-medium transition-all duration-300 hover:scale-110" to="/">
          Home
        </Link>
        <Link className="text-gray-300 hover:text-white font-medium transition-all duration-300 hover:scale-110" to="/products">
          Shop
        </Link>
        {user?.publicMetadata?.role === "admin" && (
          <Link className="text-gold hover:text-white font-bold transition-all duration-300 hover:scale-110 border-b border-gold/50" to="/admin">
            Admin
          </Link>
        )}
        <Link className="text-gray-300 hover:text-white font-medium transition-all duration-300 flex items-center gap-2" to="/cart">
          Cart
          {cart.length > 0 && (
            <span className="bg-gold text-black text-[10px] font-black px-2 py-0.5 rounded-full animate-bounce">
              {cart.length}
            </span>
          )}
        </Link>
        <Link className="text-gray-300 hover:text-white font-medium transition-all duration-300 hover:scale-110" to="/contact">
         Contact
        </Link>

        
        <SignedIn>
          <div className="flex items-center gap-4 bg-white/10 px-4 py-2 rounded-full border border-white/10">
            <span className="text-sm text-gray-200 hidden md:block font-medium">
              {user?.firstName || "User"}
            </span>
            <UserButton afterSignOutUrl="/" />
          </div>
        </SignedIn>

        <SignedOut>
          <Link
            to="/sign-in"
            className="bg-white text-black px-6 py-2 rounded-full font-bold hover:bg-gold hover:text-white transition-all duration-300 transform hover:scale-105"
          >
            LOGIN
          </Link>
        </SignedOut>
      </div>
    </nav>

  );
}