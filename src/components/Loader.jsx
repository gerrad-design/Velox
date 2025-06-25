import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Loader() {
  const navigate = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigate("/status");
    }, 4000);
    return () => clearTimeout(timeout);
  }, [navigate]);

  return (
    <motion.div
      className="min-h-screen bg-zinc-900 text-white flex flex-col items-center justify-center p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Animated Spinner */}
      <div className="relative w-32 h-32">
        {/* Outer Ring */}
        <div className="absolute inset-0 border-8 border-t-transparent border-white rounded-full animate-spin"></div>
        {/* Inner Ring */}
        <div className="absolute inset-4 border-4 border-t-transparent border-blue-500 rounded-full animate-spin-slow"></div>
      </div>

      {/* Text */}
      <p className="mt-6 text-xl font-semibold animate-pulse">
        Finding a driver for you...
      </p>
    </motion.div>
  );
}
