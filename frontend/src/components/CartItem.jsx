import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { API_URL } from "../services/api";

export default function CartItem({item}){
    const {removeFromCart}=useContext(CartContext);

    return(
        <div className="flex items-center justify-between py-2">
             <div className="flex items-center gap-6">
                <img 
                    src={item.image?.startsWith('http') ? item.image : `${API_URL}${item.image}`}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded-2xl shadow-lg border border-white/10"
                />
                <div>
                    <h2 className="text-xl font-bold text-white italic">{item.name}</h2>
                    <p className="text-gold font-black mt-1">${item.price}</p>
                </div>
            </div>

            <button
                onClick={()=>removeFromCart(item._id)}
                className="bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white px-4 py-2 rounded-xl transition-all duration-300 font-bold text-sm uppercase tracking-wider"
            >
                Remove
            </button>
        </div>

    )
}