import React,{ useState } from "react";
import Authentication from "./Authentication";

export default function HeroSection() {
  const [ showAuth, setShowAuth ] = useState(false)

  return (
    <section className="text-center py-20 px-4 bg-gray-200">
      <h2 className="text-4xl md:text-5xl font-extrabold text-black mb-2">
        Fast, Reliable Rides<br />When You Need Them
      </h2>
      <p className="max-w-xl mx-auto text-black text-lg mb-6">
        Velox connects you with local drivers for quick, affordable transportation.
        Simple, fast, and built for communities everywhere.
      </p>
      <div className="flex flex-col md:flex-row gap-4 justify-center">
        <button onClick={() => setShowAuth(true)} className="bg-black text-white px-4 py-2 rounded-md">
          Get a Ride
        </button>
        {showAuth && <Authentication
           onClose={() => setShowAuth(false)}
        />}
        <button onClick={() => setShowAuth(true)} className="bg-black text-white px-4 py-2 rounded-md">
          Drive with us
        </button>
        {showAuth && <Authentication  
          onClose={() => setShowAuth(false)}
        />}
      </div>
    </section>
  );
}
