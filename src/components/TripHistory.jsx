import React from "react";

export default function TripHistory({ trips, onTripClick }) {
  console.log("📜 TripHistory received:", trips);

  return (
    <div className="mt-8">
      <h2 className="text-lg font-semibold mb-4">📜 Past Trips</h2>
      <div className="grid gap-4">
        {trips.map((trip) => (
          <div
            key={trip.id}
            onClick={() => onTripClick(trip)}
            className="cursor-pointer bg-white/5 p-4 rounded-lg hover:bg-white/10 transition border border-white/10"
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="font-semibold">
                  {trip.pickup} → {trip.dropoff}
                </p>
                <p className="text-sm text-gray-400">
                  {trip.date} at {trip.time}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium">Ksh {trip.fare}</p>
                {trip.rating && (
                  <p className="text-xs text-yellow-400">⭐ {trip.rating}</p>
                )}
              </div>
            </div>
          </div>
        ))}
        {trips.length === 0 && (
          <p className="text-sm text-gray-500 italic">No trips recorded yet.</p>
        )}
      </div>
    </div>
  );
}