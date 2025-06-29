import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BookRide from "./components/BookRide";
import RideStatus from "./components/RideStatus";
import ClientDashboard from "./components/ClientDashboard";

function App() {
  const [rideData, setRideData] = useState(null);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<BookRide setRideData={setRideData} />} />
        <Route path="/status" element={<RideStatus rideData={rideData} />} />
        <Route path="/dashboard" element={<ClientDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;