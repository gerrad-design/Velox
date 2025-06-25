import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";

import Home from "./pages/Home";
import TrackMap from "./pages/TrackMap";
import BookRide from "./components/BookRide";
import RideStatus from "./components/RideStatus";
import Loader from "./components/Loader";

function AnimatedRoutes({ rideData, setRideData }) {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/book" element={<BookRide setRideData={setRideData} />} />
        <Route path="/loader" element={<Loader />} />
        <Route path="/status" element={<RideStatus ride={rideData} />} />
        <Route path="/track" element={<TrackMap />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  const [rideData, setRideData] = useState(null);

  return (
    <Router>
      <AnimatedRoutes rideData={rideData} setRideData={setRideData} />
    </Router>
  );
}

export default App;
