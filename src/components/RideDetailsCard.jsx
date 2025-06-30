import React from "react";
import { Phone, MessageSquare } from "lucide-react";

export default function RideDetailsCard({
  ride,
  isEnRoute,
  tripStarted,
  onStartTrip,
  onEndTrip,
  onToggleEnRoute,
  onCall,
  onMessage,
  onAccept,
  onDecline,
  hasAccepted,
}) {
  if (!ride) return null;

  const pickup = ride.pickup || "Unknown";
  const dropoff = ride.dropoff || "Unknown";
  const estimatedTime = ride.estimatedTime || "5 mins";
  const fare = ride.fare ?? "200";

  return (
    <div className="bg-white/5 p-4 rounded-lg border-2 border-green-500 border-white/10 space-y-3 mt-8 relative">
      <h3 className="text-lg font-semibold">🚗 Ride Request</h3>
      <p><strong>From:</strong> {pickup}</p>
      <p><strong>To:</strong> {dropoff}</p>
      <p><strong>Time:</strong> {estimatedTime}</p>
      <p><strong>Fare:</strong> Ksh {fare}</p>

      {!hasAccepted ? (
        <div className="flex gap-2 mt-2">
          <button
            onClick={onAccept}
            className="bg-green-600 px-4 py-1 rounded text-white"
          >
            Accept
          </button>
          <button
            onClick={onDecline}
            className="bg-red-600 px-4 py-1 rounded text-white"
          >
            Decline
          </button>
        </div>
      ) : !tripStarted ? (
        <div className="flex items-center gap-2 flex-wrap mt-2">
          <button
            onClick={onToggleEnRoute}
            className={`px-4 py-1 rounded text-white ${
              isEnRoute ? "bg-blue-600" : "bg-gray-600"
            }`}
          >
            {isEnRoute ? "En Route to Client" : "Not En Route"}
          </button>

          <button
            onClick={onStartTrip}
            className="bg-green-600 px-4 py-1 rounded text-white"
          >
            Start Trip
          </button>

          <button
            onClick={onCall}
            className="bg-yellow-500 px-3 py-1 rounded text-white flex items-center gap-1"
          >
            <Phone size={16} /> Call
          </button>

          <button
            onClick={onMessage}
            className="bg-blue-500 px-3 py-1 rounded text-white flex items-center gap-1"
          >
            <MessageSquare size={16} /> Message
          </button>
        </div>
      ) : (
        <div className="mt-2">
          <p className="text-sm text-gray-300">
            Trip in progress ⏳ Estimated Time: {estimatedTime}
          </p>
          <button
            onClick={onEndTrip}
            className="mt-2 bg-red-600 px-4 py-1 rounded text-white"
          >
            End Trip
          </button>
        </div>
      )}
    </div>
  );
}