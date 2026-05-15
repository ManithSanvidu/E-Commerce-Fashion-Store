/* eslint-disable react-hooks/purity */
import { useParams, Link } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { CartContext } from "../context/CartContext";
import axios from "axios";

export default function ProductDetails() {
    const { id } = useParams();
    const { addToCart } = useContext(CartContext);
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [added, setAdded] = useState(false);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/products/${id}`);
                setProduct(response.data);
            } catch (error) {
                console.error("Error loading product details:", error);
                setProduct(null);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    if (loading) {
        return <div className="text-white text-center py-20">Loading product details...</div>;
    }

    if (!product) {
        return <div className="text-white text-center py-20">Product not found</div>;
    }

    const handleAdd = () => {
        addToCart({ ...product, _id: product._id });
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
    };

    return (
        <div className="p-10 md:p-20 flex flex-col md:flex-row gap-12 max-w-7xl mx-auto">
            <div className="flex-1 glass p-4 rounded-[2.5rem]">
                <img
                    src={product.image.startsWith('http') ? product.image : `http://localhost:5000${product.image}`}
                    alt={product.name}
                    className="rounded-[2rem] w-full h-[600px] object-cover"
                />
            </div>

            <div className="flex-1 space-y-8 py-4">
                <div>
                    <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white italic">{product.name.toUpperCase()}</h1>
                    <p className="text-gold font-bold tracking-[0.3em] mt-4 uppercase">PREMIUM COLLECTION</p>
                </div>

                <p className="text-gray-300 text-xl font-light leading-relaxed">
                    {product.description || "Indulge in the finest craftsmanship with our exclusive piece. Every detail is designed for those who appreciate the intersection of luxury and modern style."}
                </p>

                <p className="text-5xl font-black text-white italic">${product.price}</p>

                <div className="pt-6 space-y-4">
                    <button
                        onClick={handleAdd}
                        className={`w-full font-black py-5 rounded-2xl transition-all duration-500 transform hover:scale-105 shadow-xl ${added ? 'bg-gold text-white' : 'bg-white text-black hover:bg-gold hover:text-white'}`}
                    >
                        {added ? "ADDED TO BAG ✓" : "ADD TO BAG"}
                    </button>
                    <Link to="/products" className="block text-center text-gray-400 hover:text-white transition-colors py-2 font-medium">
                        ← BACK TO COLLECTION
                    </Link>
                </div>
            </div>
        </div>
    );
}

