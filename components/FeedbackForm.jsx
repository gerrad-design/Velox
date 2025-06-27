import { useState } from 'react';

export default function FeedbackForm() {
  const [role, setRole] = useState('passenger');

  return (
    <form className="space-y-4 bg-white dark:bg-black p-6 rounded-lg mb-8 shadow-xl">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
        Feedback Form
      </h2>


      <div>
        <label className="block mb-1 text-sm text-black dark:black">I am a:</label>
        <select value={role} onChange={(e) => setRole(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 dark:bg-gray-200 dark:text-black">
          <option value="passenger">Passenger</option>
          <option value="driver">Driver</option>
        </select>
      </div>

      <input type="text" placeholder={role === 'driver' ? 'Vehicle ID or Route' : 'Trip ID or Location'}
        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 dark:bg-gray-200 dark:text-black"/>

      <textarea placeholder={ role === 'driver'
            ? 'Describe your driving experience, rider interactions, or concerns.'
            : 'Describe your ride, driver experience, or suggestions.'
      } rows="5" className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 dark:bg-gray-200 dark:text-black">
      </textarea>

      <button type="submit" className="bg-white text-black px-6 py-2 rounded">
        Submit Feedback
      </button>
    </form>
  );
}
