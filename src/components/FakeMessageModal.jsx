import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function FakeMessageModal({
  open = false,
  show = false,
  onClose,
  messageData,
  clientName,
}) {
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);
  const isVisible = open || show;

  const isReceiving = !!messageData;

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

  useEffect(() => {
    if (!isVisible) {
      setMessage("");
      setSent(false);
    }
  }, [isVisible]);

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
          <div className="bg-gray-900 text-white rounded-xl p-6 w-full max-w-md text-center shadow-2xl">
            <h2 className="text-2xl font-bold mb-2">
              💬 {isReceiving ? "New Message" : `Message ${clientName}`}
            </h2>

            {isReceiving ? (
              <>
                <p className="text-blue-400 text-lg font-medium">
                  From: {messageData?.from || "Unknown Driver"}
                </p>
                <p className="italic text-gray-300 mt-2">
                  “{messageData?.message || "No message content"}”
                </p>
                <button
                  onClick={onClose}
                  className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-xl font-semibold"
                >
                  Dismiss
                </button>
              </>
            ) : (
              <>
                <textarea
                  className="w-full h-24 p-2 bg-black/40 border border-white/10 rounded mb-4 text-white resize-none"
                  placeholder="Type your message here..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
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
              </>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
