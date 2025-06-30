import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import StatCard from "./StatCard";
import RideDetailsCard from "./RideDetailsCard";
import TripHistory from "./TripHistory";
import FakeCallModal from "./FakeCallModal";
import FakeMessageModal from "./FakeMessageModal";
import PastTripDetails from "./PastTripDetails";
import DeclineReasonForm from "./DeclineReasonForm";
import EarningsChart from "./EarningsChart";

const BASE_URL = "http://localhost:5000"; // Replace with your ngrok link if needed
const socket = io(BASE_URL, { transports: ["websocket", "polling"] });

export default function Dashboard() {
  const [isOnline, setIsOnline] = useState(false);
  const [rideRequest, setRideRequest] = useState(null);
  const [currentRide, setCurrentRide] = useState(null);
  const [tripStarted, setTripStarted] = useState(false);
  const [isEnRoute, setIsEnRoute] = useState(false);
  const [hasAccepted, setHasAccepted] = useState(false);
  const [showCall, setShowCall] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [showDeclineForm, setShowDeclineForm] = useState(false);
  const [driverData, setDriverData] = useState(null);
  const [tripHistory, setTripHistory] = useState([]);

  const fetchHistory = () => {
    fetch(`${BASE_URL}/api/driver/history`)
      .then(async (res) => {
        const contentType = res.headers.get("content-type");
        if (!res.ok) {
          const text = await res.text();
          throw new Error(`History fetch error ${res.status}: ${text}`);
        }
        if (!contentType || !contentType.includes("application/json")) {
          const text = await res.text();
          throw new SyntaxError(`Expected JSON but got: ${text.slice(0, 100)}`);
        }
        return res.json();
      })
      .then((data) => {
        setTripHistory(data);
      })
      .catch((err) => console.error("❌ Failed to fetch history:", err));
  };

  useEffect(() => {
    setDriverData({
      name: "Leshan",
      avatar: "/driver.jpg",
      car: { model: "Toyota Vitz", plate: "KDJ 123X" },
      stats: { avgRating: 4.8, hoursOnline: "4h 15m" },
    });

    fetchHistory();
  }, []);

  useEffect(() => {
    if (!isOnline) return;

    socket.connect();
    socket.on("new_ride", (data) => {
      setRideRequest(data);
    });

    socket.on("ride_canceled", () => {
      setRideRequest(null);
      setCurrentRide(null);
      setHasAccepted(false);
      setTripStarted(false);
      setIsEnRoute(false);
    });

    return () => {
      socket.off("new_ride");
      socket.off("ride_canceled");
      socket.disconnect();
    };
  }, [isOnline]);

  const toggleOnline = () => {
    const newState = !isOnline;
    setIsOnline(newState);
    socket.emit("driver_status", { online: newState });
  };

  const handleAccept = () => {
    setCurrentRide(rideRequest);
    setRideRequest(null);
    setHasAccepted(true);

    fetch(`${BASE_URL}/api/rides/respond`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ride_id: rideRequest?.ride_id,
        accepted: true,
      }),
    }).catch((err) => console.error("❌ Accept failed:", err));
  };

  const handleDecline = () => {
    setRideRequest(null);
    setShowDeclineForm(true);
  };

  const submitDeclineReason = (reason) => {
    alert("Client has been informed of the decline.");
    setShowDeclineForm(false);

    fetch(`${BASE_URL}/api/rides/respond`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ride_id: rideRequest?.ride_id,
        accepted: false,
        reason,
      }),
    }).catch((err) => console.error("❌ Decline failed:", err));
  };

  const handleStartTrip = () => {
    setTripStarted(true);
  };

  const endTrip = () => {
    const now = new Date();
    const tripData = {
      ...currentRide,
      id: crypto.randomUUID(),
      time: now.toLocaleTimeString(),
      date: now.toLocaleDateString("en-GB"),
      fare: 250,
      duration: "15 mins",
      rating: 5,
      paymentMethod: "M-Pesa",
    };

    fetch(`${BASE_URL}/api/driver/end_trip`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(tripData),
    })
      .then(() => fetchHistory())
      .catch((err) => console.error("❌ Trip end failed:", err))
      .finally(() => {
        setCurrentRide(null);
        setTripStarted(false);
        setHasAccepted(false);
        setIsEnRoute(false);
      });
  };

  if (!driverData) return <div className="text-white p-4">Loading...</div>;

  return (
    <div className="text-white min-h-screen bg-black p-4">
      {!isOnline ? (
        <div className="absolute inset-0 bg-black/70 z-30 flex flex-col items-center justify-center">
          <img src={driverData.avatar} alt="Avatar" className="w-24 h-24 rounded-full mb-4" />
          <h2 className="text-xl font-bold">Hi, {driverData.name} 👋</h2>
          <p className="text-sm text-gray-400">
            {driverData.car.model} - {driverData.car.plate}
          </p>
          <button
            onClick={toggleOnline}
            className="mt-4 px-6 py-2 bg-green-600 hover:bg-green-700 rounded-full"
          >
            Go Online
          </button>
        </div>
      ) : (
        <>
          {/* Top Bar */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <img src={driverData.avatar} alt="Driver" className="w-14 h-14 rounded-full" />
              <div>
                <h1 className="text-lg font-bold">{driverData.name}</h1>
                <p className="text-sm text-gray-400">
                  {driverData.car.model} - {driverData.car.plate}
                </p>
              </div>
            </div>
            <button
              onClick={toggleOnline}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-full"
            >
              Go Offline
            </button>
          </div>

          {/* Charts and Stats */}
          <div className="grid grid-cols-2 gap-2 mb-4">
            <EarningsChart />
            <div className="grid grid-cols-0 gap-1">
              <StatCard label="Trips Today" value={tripHistory.length} />
              <StatCard
                label="Total Earnings"
                value={`KES ${tripHistory.reduce((sum, trip) => sum + trip.fare, 0)}`}
              />
            </div>
          </div>

          {/* Ride Details */}
          {(rideRequest || currentRide) && (
            <RideDetailsCard
              ride={rideRequest || currentRide}
              isEnRoute={isEnRoute}
              tripStarted={tripStarted}
              onStartTrip={handleStartTrip}
              onEndTrip={endTrip}
              onToggleEnRoute={() => setIsEnRoute(!isEnRoute)}
              onCall={() => setShowCall(true)}
              onMessage={() => setShowMessage(true)}
              onAccept={handleAccept}
              onDecline={handleDecline}
              hasAccepted={hasAccepted}
            />
          )}

          {/* Trip History */}
          <TripHistory trips={tripHistory} onTripClick={setSelectedTrip} />

          {/* Modals */}
          {showCall && (
            <FakeCallModal
              open={showCall}
              onClose={() => setShowCall(false)}
              clientName={currentRide?.clientName || "Client"}
            />
          )}
          {showMessage && (
            <FakeMessageModal
              open={showMessage}
              onClose={() => setShowMessage(false)}
              clientName={currentRide?.clientName || "Client"}
            />
          )}
          {showDeclineForm && (
            <DeclineReasonForm onSubmit={submitDeclineReason} />
          )}
          {selectedTrip && (
            <PastTripDetails trip={selectedTrip} onClose={() => setSelectedTrip(null)} />
          )}
        </>
      )}
    </div>
  );
}