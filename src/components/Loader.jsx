import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Loader() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/status");
    }, 3000); // 3-second delay before navigating to Ride Status

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
      {/* Animated Loader */}
      <div className="flex flex-col items-center">
        {/* Spinning Car Emoji */}
        <div className="text-6xl animate-bounce mb-4">🚗</div>

        {/* Spinning Circle */}
        <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mb-6"></div>

        <p className="text-lg text-center">Searching for the nearest driver...</p>
        <p className="text-sm text-gray-400 mt-1">Hold tight, this won’t take long.</p>
      </div>
    </div>
  );
}
