import { useState } from "react";
import BookRide from "../components/BookRide";
import ClientDashboard from "../components/ClientDashboard";
import RideStatus from "../components/RideStatus";
import Navbar from "../components/Navbar";

export default function RidersPage() {
  

  return (
    <div className="bg-white text-black dark:bg-gray-200">
        <h2>Hello World</h2>
        <Navbar/>
        <BookRide/>
        <ClientDashboard/>
        <RideStatus/>
    </div>
  );
}