import { useState } from "react";
import BookRide from "../components/BookRide";
import RideStatus from "../components/RideStatus";
import Navbar from "../components/Navbar";

export default function RidersPage() {
  

  return (
    <div className="bg-white text-black dark:bg-gray-200">
        <Navbar/>
        <BookRide/>
        <ClientDashboard/>
        <RideStatus/>
    </div>
  );
}