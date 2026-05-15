import {Link} from "react-router-dom";
import { API_URL } from "../services/api";

export default function ProductCard({product}){
    return(
        <div className="glass rounded-[2rem] overflow-hidden transition-all duration-500 hover:scale-[1.05] hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)] group">
            <div className="relative overflow-hidden h-80">
                <img src={product.image.startsWith('http') ? product.image : `${API_URL}${product.image}`} className="h-full w-full object-cover transition duration-700 group-hover:scale-110"/>
                {product.oldPrice && (
                    <div className="absolute top-4 right-4 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg animate-pulse">
                        -{Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}%
                    </div>
                )}
            </div>
            <div className="p-6">
                <p className="text-gold text-xs font-black tracking-[0.2em] uppercase mb-1">{product.brand}</p>
                <h2 className="text-xl font-bold text-white truncate">{product.name}</h2>
                <div className="flex items-center gap-3 mt-2">
                    <p className="text-white font-bold text-lg">${product.price}</p>
                    {product.oldPrice && (
                        <p className="text-gray-500 line-through text-sm">${product.oldPrice}</p>
                    )}
                </div>

                <Link to={`/product/${product._id}`}>
                <button className="mt-6 w-full bg-white text-black hover:bg-gold hover:text-white font-bold py-4 rounded-2xl transition-all duration-300 transform group-hover:translate-y-[-4px] shadow-xl">
                    VIEW DETAILS
                </button>
                </Link>
            </div>
        </div>

    );
}