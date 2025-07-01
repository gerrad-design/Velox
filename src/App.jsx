import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RideStatus from "./components/RideStatus";
import ClientDashboard from "./components/ClientDashboard";
import Navbar from "../components/Navbar";
import HomePage from "../pages/HomePage";
import FeedbackPage from "../pages/FeedbackPage";
import DashBoard from "../src/components/Dashboard";
import BookRide from "../src/components/BookRide";

export default function App() {
  const [userType, setUserType] = useState(null);
  const [rideData, setRideData] = useState(null);

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar userType={userType} setUserType={setUserType} />
      <Routes>
        <Route path="/" element={<HomePage userType={userType} setUserType={setUserType} />} />
        <Route path="/ridestatus" element={<RideStatus rideData={rideData} />} />
        <Route path="/client-dashboard" element={<ClientDashboard />} />
        <Route path="/feedbackpage" element={<FeedbackPage />} />
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="/bookride" element={<BookRide setRideData={setRideData} />} />
      </Routes>
    </div>
  );
}