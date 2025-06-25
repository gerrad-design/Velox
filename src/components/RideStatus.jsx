import React from "react";
import { useNavigate } from "react-router-dom";

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
      <div className="h-screen bg-black text-white flex flex-col items-center justify-center">
        <p>No ride details found. Return to <a href="/" className="underline text-blue-400">Home</a>.</p>
      </div>
    );
  }

  const { pickup, destination, selectedRide } = ride;

  return (
    <div className="min-h-screen bg-black text-white p-6 flex flex-col items-center justify-center">
      <div className="w-full max-w-md space-y-6">

        {/* Heading */}
        <h2 className="text-3xl font-bold text-center mb-2">🚘 Driver is On the Way</h2>
        <p className="text-center text-gray-400">Hang tight, your ride is almost there!</p>

        {/* Ride Info */}
        <div className="bg-white text-black rounded-lg p-4 shadow-md space-y-3">
          <div className="flex justify-between">
            <p className="font-semibold">Pickup:</p>
            <p>{pickup}</p>
          </div>
          <div className="flex justify-between">
            <p className="font-semibold">Destination:</p>
            <p>{destination}</p>
          </div>
          <div className="flex justify-between">
            <p className="font-semibold">Fare:</p>
            <p className="text-yellow-600 font-bold">Ksh {selectedRide.price}</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="font-semibold">Ride Type:</p>
            <span
              className={`px-2 py-1 text-sm rounded-full text-white font-semibold ${
                selectedRide.type === "Economy"
                  ? "bg-blue-600"
                  : selectedRide.type === "Standard"
                  ? "bg-purple-600"
                  : "bg-pink-600"
              }`}
            >
              {selectedRide.type}
            </span>
          </div>
        </div>

        {/* Driver Info */}
        <div className="bg-white text-black rounded-lg p-4 space-y-2">
          <p className="font-semibold">👨‍✈️ Driver: <span className="font-normal">Leshan</span></p>
          <p className="font-semibold">🚗 Car: <span className="font-normal">Toyota Vitz</span></p>
          <p className="font-semibold">🔢 Plate: <span className="font-normal">KDJ 455U</span></p>
        </div>

        {/* ETA Progress */}
        <div className="w-full bg-white text-black rounded-lg p-4">
          <p className="mb-2 font-semibold">Estimated Arrival Time:</p>
          <div className="w-full h-3 bg-gray-300 rounded-full overflow-hidden">
            <div
              className="h-full bg-green-500 rounded-full animate-pulse"
              style={{ width: selectedRide.type === "Premium" ? "90%" : selectedRide.type === "Standard" ? "70%" : "50%" }}
            ></div>
          </div>
          <p className="mt-2 text-sm italic text-green-700">{selectedRide.eta}</p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mt-4 w-full">
          <button
            onClick={handleTrack}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded w-full transition"
          >
            📍 Tracker
          </button>
          <button
            onClick={handleCancel}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded w-full transition"
          >
            ❌ Cancel Ride
          </button>
        </div>
      </div>
    </div>
  );
}
