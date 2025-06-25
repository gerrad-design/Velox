import { Car } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="text-center py-20 px-4 bg-indigo-50">
      <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4">
        Fast, Reliable Rides<br />When You Need Them
      </h2>
      <p className="max-w-xl mx-auto text-gray-600 text-lg mb-8">
        Velox connects you with local drivers for quick, affordable transportation.
        Simple, fast, and built for communities everywhere.
      </p>
      <div className="flex flex-col md:flex-row gap-4 justify-center">
        <a
          href="#"
          className="bg-indigo-600 text-white px-6 py-3 rounded-full text-lg font-medium flex items-center justify-center gap-2 hover:bg-indigo-700"
        >
          <Car className="w-5 h-5" /> Get a Ride
        </a>
        <a
          href="#"
          className="border border-indigo-600 text-indigo-600 px-6 py-3 rounded-full text-lg font-medium hover:bg-indigo-100"
        >
          Drive with Velox
        </a>
      </div>
    </section>
  );
}
