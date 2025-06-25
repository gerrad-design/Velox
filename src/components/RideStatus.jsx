import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function RideStatus({ ride }) {
  const navigate = useNavigate();

  const handleCancel = () => {
    alert("❌ Your ride has been cancelled successfully.");
    navigate("/");
  };

  const handleTrack = () => {
    navigate("/track");
  };

  if (!ride) {
    return (
      <div className="h-screen bg-zinc-900 text-white flex items-center justify-center">
        <p>
          No ride found. Go back to{" "}
          <a href="/" className="underline text-blue-500">Home</a>
        </p>
      </div>
    );
  }

  const { pickup, destination, selectedRide } = ride;

  return (
    <motion.div
      className="min-h-screen bg-zinc-900 text-white p-6"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="max-w-2xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-white">🚘 Your Driver is On the Way</h1>
          <p className="text-gray-400 mt-1">Sit back and relax, we’re coming to you.</p>
        </div>

        {/* Ride Summary */}
        <motion.div 
          className="bg-zinc-800 p-6 rounded-3xl shadow-xl space-y-4"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Pickup:</span>
            <span className="font-medium text-white">{pickup}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Destination:</span>
            <span className="font-medium text-white">{destination}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Fare:</span>
            <span className="text-green-400 font-bold">Ksh {selectedRide.price}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Ride Type:</span>
            <span className={`px-3 py-1 rounded-full text-white text-xs ${
              selectedRide.type === "Economy"
                ? "bg-blue-600"
                : selectedRide.type === "Standard"
                ? "bg-purple-600"
                : "bg-pink-600"
            }`}>
              {selectedRide.type}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">ETA:</span>
            <span className="italic text-white">{selectedRide.eta}</span>
          </div>
        </motion.div>

        {/* Driver Info */}
        <motion.div 
          className="bg-zinc-800 p-6 rounded-3xl shadow-xl space-y-2"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-lg font-semibold text-white mb-2">🧑‍✈️ Driver Info</h2>
          <p className="text-sm">Name: <span className="font-medium">Leshan</span></p>
          <p className="text-sm">Car: <span className="font-medium">Toyota Vitz</span></p>
          <p className="text-sm">Plate: <span className="font-medium">KDJ 455U</span></p>
        </motion.div>

        {/* Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <button
            onClick={handleTrack}
            className="bg-blue-600 hover:bg-blue-700 transition px-4 py-3 rounded-xl w-full text-sm font-semibold"
          >
            📍 Tracker
          </button>
          <button
            onClick={handleCancel}
            className="bg-red-600 hover:bg-red-700 transition px-4 py-3 rounded-xl w-full text-sm font-semibold"
          >
            ❌ Cancel Ride
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
}
