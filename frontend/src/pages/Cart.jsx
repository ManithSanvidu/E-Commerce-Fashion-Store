import CartItem from "../components/CartItem";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";

import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";

export default function Cart() {
  const { cart } = useContext(CartContext);

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <>
      <SignedIn>
        <div className="p-10 md:p-20 max-w-7xl mx-auto min-h-screen">
          <h1 className="text-4xl md:text-6xl font-black mb-12 tracking-tighter text-white italic">YOUR <span className="text-gold">BAG</span></h1>

          {cart.length === 0 ? (
            <div className="glass text-center py-32 rounded-[3rem] animate-in fade-in slide-in-from-bottom duration-500">
              <h2 className="text-3xl font-bold text-white mb-4">Your bag is currently empty</h2>
              <p className="text-gray-400 text-lg mb-10">Discover our latest arrivals and find something you love.</p>
              <Link to="/products" className="bg-white text-black px-10 py-4 rounded-full font-bold hover:bg-gold hover:text-white transition-all transform hover:scale-110">
                GO SHOPPING
              </Link>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2 space-y-6">
                {cart.map((item) => (
                  <div key={item._id} className="glass p-6 rounded-3xl transition-all hover:border-white/40">
                    <CartItem item={item} />
                  </div>
                ))}
              </div>

              <div className="glass p-10 rounded-[2.5rem] h-fit sticky top-32">
                <h2 className="text-2xl font-black mb-8 tracking-tight text-white uppercase italic">Summary</h2>
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between text-gray-400">
                    <span>Subtotal</span>
                    <span className="text-white font-medium">${total}</span>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    <span>Shipping</span>
                    <span className="text-white font-medium">Calculated at checkout</span>
                  </div>
                  <div className="pt-4 border-t border-white/10 flex justify-between">
                    <span className="text-xl font-bold text-white">Total</span>
                    <span className="text-2xl font-black text-gold italic">${total}</span>
                  </div>
                </div>
                <Link to="/checkout" className="block w-full">
                  <button className="w-full bg-white text-black py-5 rounded-2xl font-black hover:bg-gold hover:text-white transition-all transform hover:scale-105 shadow-2xl">
                    CHECKOUT NOW
                  </button>
                </Link>
              </div>
            </div>
          )}
        </div>


      </SignedIn>

      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
}