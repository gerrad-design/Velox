import React, { useEffect, useState } from "react";
import socket from "../src/socket";
import FakeCallModal from "./FakeCallModal";
import FakeMessageModal from "./FakeMessageModal";

export default function ClientDashboard() {
  const [showCall, setShowCall] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [driverInfo, setDriverInfo] = useState(null);
  const [message, setMessage] = useState("");

  const triggerCall = (data) => {
    setDriverInfo(data);
    setShowCall(true);
    setTimeout(() => setShowCall(false), 5000);
  };

  const triggerMessage = (data) => {
    setMessage(data?.message || "New message");
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 5000);
  };

  useEffect(() => {
    socket.on("ride_accepted", (data) => {
      console.log("✅ Ride accepted in Dashboard:", data);
      setDriverInfo({
        name: data.driver_name,
        car: data.car_plate,
      });
      setMessage(data.message || "Your ride has been accepted!");
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 5000);
    });

    socket.on("ride_declined", (data) => {
      console.log("❌ Ride declined in Dashboard:", data);
      setMessage(data.message || "Your ride was declined.");
      setDriverInfo(null);
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 5000);
    });

    socket.on("call_client", triggerCall);
    socket.on("message_client", triggerMessage);

    return () => {
      socket.off("ride_accepted");
      socket.off("ride_declined");
      socket.off("call_client");
      socket.off("message_client");
    };
  }, []);

  return (
    <div className="min-h-screen bg-zinc-900 text-white flex flex-col items-center justify-center p-6 space-y-6">
      <h1 className="text-3xl font-bold mb-2">👤 Client Dashboard</h1>
      <p className="text-gray-400">Listening for driver updates...</p>

      {driverInfo && (
        <div className="mt-4 p-4 bg-zinc-800 rounded-lg shadow-md w-full max-w-md">
          <h2 className="text-lg font-semibold mb-2">🚗 Driver Info</h2>
          <p><strong>Name:</strong> {driverInfo.name}</p>
          <p><strong>Car:</strong> {driverInfo.car}</p>
        </div>
      )}

      <div className="flex gap-4">
        <button
          onClick={() => triggerCall({ from: "Test Driver", phone: "0712345678" })}
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg"
        >
          Simulate Call
        </button>
        <button
          onClick={() => triggerMessage({ message: "Hey! I’m 2 mins away." })}
          className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg"
        >
          Simulate Message
        </button>
      </div>

      {/* Modals */}
      <FakeCallModal
        show={showCall}
        onClose={() => setShowCall(false)}
        driver={driverInfo}
      />
      <FakeMessageModal
        show={showMessage}
        onClose={() => setShowMessage(false)}
        message={message}
      />
    </div>
  );
}