import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function TrackMap() {
  const navigate = useNavigate();

  return (
    <motion.div
      className="min-h-screen bg-black text-white flex flex-col items-center p-4"
      initial={{ x: -300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 300, opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="w-full max-w-sm space-y-6 mt-10">
        <h2 className="text-2xl font-bold text-center">📍 Tracking Your Ride</h2>

        <div className="bg-white rounded-xl w-full h-64 flex items-center justify-center text-black">
          <p className="text-center">[Map Placeholder]</p>
        </div>

        <p className="text-sm text-gray-400 text-center">
        
        </p>

        <button
          onClick={() => navigate("/")}
          className="w-full bg-gray-700 hover:bg-gray-800 text-white py-3 rounded-lg transition"
        >
          ⬅ Back to Home
        </button>
      </div>
    </motion.div>
  );
}
