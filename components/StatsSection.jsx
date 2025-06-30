export default function StatsSection() {
  return (
    <section className="py-16 px-4 bg-gray-200 text-black">
      <div className="max-w-5xl bg-white rounded-lg hover:shadow-xl py-8 px-4 mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        <div>
          <h4 className="text-5xl font-bold text-green-500 ">50K+</h4>
          <p className="text-black">Happy Riders</p>
        </div>
        <div>
          <h4 className="text-5xl font-bold text-yellow-500">5K+</h4>
          <p className="text-black">Active Drivers</p>
        </div>
        <div>
          <h4 className="text-5xl font-bold text-red-500">100+</h4>
          <p className="text-black">Cities Served</p>
        </div>
        <div>
          <h4 className="text-5xl font-bold text-orange-500">1M+</h4>
          <p className="text-black">Rides Completed</p>
        </div>
      </div>
    </section>
  );
}
