import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function BookRide({ setRideData }) {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [selectedRide, setSelectedRide] = useState(null);
  const navigate = useNavigate();

  const rideOptions = [
    { type: "Economy", price: 300, eta: "5 mins" },
    { type: "Standard", price: 500, eta: "3 mins" },
    { type: "Premium", price: 800, eta: "2 mins" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!pickup || !destination || !selectedRide) {
      alert("Please fill all fields and select a ride type.");
      return;
    }
    setRideData({ pickup, destination, selectedRide });
    navigate("/loader");
  };

  return (
    <motion.div
      className="min-h-screen bg-zinc-900 text-white flex items-center justify-center p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="w-full max-w-lg bg-zinc-800 p-8 rounded-3xl shadow-xl space-y-6">
        <h1 className="text-4xl font-extrabold text-center text-white">
          Book a Ride 🚖
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="text-sm text-gray-400">Pickup Location</label>
            <input
              type="text"
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
              className="w-full mt-1 p-3 bg-zinc-700 text-white rounded-xl placeholder-gray-400 focus:outline-none"
              placeholder="e.g. Nairobi CBD"
            />
          </div>

          <div>
            <label className="text-sm text-gray-400">Destination</label>
            <input
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full mt-1 p-3 bg-zinc-700 text-white rounded-xl placeholder-gray-400 focus:outline-none"
              placeholder="e.g. Westlands"
            />
          </div>

          <div>
            <label className="text-sm text-gray-400 mb-1 block">Select Ride Type</label>
            <div className="grid grid-cols-3 gap-3">
              {rideOptions.map((option) => (
                <button
                  type="button"
                  key={option.type}
                  onClick={() => setSelectedRide(option)}
                  className={`rounded-xl py-3 text-sm font-semibold transition ${
                    selectedRide?.type === option.type
                      ? "bg-white text-zinc-900 shadow-lg"
                      : "bg-zinc-700 text-white hover:bg-zinc-600"
                  }`}
                >
                  {option.type}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-bold text-lg shadow-md transition"
            >
              ✅ Confirm Ride
            </button>

            <button
              type="button"
              onClick={() => navigate("/")}
              className="w-full text-center text-sm text-gray-400 underline hover:text-white"
            >
              ⬅ Back to Home
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
}
