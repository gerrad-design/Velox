import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Loader2 } from "lucide-react";
import socket from "../src/socket";


class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
          <h2 className="font-bold">Something went wrong</h2>
          <button
            onClick={() => window.location.reload()}
            className="mt-2 px-3 py-1 bg-red-100 hover:bg-red-200 rounded"
          >
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

const BookRide = ({ setRideData }) => {
  const [form, setForm] = useState({
    pickup: "",
    destination: "",
    rideType: "Economy",
    clientName: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const handleConnect = () => console.log("✅ Socket connected:", socket.id);
    const handleError = (err) => {
      console.error("❌ Socket error:", err);
      setError("Connection issue. Please refresh.");
    };

    socket.on("connect", handleConnect);
    socket.on("connect_error", handleError);

    return () => {
      socket.off("connect", handleConnect);
      socket.off("connect_error", handleError);
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleRideTypeChange = (type) => {
    setForm(prev => ({ ...prev, rideType: type }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!form.pickup || !form.destination) {
      setError("Please fill in both pickup and destination");
      return;
    }

    setLoading(true);

    const fareMap = {
      Economy: 300,
      Standard: 500,
      Premium: 700
    };

    const ridePayload = {
      pickup: form.pickup,
      dropoff: form.destination,
      estimatedTime: "10 mins",
      fare: fareMap[form.rideType],
      clientName: form.clientName || "Anonymous",
      rideType: form.rideType
    };

    socket.emit("ride_request", ridePayload);

    const handleRideId = (data) => {
      setRideData({
        ...form,
        selectedRide: {
          type: form.rideType,
          price: fareMap[form.rideType],
          eta: "10 mins"
        },
        ride_id: data.ride_id,
        status: "pending"
      });
      setLoading(false);
      navigate("/status");
    };

    socket.once("ride_id_assigned", handleRideId);

    const timeout = setTimeout(() => {
      if (loading) {
        setError("Request timeout. Please try again.");
        setLoading(false);
        socket.off("ride_id_assigned", handleRideId);
      }
    }, 10000);

    return () => clearTimeout(timeout);
  };

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-white text-gray-900 p-6 relative">
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 flex items-center gap-1 bg-gray-100 hover:bg-gray-200 px-3 py-1.5 text-sm rounded-lg transition-all"
        >
          <ArrowLeft size={18} className="text-gray-700" />
          <span className="text-gray-700">Back</span>
        </button>

        <div className="max-w-md mx-auto mt-16">
          <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">🚖 Book a Ride</h1>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 p-3 rounded-lg mb-6 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="bg-gray-50 rounded-xl shadow-sm p-6 space-y-4 border border-gray-200">
            <input
              type="text"
              name="clientName"
              placeholder="Your name (optional)"
              value={form.clientName}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-white border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400"
            />

            <input
              type="text"
              name="pickup"
              placeholder="Pickup Location*"
              value={form.pickup}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-lg bg-white border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400"
            />

            <input
              type="text"
              name="destination"
              placeholder="Destination*"
              value={form.destination}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-lg bg-white border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400"
            />

            <div className="flex justify-between gap-2">
              {["Economy", "Standard", "Premium"].map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => handleRideTypeChange(type)}
                  className={`flex-1 py-2.5 rounded-lg font-medium ${
                    form.rideType === type
                      ? "bg-gray-800 text-white"
                      : "bg-white text-gray-800 border border-gray-300 hover:bg-gray-100"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-lg bg-gray-900 hover:bg-gray-800 font-medium text-white flex items-center justify-center ${
                loading ? "opacity-90" : ""
              }`}
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

          <div className="mt-6 text-gray-500 text-xs text-center">
            <p>*Required fields</p>
            <p className="mt-1">Estimated wait time: 5-10 minutes</p>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default BookRide;