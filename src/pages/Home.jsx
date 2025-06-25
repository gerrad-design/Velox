import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black text-white">
      <h1 className="text-3xl font-bold mb-4">Welcome to Velox</h1>
      <p className="mb-6">Book your ride instantly</p>
      <Link
        to="/book"
        className="bg-white text-black px-4 py-2 rounded hover:bg-gray-200 transition"
      >
        Book a Ride
      </Link>
    </div>
  );
}
