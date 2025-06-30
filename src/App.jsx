import React, { useState } from "react";
import { Routes, Route } from 'react-router-dom';
import Navbar from '../components/Navbar';
import HomePage from '../pages/HomePage';
import FeedbackPage from '../pages/FeedbackPage';
import Dashboard from './components/Dashboard'; // Update the path if needed

export default function App() {
  const [userType, setUserType] = useState(null);

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar userType={userType} setUserType={setUserType} />
      <Routes>
        <Route path="/" element={<HomePage userType={userType} setUserType={setUserType} />} />
        <Route path="/feedbackpage" element={<FeedbackPage />} />
        <Route path="/dashboard" element={<Dashboard />} /> {/* Optional route */}
      </Routes>
    </div>
  );
}
