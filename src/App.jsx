import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import RideStatus from "./components/RideStatus";
import ClientDashboard from "./components/ClientDashboard";
import Navbar from "../components/Navbar";
import HomePage from "../pages/HomePage";
import FeedbackPage from "../pages/FeedbackPage";
import DashBoard from "../src/components/Dashboard";
import BookRidePage from "../pages/BookRidePage";

export default function App() {
  const [userType, setUserType] = useState(null);
  const [rideData, setRideData] = useState(null);

  return (
    <div className="min-h-screen bg-black text-white">
      <Router>
        <Navbar userType={userType} setUserType={setUserType} />
        <Routes>
          <Route path="/" element={<HomePage userType={userType} setUserType={setUserType} />} />
          <Route path="/status" element={<RideStatus rideData={rideData} />} />
          <Route path="/client-dashboard" element={<ClientDashboard />} />
          <Route path="/feedbackpage" element={<FeedbackPage />} />
          <Route path="/dashboard" element={<DashBoard />} />
          <Route path="/bookridepage" element={<BookRidePage />} />
        </Routes>
      </Router>
    </div>
  );
}

