// ✅ src/components/FakeMessageModal.jsx with Framer Motion
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function FakeMessageModal({ open, onClose, clientName }) {
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const handleSend = () => {
    if (message.trim()) {
      setSent(true);
      setTimeout(() => {
        setSent(false);
        setMessage("");
        onClose();
      }, 1500);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
        >
          <div className="bg-gray-900 text-white rounded-lg p-6 max-w-sm w-full">
            <h2 className="text-xl font-semibold mb-4">💬 Message {clientName}</h2>
            <textarea
              className="w-full h-24 p-2 bg-black/40 border border-white/10 rounded mb-4 text-white resize-none"
              placeholder="Type your message here..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
            <div className="flex justify-end gap-2">
              <button
                onClick={onClose}
                className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleSend}
                className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
              >
                {sent ? "Sending..." : "Send"}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
