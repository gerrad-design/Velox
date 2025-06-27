import React, { useState, useEffect } from "react";
import Authentication from "./Authentication";
import { useNavigate } from "react-router-dom";

export default function HeroSection() {
  const [showAuth, setShowAuth] = useState(false);
  const [userType, setUserType] = useState(null); 
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("userType"); 
    if (token && role) {
      setUserType(role);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userType");
    setUserType(null);
    alert("Logout successful!");
    navigate("/");
  };


  const handleRedirect = () => {
    if (userType === "rider") {
      navigate("/rider/dashboard");
    } else if (userType === "driver") {
      navigate("/driver/dashboard");
    }
  };

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
        {userType && (
          <>
            <button onClick={handleRedirect} className="bg-black text-white px-4 py-2 rounded-md">
              {userType === "rider" ? "Go to Rider Dashboard" : "Go to Driver Dashboard"}
            </button>
            <button onClick={handleLogout} className="border border-white bg-black text-white px-4 py-2 rounded-md">
              Log out
            </button>
          </>
        )}

        {!userType && (
          <>
            <button onClick={() => setShowAuth(true)} className="bg-black text-white px-4 py-2 rounded-md">
              Get a Ride
            </button>
            <button onClick={() => setShowAuth(true)} className="bg-black text-white px-4 py-2 rounded-md">
              Drive with us
            </button>
          </>
        )}

        {showAuth && (
          <Authentication onClose={() => setShowAuth(false)} onLogin={(role) => setUserType(role)}/>
        )}
      </div>
    </section>
  );
}
