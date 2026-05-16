import { useState, useMemo, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import api from "../services/api";

export default function Products() {
  const [apiProducts, setApiProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [priceRange, setPriceRange] = useState(500);
  const [color, setColor] = useState("All");
  const [size, setSize] = useState("All");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get("/api/products");
        setApiProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  const categories = ["All", ...new Set(apiProducts.map(p => p.category))];
  const colors = ["All", ...new Set(apiProducts.map(p => p.color || "All"))];
  const sizes = ["All", "XS", "S", "M", "L", "XL"];

  const filteredProducts = useMemo(() => {
    return apiProducts.filter(p => {
      const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || 
                          (p.brand && p.brand.toLowerCase().includes(search.toLowerCase()));
      const matchCategory = category === "All" || p.category === category;
      const matchPrice = p.price <= priceRange;
      const matchColor = color === "All" || p.color === color;
      const matchSize = size === "All" || (Array.isArray(p.sizes) ? p.sizes.includes(size) : p.sizes === size);

      return matchSearch && matchCategory && matchPrice && matchColor && matchSize;
    });
  }, [search, category, priceRange, color, size, apiProducts]);

  return (
    <div className="p-6 md:p-12 lg:p-20 min-h-screen bg-transparent">
      <div className="max-w-[1600px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-8">
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white">
            OUR <span className="text-gold">COLLECTION</span>
          </h1>
          
          <div className="relative w-full md:w-96 group">
            <input
              type="text"
              placeholder="Search products or brands..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white/5 border border-white/10 text-white rounded-2xl py-4 px-6 focus:outline-none focus:ring-2 focus:ring-gold/50 transition-all duration-300 placeholder:text-gray-500 group-hover:bg-white/10"
            />
            <div className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar */}
          <aside className="w-full lg:w-80 shrink-0 space-y-10">
            <div className="glass p-8 rounded-3xl space-y-8 border border-white/5 shadow-2xl">
              <div>
                <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 bg-gold rounded-full"></span> CATEGORY
                </h3>
                <div className="flex flex-wrap gap-2">
                  {categories.map(c => (
                    <button
                      key={c}
                      onClick={() => setCategory(c)}
                      className={`px-4 py-2 rounded-xl text-sm font-bold transition-all duration-300 ${
                        category === c ? "bg-gold text-white shadow-lg shadow-gold/20" : "bg-white/5 text-gray-400 hover:text-white"
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 bg-gold rounded-full"></span> MAX PRICE: <span className="text-gold">${priceRange}</span>
                </h3>
                <input
                  type="range"
                  min="0"
                  max="500"
                  step="10"
                  value={priceRange}
                  onChange={(e) => setPriceRange(Number(e.target.value))}
                  className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-gold"
                />
              </div>

              <div>
                <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 bg-gold rounded-full"></span> COLOR
                </h3>
                <div className="flex flex-wrap gap-2">
                  {colors.map(c => (
                    <button
                      key={c}
                      onClick={() => setColor(c)}
                      className={`px-4 py-2 rounded-xl text-sm font-bold transition-all duration-300 ${
                        color === c ? "bg-gold text-white shadow-lg shadow-gold/20" : "bg-white/5 text-gray-400 hover:text-white"
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 bg-gold rounded-full"></span> SIZE
                </h3>
                <div className="grid grid-cols-3 gap-2">
                  {sizes.map(s => (
                    <button
                      key={s}
                      onClick={() => setSize(s)}
                      className={`px-2 py-2 rounded-xl text-xs font-bold transition-all duration-300 truncate ${
                        size === s ? "bg-gold text-white shadow-lg shadow-gold/20" : "bg-white/5 text-gray-400 hover:text-white"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <button 
                onClick={() => {
                  setCategory("All");
                  setPriceRange(500);
                  setColor("All");
                  setSize("All");
                  setSearch("");
                }}
                className="w-full py-4 rounded-2xl bg-white/5 text-white font-bold hover:bg-white/10 transition-all border border-white/10"
              >
                RESET FILTERS
              </button>
            </div>
          </aside>

          {/* Grid */}
          <div className="flex-1">
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProducts.map((p) => (
                  <div key={p._id} className="animate-in fade-in zoom-in duration-500">
                    <ProductCard product={p} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="glass rounded-[3rem] p-20 text-center space-y-6">
                <div className="text-6xl text-gray-700">🔍</div>
                <h2 className="text-3xl font-bold text-white">No products found</h2>
                <p className="text-gray-400">Try adjusting your filters or search terms.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
