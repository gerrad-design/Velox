import React from "react"; // ✅ Required to prevent "React is not defined" error
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Home from "./pages/Home";
import TrackMap from "./pages/TrackMap";
import BookRide from "./components/BookRide";
import RideStatus from "./components/RideStatus";
import Loader from "./components/Loader";

function App() {
  const [rideData, setRideData] = useState(null);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/book" element={<BookRide setRideData={setRideData} />} />
        <Route path="/loader" element={<Loader />} />
        <Route
          path="/status"
          element={
            rideData ? (
              <RideStatus ride={rideData} />
            ) : (
              <div className="text-white text-center mt-10">
                🚫 No ride data. Go to <a href="/" className="underline">Home</a>
              </div>
            )
          }
        />
        <Route path="/track" element={<TrackMap />} />
      </Routes>
    </Router>
  );
}

export default App;
