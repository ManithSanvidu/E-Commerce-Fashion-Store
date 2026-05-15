import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div
        className="h-screen flex items-center justify-center text-white text-center relative px-4"
        style={{
          backgroundImage:
            "linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.7)), url('https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="glass p-12 md:p-20 rounded-[3rem] max-w-4xl animate-in fade-in zoom-in duration-700">
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-tight italic">
            COUTURE <br/> <span className="text-gold">AVANT-GARDE</span>
          </h1>
          <p className="mt-6 text-xl md:text-2xl text-gray-200 font-light tracking-wide max-w-2xl mx-auto">
            Experience the pinnacle of luxury fashion. Curated collections for the modern aesthetic.
          </p>

          <Link to="/products">
            <button className="mt-10 bg-white text-black hover:bg-gold hover:text-white px-10 py-5 rounded-full font-bold text-lg transition-all duration-500 transform hover:scale-110 shadow-[0_0_20px_rgba(255,255,255,0.3)]">
              SHOP NOW
            </button>
          </Link>

        </div>
      </div>

      {/* Category Grid */}
      <div className="p-10 md:p-20 max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-black mb-12 tracking-tight">CATEGORIES</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            { img: "https://tse1.mm.bing.net/th/id/OIP.sbHEZuQPWhUlyuVR7Z_VpwHaLH?w=1536&h=2304&rs=1&pid=ImgDetMain&o=7&rm=3", title: "Men's Luxury" },
            { img: "https://images.unsplash.com/photo-1469334031218-e382a71b716b", title: "Women's Elite" },
            { img: "https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93", title: "Signature Accessories" },
          ].map((cat, i) => (
            <div
              key={i}
              className="relative group overflow-hidden rounded-[2.5rem] glass aspect-[4/5]"
            >
              <img
                src={cat.img}
                alt={cat.title}
                className="h-full w-full object-cover transition duration-700 group-hover:scale-110 grayscale-[50%] group-hover:grayscale-0"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-8 transform translate-y-4 group-hover:translate-y-0 transition duration-500">
                <div>
                  <p className="text-gold font-bold tracking-widest text-sm mb-2">EXPLORE</p>
                  <h3 className="text-2xl font-bold text-white">{cat.title}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Banner */}
      <div className="text-center py-24 glass mx-10 md:mx-20 rounded-[3rem] mb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gold/5 animate-pulse"></div>
        <h2 className="text-4xl md:text-6xl font-black italic tracking-tighter relative z-10">FEATURED <span className="text-gold">STYLES</span></h2>
        <p className="text-gray-300 mt-4 text-xl font-light relative z-10">Elegance meets everyday versatility</p>
        <button className="mt-8 border-b-2 border-gold text-gold font-bold py-2 hover:text-white hover:border-white transition-all duration-300 relative z-10">VIEW LOOKBOOK</button>
      </div>

      {/* Trending Now Section */}
      <TrendingNow />
    </div>
  );
}

function TrendingNow() {
  const [products, setProducts] = useState([]);
  const [activeSection, setActiveSection] = useState("trending");
  const [loading, setLoading] = useState(true);

  const sections = [
    { id: "new-arrivals", label: "New Arrivals" },
    { id: "trending", label: "Trending" },
    { id: "best-sellers", label: "Best Sellers" },
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = products.filter(p => p.section === activeSection);

  return (
    <div className="px-10 md:px-20 pb-24">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8">
        <div>
          <h2 className="text-5xl font-black tracking-tighter text-white">COLLECTIONS <span className="text-gold">NOW</span></h2>
          <p className="text-gray-400 mt-2 text-lg">From the not-so-basics to the latest trending styles shop our top picks.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          {sections.map(section => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`px-6 py-2 rounded-full font-bold text-sm transition-all duration-300 ${
                activeSection === section.id
                  ? "bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.4)]"
                  : "bg-white/10 text-white hover:bg-white/20 border border-white/10"
              }`}
            >
              {section.label}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="text-center py-20 text-gray-400">Loading collections...</div>
      ) : filteredProducts.length === 0 ? (
        <div className="text-center py-20 text-gray-400">No products found in this section.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
          {filteredProducts.map(product => (
            <div key={product._id} className="animate-in fade-in slide-in-from-bottom-4 duration-700">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
