import { motion } from "framer-motion";

export default function FakeMessageModal({ show, onClose, messageData }) {
  if (!show) return null;

  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        className="bg-zinc-900 text-white p-6 rounded-2xl text-center space-y-4 shadow-2xl w-[90%] max-w-md"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <h2 className="text-2xl font-bold">💬 New Message</h2>
        <p className="text-lg font-medium text-blue-400">
          From: {messageData?.from || "Unknown Driver"}
        </p>
        <p className="text-sm text-gray-300 italic">
          "{messageData?.message || 'No message content'}"
        </p>

        <button
          onClick={onClose}
          className="mt-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 transition rounded-xl text-white font-semibold"
        >
          Dismiss
        </button>
      </motion.div>
    </motion.div>
  );
}
