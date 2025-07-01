import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";

import { io } from "socket.io-client";
import StatCard from "./StatCard";
import RideDetailsCard from "./RideDetailsCard";
import TripHistory from "./TripHistory";
import FakeCallModal from "./FakeCallModal";
import FakeMessageModal from "./FakeMessageModal";
import PastTripDetails from "./PastTripDetails";
import DeclineReasonForm from "./DeclineReasonForm";
import EarningsChart from "./EarningsChart";



const BASE_URL = "https://3c16-102-217-167-34.ngrok-free.app";


const socket = io(BASE_URL, {
  transports: ["websocket", "polling"],
  autoConnect: false,
});


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

  const [tripHistory, setTripHistory] = useState([]);

  const [driverData] = useState({
    name: "There",
    avatar: "https://ui-avatars.com/api/?name=Driver",
  });

  const fetchHistory = () => {
    fetch(`${BASE_URL}/api/driver/history`)
      .then((res) => {
        if (!res.ok) throw new Error("Trip history fetch failed");
        return res.json();
      })
      .then(setTripHistory)
      .catch((err) => {
        console.error(err);
        alert("Failed to load trip history. Please check your network.");
      });
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  useEffect(() => {
    if (!isOnline) return;

    socket.connect();


    const handleNewRide = (data) => {
      console.log(" New ride received:", data);
      setRideRequest(data);
    };

    const handleRideCanceled = () => {
      console.log(" Ride canceled.");
      resetRideState();
    };

    const registerDriver = () => {
      console.log("Registering driver manually");
      socket.emit("identify", { role: "driver" });
      socket.emit("driver_status", { online: true });
    };

    socket.on("connect", () => {
      console.log("Connected:", socket.id);
      registerDriver();
    });

    if (socket.connected) registerDriver();

    socket.on("new_ride", handleNewRide);
    socket.on("ride_canceled", handleRideCanceled);

    return () => {
      socket.emit("driver_status", { online: false });
      socket.off("new_ride", handleNewRide);
      socket.off("ride_canceled", handleRideCanceled);
      if (socket.connected) socket.disconnect();
    };
  }, [isOnline]);

  const toggleOnline = () => setIsOnline((prev) => !prev);

  const resetRideState = () => {
    setRideRequest(null);
    setCurrentRide(null);
    setHasAccepted(false);
    setTripStarted(false);
    setIsEnRoute(false);
  };

  const handleAccept = () => {
    if (!rideRequest) return;

    setCurrentRide(rideRequest);
    setRideRequest(null);
    setHasAccepted(true);

    fetch(`${BASE_URL}/api/rides/respond`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({

        ride_id: rideRequest.ride_id,
        accepted: true,
      }),
    });
  };

  const handleDecline = () => setShowDeclineForm(true);

  const submitDeclineReason = (reason) => {
    if (!rideRequest) return;

    fetch(`${BASE_URL}/api/rides/respond`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ride_id: rideRequest.ride_id,
        accepted: false,
        reason,
      }),
    });

    setRideRequest(null);
    setShowDeclineForm(false)
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
    }).then(fetchHistory);

    resetRideState();
  };

  return (
    <div className="text-black bg-gray-900 min-h-screen p-4">
      {!isOnline ? (
        <div className="absolute inset-0 bg-black z-30 flex flex-col items-center justify-center">
          <img
            src={driverData.avatar}
            alt="Avatar"
            className="w-24 h-24 rounded-full mb-4"
          />
          <h2 className="text-xl font-bold">Hi, {driverData.name}</h2>
          <button
            onClick={toggleOnline}
            className="mt-4 px-6 py-2 bg-white text-black rounded-full"
          >
            Go Online
          </button>
        </div>
      ) : (
        <>
          <div className="flex items-center bg-white justify-between mb-4 p-2 rounded-md shadow">
            <div className="flex items-center gap-4">
              <img
                src={driverData.avatar}
                alt="Driver"
                className="w-14 h-14 rounded-full"
              />
              <h1 className="text-lg font-bold">{driverData.name}</h1>
            </div>
            <button
              onClick={toggleOnline}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-full"
            >
              Go Offline
            </button>
          </div>


          <div className="grid grid-cols-2 gap-2 mb-4">
            <EarningsChart />
            <div className="grid grid-cols-1 gap-1">
              <StatCard label="Trips Today" value={tripHistory.length} />
              <StatCard
                label="Total Earnings"
                value={`KES ${tripHistory.reduce(
                  (sum, trip) => sum + (trip.fare || 0),
                  0
                )}`}
              />
            </div>
          </div>

          {(rideRequest || currentRide) && (
            <RideDetailsCard
              ride={rideRequest || currentRide}
              isEnRoute={isEnRoute}
              tripStarted={tripStarted}
              onStartTrip={() => setTripStarted(true)}

              onEndTrip={endTrip}
              onToggleEnRoute={() => setIsEnRoute(!isEnRoute)}
              onCall={() => setShowCall(true)}
              onMessage={() => setShowMessage(true)}
              onAccept={handleAccept}
              onDecline={handleDecline}
              hasAccepted={hasAccepted}
            />
          )}


          <TripHistory trips={tripHistory} onTripClick={setSelectedTrip} />

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
            <PastTripDetails
              trip={selectedTrip}
              onClose={() => setSelectedTrip(null)}
            />
          )}
        </>
      )}
    </div>
  );

}

