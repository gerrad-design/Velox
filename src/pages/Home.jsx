import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Home() {
  const navigate = useNavigate();

  return (
    <motion.div
      className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6"
      initial={{ x: -300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 300, opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="text-center space-y-6 max-w-sm">
        <h1 className="text-4xl font-bold">Welcome to Velox</h1>
        <p className="text-gray-400 text-sm">
          Fast, reliable, and safe rides at your fingertips.
        </p>

        <button
          onClick={() => navigate("/book")}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
        >
          🚗 Book a Ride
        </button>
      </div>
    </motion.div>
  );
}
