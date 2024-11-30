

import React from 'react';

const HorizontalItinerary = ({ itinerary }: any) => {


  return (
    <div className="flex flex-col items-start p-4 relative">
      {/* Countdown Clock */}
      <div className="fixed top-20 right-0 bg-gray-800 text-white text-sm rounded-lg p-2 mx-4 my-4 shadow-lg">
        <p>Time to Trip:</p>
        <div className="font-mono text-lg">
            2d 5h 20m 57s
        </div>
      </div>

      {/* Title */}
      <h1 className="text-2xl left-64 font-bold mx-4 my-4 fixed top-20">Trip Itinerary</h1>

      {/* Itinerary Cards */}
      <div className="flex overflow-x-auto space-x-8 py-4">
        {itinerary.map((item: any, index: number) => (
          <div
            key={index}
            className="flex-shrink-0 w-64 bg-white shadow-md rounded-lg p-4 border border-gray-200"
          >
            <h2 className="text-lg font-semibold">{item.title}</h2>
            <p className="text-sm text-gray-600">{item.date}</p>
            <div className="mt-2">
              <p className="text-sm text-gray-800">{item.description}</p>
            </div>
            <div className="mt-4">
              <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
                {item.type}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HorizontalItinerary;
