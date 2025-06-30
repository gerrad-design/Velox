import React, { useState } from "react";

export default function DeclineReasonForm({ onSubmit }) {
  const [reason, setReason] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!reason.trim()) return;
    onSubmit(reason);
    setReason("");
  };

  return (
    <div className="fixed inset-0 bg-white flex items-center justify-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white text-white p-6 rounded-xl w-[90%] max-w-md shadow-xl"
      >
        <h2 className="text-xl font-bold mb-4">Why did you decline the ride?</h2>

        <textarea
          className="w-full p-3 border rounded mb-4"
          rows={4}
          placeholder="e.g. Not feeling well, car issue, etc..."
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />

        <button
          type="submit"
          className="w-full py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
