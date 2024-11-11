import React from "react";

const HowItWorks = () => {
  const steps = [
    { title: "Choose Your Destination", icon: "🌍", description: "Select from a wide range of popular destinations." },
    { title: "Plan Your Adventure", icon: "🗺️", description: "Customize your itinerary with exciting activities." },
    { title: "Book & Go!", icon: "✈️", description: "Book everything in one place and enjoy your trip." },
  ];

  return (
    <div className="py-16 bg-gray-100 text-center">
      <h2 className="text-3xl font-semibold mb-8">How It Works</h2>
      <div className="flex flex-wrap justify-center">
        {steps.map((step, index) => (
          <div key={index} className="w-full md:w-1/3 px-6 mb-6">
            <div className="p-6 bg-white rounded-lg shadow-md">
              <div className="text-4xl mb-4">{step.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HowItWorks;
