import { useState } from 'react';

export default function FeedbackForm() {
  const [role, setRole] = useState('passenger');

  return (
    <form className="space-y-4 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
        Feedback Form
      </h2>


      <div>
        <label className="block mb-1 text-sm text-gray-700 dark:text-gray-300">I am a:</label>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
        >
          <option value="passenger">Passenger</option>
          <option value="driver">Driver</option>
        </select>
      </div>

      <input
        type="text"
        placeholder={role === 'driver' ? 'Vehicle ID or Route' : 'Trip ID or Location'}
        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
      />

      <textarea
        placeholder={
          role === 'driver'
            ? 'Describe your driving experience, rider interactions, or concerns.'
            : 'Describe your ride, driver experience, or suggestions.'
        }
        rows="5"
        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
      ></textarea>

      <button
        type="submit"
        className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700"
      >
        Submit Feedback
      </button>
    </form>
  );
}
