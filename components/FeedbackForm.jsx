import { useState } from 'react';

export default function FeedbackForm({ onClose }) {
  const [role, setRole] = useState('passenger');

  return (
    <div className="fixed inset-0 z-50 shadow-xl flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <form className="space-y-4 bg-white dark:bg-black p-6 rounded-lg shadow-xl w-[400px] relative">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2 flex justify-between items-center">
          Feedback Form
          <button type="button" onClick={onClose} className="text-gray-400 hover:text-black dark:hover:text-white text-xl">
            ×
          </button>
        </h2>

        <div>
          <label className="block mb-1 text-sm text-black dark:text-white">I am a:</label>
          <select value={role} onChange={(e) => setRole(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 dark:bg-gray-200 dark:text-black">
            <option value="passenger">Passenger</option>
            <option value="driver">Driver</option>
          </select>
        </div>

        <input type="text" placeholder={role === 'driver' ? 'Vehicle ID or Route' : 'Trip ID or Location'}
         className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 dark:bg-gray-200 dark:text-black"/>

        <textarea placeholder={ role === 'driver' ? 'Describe your driving experience, rider interactions, or concerns.' : 'Describe your ride, driver experience, or suggestions.'}
          rows="5" className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 dark:bg-gray-200 dark:text-black"/>

        <button type="submit" className="bg-white text-black px-6 py-2 rounded w-full">
          Submit Feedback
        </button>
      </form>
    </div>
  );
}
