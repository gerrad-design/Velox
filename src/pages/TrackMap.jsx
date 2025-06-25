import React from "react";
import { Link } from "react-router-dom";

export default function TrackMap() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black text-white">
      <h1 className="text-2xl font-bold mb-4">Map Tracker</h1>
      <p className="mb-4 text-gray-300">Live location will show here</p>
      <Link to="/" className="text-white underline">← Back to Home</Link>
    </div>
  );
}
