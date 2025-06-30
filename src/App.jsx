import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";

// From ft-rider
import BookRide from "./components/BookRide";
import RideStatus from "./components/RideStatus";
import ClientDashboard from "./components/ClientDashboard";

// From dev
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import FeedbackPage from "./pages/FeedbackPage";
import DashBoardPage from "./pages/DashBoardPage";

export default function App() {
  const [userType, setUserType] = useState(null);
  const [rideData, setRideData] = useState(null);

  return (
    <div className="min-h-screen bg-black text-white">
      <Router>
        <Navbar userType={userType} setUserType={setUserType} />
        <Routes>
          {/* Rider Flow */}
          <Route path="/" element={<HomePage userType={userType} setUserType={setUserType} />} />
          <Route path="/book" element={<BookRide setRideData={setRideData} />} />
          <Route path="/status" element={<RideStatus rideData={rideData} />} />
          <Route path="/client-dashboard" element={<ClientDashboard />} />

          {/* Driver/Admin Flow */}
          <Route path="/feedbackpage" element={<FeedbackPage />} />
          <Route path="/dashboardpage" element={<DashBoardPage />} />
        </Routes>
      </Router>
    </div>
  );
}

