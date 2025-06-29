import { motion } from "framer-motion";
export default function FakeCallModal({ show, onClose, driver }) {
  if (!show) return null;

  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        className="bg-zinc-900 text-white p-6 rounded-xl text-center space-y-4 shadow-xl"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <h2 className="text-2xl font-bold">📞 Incoming Call</h2>
        <p className="text-lg font-semibold">
          From: {driver?.from || "Unknown Driver"}
        </p>
        <p className="text-sm text-gray-400">
          Phone: {driver?.phone || "N/A"}
        </p>

        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-red-600 rounded-xl hover:bg-red-700 transition"
        >
          Dismiss
        </button>
      </motion.div>
    </motion.div>
  );
}
