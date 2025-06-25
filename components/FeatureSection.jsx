import { Clock, ShieldCheck, Star } from "lucide-react";

export default function FeatureSection() {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        <div className="p-6 shadow-lg rounded-xl border">
          <Clock className="w-8 h-8 text-indigo-600 mx-auto mb-3" />
          <h3 className="text-xl font-semibold text-indigo-600 mb-2">Quick Pickup</h3>
          <p className="text-gray-600">Average pickup time under 5 minutes in most areas</p>
        </div>
        <div className="p-6 shadow-lg rounded-xl border">
          <ShieldCheck className="w-8 h-8 text-indigo-600 mx-auto mb-3" />
          <h3 className="text-xl font-semibold text-indigo-600 mb-2">Safe & Secure</h3>
          <p className="text-gray-600">Verified drivers, real-time tracking, and 24/7 support</p>
        </div>
        <div className="p-6 shadow-lg rounded-xl border">
          <Star className="w-8 h-8 text-indigo-600 mx-auto mb-3" />
          <h3 className="text-xl font-semibold text-indigo-600 mb-2">Top Rated</h3>
          <p className="text-gray-600">4.8+ star average rating from thousands of happy riders</p>
        </div>
      </div>
    </section>
  );
}