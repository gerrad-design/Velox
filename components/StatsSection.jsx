export default function StatsSection() {
  return (
    <section className="py-16 px-4 bg-indigo-600 text-white">
      <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        <div>
          <h4 className="text-5xl font-bold text-green-500 ">50K+</h4>
          <p className="text-indigo-100">Happy Riders</p>
        </div>
        <div>
          <h4 className="text-5xl font-bold text-yellow-500">5K+</h4>
          <p className="text-indigo-100">Active Drivers</p>
        </div>
        <div>
          <h4 className="text-5xl font-bold text-red-500">100+</h4>
          <p className="text-indigo-100">Cities Served</p>
        </div>
        <div>
          <h4 className="text-5xl font-bold text-orange-500">1M+</h4>
          <p className="text-indigo-100">Rides Completed</p>
        </div>
      </div>
    </section>
  );
}
