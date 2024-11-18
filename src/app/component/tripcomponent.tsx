"use client";

import React from "react";


const TripCard = ({ trip } : any) => {
  const handleJoinDashboard = () => {
    alert(`Navigating to the dashboard for Trip: ${trip.name}`);
    // Replace alert with navigation logic, e.g., router.push(`/dashboard/${trip.id}`);
  };

  return (
    <div className="relative bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transform hover:-translate-y-2 transition-all">
      {/* Trip Name */}
      <h2 className="text-2xl font-semibold text-indigo-600">{trip.name}</h2>

      {/* Countries */}
   

      {/* Features */}
      <div className="mt-6 flex flex-wrap gap-3">
        <span className="flex items-center gap-2 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
          💵 {trip.moneyStatus}
        </span>
        <span className="flex items-center gap-2 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
          {trip.travelingAlone ? "🧍 Traveling Alone" : "👥 Group Travel"}
        </span>
        <span className="flex items-center gap-2 bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm">
          🌟 {trip.type}
        </span>
      </div>

      {/* Cost and Details */}
      <div className="mt-6">
        <h3 className="text-gray-600 text-sm font-medium uppercase">Cost and Details:</h3>
        <div className="flex justify-between mt-2">
          <span className="flex items-center gap-2 bg-pink-100 text-pink-700 px-3 py-1 rounded-full text-sm">
            💰 ${trip.cost}
          </span>
          <span className="flex items-center gap-2 bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm">
            ⏳ {trip.startsInDays} days left
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-6 flex justify-between items-center">
        <button
          onClick={handleJoinDashboard}
          className="px-4 py-2 bg-indigo-600 text-white rounded-full shadow hover:bg-indigo-700 transition"
        >
          Join Dashboard
        </button>
        <button className="px-4 py-2 text-red-600 border border-red-500 rounded-full hover:bg-red-500 hover:text-white transition">
          Delete
        </button>
      </div>
    </div>
  );
};

export default TripCard;
