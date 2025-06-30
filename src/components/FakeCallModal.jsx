import React from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function FakeCallModal({ open = false, show = false, onClose, clientName, driver }) {
  const isVisible = open || show;
  const displayName = clientName || driver?.from || "Unknown";

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
        >
          <div className="bg-gray-900 text-white rounded-lg p-6 text-center max-w-xs w-full">
            <h2 className="text-xl font-semibold mb-4">📞 Calling {displayName}</h2>
            <p className="text-sm text-gray-400">
              Phone: {driver?.phone || "Connecting..."}
            </p>
            <div className="animate-pulse text-4xl mt-2">📱</div>
            <button
              onClick={onClose}
              className="mt-6 bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
            >
              End Call
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
