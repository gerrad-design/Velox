import { useState } from "react";
import BookRide from "../components/BookRide";
import RideStatus from "../components/RideStatus";
import Navbar from "../components/Navbar";

export default function RidersPage() {
  const [rideData, setRideData] = useState(null); // shared state

  return (
    <div className="bg-white text-black dark:bg-gray-200 min-h-screen">
      <Navbar />
      {!rideData ? (
        <BookRide setRideData={setRideData} />
      ) : (
        <RideStatus rideData={rideData} />
      )}
    </div>
  );
}