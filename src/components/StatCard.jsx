import React from "react";

const StatCard = ({ label, value }) => {
  return (
    <div className="bg-white/10 border border-white/20 p-4 rounded-xl text-center">
      <h3 className="text-sm text-gray-300">{label}</h3>
      <p className="text-xl font-bold text-white mt-1">{value}</p>
    </div>
  );
};

export default StatCard;
