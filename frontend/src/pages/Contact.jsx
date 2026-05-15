import { useState } from "react";

export default function Contact(){
    const[form,setForm]=useState({
        name:"",
        email:"",
        message:"",
    });

    const handleChange=(e)=>{
        setForm({...form,[e.target.name]:e.target.value});
    };

    const handleSubmit=(e)=>{
        e.preventDefault();
        console.log(form);
    }

    return(
        <div className="min-h-screen text-white">
             <div
                className="h-[60vh] flex items-center justify-center text-center relative px-4"
                style={{
                    backgroundImage:
                        "linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0.8)), url('https://images.unsplash.com/photo-1521334884684-d80222895322?q=80&w=2070')",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
            >
            < div className="glass p-12 md:p-16 rounded-[3rem] max-w-3xl animate-in fade-in zoom-in duration-700">
            <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter">
            CONTACT <span className="text-gold">US</span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-gray-300 font-light">
            We’d love to hear from you. Reach out for inquiries, styling advice, or collaborations.
          </p>
            </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-20 py-20 grid md:grid-cols-2 gap-12">

        <div className="glass p-10 rounded-[2.5rem] space-y-6">
          <h2 className="text-3xl font-bold tracking-tight">GET IN TOUCH</h2>

          <div>
            <p className="text-gold font-semibold">Address</p>
            <p className="text-gray-300">123 Couture Avenue, Paris, France</p>
          </div>

          <div>
            <p className="text-gold font-semibold">Email</p>
            <p className="text-gray-300">support@couture.com</p>
          </div>

          <div>
            <p className="text-gold font-semibold">Phone</p>
            <p className="text-gray-300">+33 1 23 45 67 89</p>
          </div>

          <div className="pt-4">
            <p className="text-gray-400 text-sm">
              Our team typically responds within 24 hours.
            </p>
          </div>
        </div>

        <div className="glass p-10 rounded-[2.5rem]">
          <h2 className="text-3xl font-bold mb-6 tracking-tight">
            SEND A MESSAGE
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">

            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
              className="w-full p-4 rounded-xl bg-white/10 border border-white/10 focus:border-gold outline-none text-white placeholder-gray-400"
            />

            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={form.email}
              onChange={handleChange}
              className="w-full p-4 rounded-xl bg-white/10 border border-white/10 focus:border-gold outline-none text-white placeholder-gray-400"
            />

            <textarea
              name="message"
              rows="5"
              placeholder="Your Message"
              value={form.message}
              onChange={handleChange}
              className="w-full p-4 rounded-xl bg-white/10 border border-white/10 focus:border-gold outline-none text-white placeholder-gray-400"
            />

            <button
              type="submit"
              className="w-full bg-white text-black hover:bg-gold hover:text-white py-4 rounded-full font-bold text-lg transition-all duration-500 transform hover:scale-105 shadow-[0_0_20px_rgba(255,255,255,0.3)]"
            >
              SEND MESSAGE
            </button>

          </form>
        </div>
      </div>

     
      <div className="mx-6 md:mx-20 mb-20 glass rounded-[3rem] overflow-hidden relative">
        <div className="absolute inset-0 bg-gold/5 animate-pulse"></div>
        <iframe
          title="map"
          src="https://maps.google.com/maps?q=paris&t=&z=13&ie=UTF8&iwloc=&output=embed"
          className="w-full h-100 opacity-80"
        />
      </div>

        </div>
    )
}