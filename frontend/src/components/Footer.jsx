export default function Footer() {
  return (
    <footer className="glass mx-8 mb-8 rounded-[3rem] p-12 md:p-20 mt-10">
      <div className="grid md:grid-cols-3 gap-12 items-start">
        <div className="space-y-4">
          <h2 className="text-4xl font-black tracking-tighter text-white italic">
            LUX<span className="text-gold">E</span>
          </h2>
          <p className="text-gray-400 font-light max-w-xs">
            Redefining modern luxury fashion through curated elegance and avant-garde style.
          </p>
        </div>
        
        <div className="grid grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="text-white font-bold tracking-widest text-sm uppercase">Quick Links</h3>
            <ul className="space-y-2 text-gray-400 font-light">
              <li className="hover:text-gold transition-colors cursor-pointer">About Us</li>
              <li className="hover:text-gold transition-colors cursor-pointer">Collections</li>
              <li className="hover:text-gold transition-colors cursor-pointer">Privacy Policy</li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-white font-bold tracking-widest text-sm uppercase">Support</h3>
            <ul className="space-y-2 text-gray-400 font-light">
              <li className="hover:text-gold transition-colors cursor-pointer">Shipping</li>
              <li className="hover:text-gold transition-colors cursor-pointer">Returns</li>
              <li className="hover:text-gold transition-colors cursor-pointer">Contact</li>
            </ul>
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-white font-bold tracking-widest text-sm uppercase">Newsletter</h3>
          <div className="flex glass bg-white/5 rounded-2xl overflow-hidden p-1 border-white/10">
            <input 
              type="email" 
              placeholder="Email address" 
              className="bg-transparent border-none text-white px-4 py-2 w-full focus:outline-none"
            />
            <button className="bg-white text-black px-6 py-2 rounded-xl font-bold hover:bg-gold hover:text-white transition-all transform active:scale-95">
              JOIN
            </button>
          </div>
        </div>
      </div>
      
      <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-gray-500 text-sm font-light">© 2026 LUXE Fashion. All rights reserved.</p>
        <div className="flex gap-6 text-gray-400">
          <span className="hover:text-white cursor-pointer transition-colors">Instagram</span>
          <span className="hover:text-white cursor-pointer transition-colors">Twitter</span>
          <span className="hover:text-white cursor-pointer transition-colors">LinkedIn</span>
        </div>
      </div>
    </footer>
  );
}
