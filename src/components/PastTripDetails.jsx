import React from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function PastTripDetails({ trip, onClose }) {
  if (!trip) return null;

  const {
    date = "N/A",
    time = "N/A",
    pickup = "Unknown",
    dropoff = "Unknown",
    duration = "N/A",
    fare = "0",
    rating = "N/A",
    paymentMethod = "N/A",
  } = trip;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
      >
        <div className="bg-gray-900 text-white rounded-xl w-full max-w-md p-6 space-y-4 shadow-lg">
          <h2 className="text-xl font-bold">Trip Details</h2>

          <div className="space-y-2 text-sm">
            <p><span className="font-semibold">Date:</span> {date}</p>
            <p><span className="font-semibold">Time:</span> {time}</p>
            <p><span className="font-semibold">From:</span> {pickup}</p>
            <p><span className="font-semibold">To:</span> {dropoff}</p>
            <p><span className="font-semibold">Duration:</span> {duration}</p>
            <p><span className="font-semibold">Fare:</span> Ksh {fare}</p>
            <p><span className="font-semibold">Rating:</span> ⭐ {rating}</p>
            <p><span className="font-semibold">Payment:</span> {paymentMethod}</p>
          </div>

          <button
            onClick={onClose}
            className="mt-4 bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
          >
            Close
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}