import React from "react";
import CountUp from "react-countup";
import {
  ResponsiveContainer,
  AreaChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Area,
} from "recharts";

const earningsData = [
  { day: "Mon", income: 3000 },
  { day: "Tue", income: 3200 },
  { day: "Wed", income: 2800 },
  { day: "Thu", income: 3600 },
  { day: "Fri", income: 4100 },
  { day: "Sat", income: 4500 },
  { day: "Sun", income: 3900 },
];

const WeeklyStats = () => {
  const total = earningsData.reduce((sum, day) => sum + day.income, 0);
  const average = Math.round(total / earningsData.length);
  const bestDay = earningsData.reduce((prev, curr) => (curr.income > prev.income ? curr : prev));

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
      <div className="bg-white/5 border border-white/10 rounded-lg p-4">
        <h4 className="text-white text-sm mb-1">Total Earnings</h4>
        <p className="text-green-400 text-xl font-bold">
          Ksh <CountUp end={total} duration={2} separator="," />
        </p>
      </div>
      <div className="bg-white/5 border border-white/10 rounded-lg p-4">
        <h4 className="text-white text-sm mb-1">Avg Daily</h4>
        <p className="text-blue-400 text-xl font-bold">
          Ksh <CountUp end={average} duration={2} separator="," />
        </p>
      </div>
      <div className="bg-white/5 border border-white/10 rounded-lg p-4">
        <h4 className="text-white text-sm mb-1">Best Day</h4>
        <p className="text-pink-400 text-xl font-bold">
          {bestDay.day} - Ksh {bestDay.income.toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default function EarningsSection() {
  return (
    <div className="mt-8">
      <WeeklyStats />
      <div className="bg-white/5 border border-white/10 rounded-lg p-4">
        <h3 className="text-white text-lg font-semibold mb-2">📊 Weekly Earnings</h3>
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={earningsData}>
            <defs>
              <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
            <XAxis dataKey="day" stroke="#ccc" />
            <YAxis stroke="#ccc" />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="income"
              stroke="#10b981"
              fillOpacity={1}
              fill="url(#colorIncome)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
