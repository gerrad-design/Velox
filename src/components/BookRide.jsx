import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function BookRide({ setRideData }) {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [selectedRide, setSelectedRide] = useState(null);
  const navigate = useNavigate();

  const rideOptions = [
    { type: "Economy", eta: "3 mins", price: 150 },
    { type: "Standard", eta: "4 mins", price: 200 },
    { type: "Premium", eta: "2 mins", price: 300 },
  ];

  const handleBook = () => {
    if (pickup && destination && selectedRide) {
      setRideData({ pickup, destination, selectedRide });
      navigate("/loader");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md space-y-6">
        <h2 className="text-3xl font-bold text-center mb-2">🚗 Book Your Ride</h2>
        <p className="text-center text-gray-400">Enter your route & pick a ride type</p>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Pickup Location"
            value={pickup}
            onChange={(e) => setPickup(e.target.value)}
            className="w-full px-4 py-3 rounded bg-gray-800 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-white"
          />

          <input
            type="text"
            placeholder="Destination"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="w-full px-4 py-3 rounded bg-gray-800 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-white"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {rideOptions.map((ride, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedRide(ride)}
              className={`p-4 rounded-xl cursor-pointer border text-center transition duration-300 ${
                selectedRide?.type === ride.type
                  ? "bg-white text-black border-white shadow-md"
                  : "bg-gray-900 border-gray-700 hover:bg-gray-800"
              }`}
            >
              <p className="font-bold">{ride.type}</p>
              <p className="text-sm text-gray-400">{ride.eta}</p>
              <p className="text-sm text-gray-300">Ksh {ride.price}</p>
            </div>
          ))}
        </div>

        <button
          onClick={handleBook}
          disabled={!(pickup && destination && selectedRide)}
          className={`w-full py-3 font-semibold rounded-lg transition duration-300 ${
            pickup && destination && selectedRide
              ? "bg-white text-black hover:bg-gray-200"
              : "bg-gray-700 text-gray-400 cursor-not-allowed"
          }`}
        >
          Confirm Ride
        </button>

        <Link
          to="/"
          className="block text-center w-full py-3 rounded-lg border border-white text-white hover:bg-white hover:text-black transition duration-300"
        >
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}
