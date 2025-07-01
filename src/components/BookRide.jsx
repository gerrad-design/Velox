import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Loader2 } from "lucide-react";
import socket from "../socket";

const BookRide = ({ setRideData }) => {
  const [form, setForm] = useState({
    pickup: "",
    destination: "",
    rideType: "Economy",
    clientName: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    socket.on("connect", () => console.log("🔌 Socket connected:", socket.id));
    socket.on("connect_error", (err) => {
      console.error("❌ Socket error:", err);
      setError("Connection issue. Please refresh.");
    });

    return () => {
      socket.off("connect");
      socket.off("connect_error");
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleRideTypeChange = (type) => {
    setForm((prev) => ({ ...prev, rideType: type }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!form.pickup || !form.destination) {
      setError("Please fill in both pickup and destination.");
      return;
    }

    setLoading(true);

    const fareMap = {
      Economy: 300,
      Standard: 500,
      Premium: 700,
    };

    const ridePayload = {
      pickup: form.pickup,
      dropoff: form.destination,
      estimatedTime: "10 mins",
      fare: fareMap[form.rideType],
      clientName: form.clientName || "Anonymous",
      rideType: form.rideType,
    };

    socket.emit("ride_request", ridePayload);

    const handleRideId = (data) => {
      setRideData({
        ...form,
        selectedRide: {
          type: form.rideType,
          price: fareMap[form.rideType],
          eta: "10 mins",
        },
        ride_id: data.ride_id,
        status: "pending",
      });

      setLoading(false);
      navigate("/RideStatus");
    };

    socket.once("ride_id_assigned", handleRideId);

    const timeout = setTimeout(() => {
      if (loading) {
        setError("Request timed out. Try again.");
        setLoading(false);
        socket.off("ride_id_assigned", handleRideId);
      }
    }, 10000);

    return () => clearTimeout(timeout);
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 p-6 relative">
      <div className="max-w-md mx-auto mt-16">
        <h1 className="text-3xl font-bold text-center mb-8">Book a Ride</h1>

        {error && (
          <div className="bg-red-100 text-red-600 p-3 rounded mb-4">{error}</div>
        )}

        <Link
          to="/"
          className="absolute top-24 bg-gray-200 py-2 px-2 rounded-md flex items-center gap-1 text-sm text-gray-600"
        >
          <ArrowLeft size={18} />
          Back
        </Link>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="clientName"
            placeholder="Your name (optional)"
            value={form.clientName}
            onChange={handleChange}
            className="w-full p-3 border rounded"
          />
          <input
            name="pickup"
            placeholder="Pickup Location*"
            value={form.pickup}
            onChange={handleChange}
            className="w-full p-3 border rounded"
          />
          <input
            name="destination"
            placeholder="Destination*"
            value={form.destination}
            onChange={handleChange}
            className="w-full p-3 border rounded"
          />
          <div className="flex justify-between gap-2">
            {["Economy", "Standard", "Premium"].map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => handleRideTypeChange(type)}
                className={`flex-1 py-2 rounded border ${
                  form.rideType === type
                    ? "bg-black text-white"
                    : "bg-white text-black"
                }`}
              >
                {type}
              </button>
            ))}
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-black text-white rounded flex items-center justify-center"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin mr-2" size={18} />
                Requesting...
              </>
            ) : (
              "Request Ride"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookRide;