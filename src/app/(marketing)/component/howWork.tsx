import React from "react";

const steps = [
  {
    step: "Step 1",
    title: "Build Your Route",
    description:
      "Add destinations and connect them in the exact order of your journey.",
    image:
      "https://images.unsplash.com/photo-1526772662000-3f88f10405ff?q=80&w=1200&auto=format&fit=crop",
  },
  {
    step: "Step 2",
    title: "Plan Every Stop",
    description:
      "Organize accomodation,activities, and places to visit for each destination.",
    image:
      "https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=1200&auto=format&fit=crop",
  },
  {
    step: "Step 3",
    title: "Manage Your Budget",
    description:
      "Track transportation, stays, and travel expenses in one place.",
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=1200&auto=format&fit=crop",
  },
];

const HowItWorks = () => {
  return (
    <section className="relative py-24 overflow-hidden bg-gradient-to-r ">
      
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 sm:px-12 lg:px-16 relative z-10">

        {/* Heading */}
        <div className="text-center mb-24">
          <h2 className="text-4xl md:text-4xl font-bold text-white">
            How It Works
          </h2>

          <p className="mt-6 text-white/70 text-lg max-w-2xl mx-auto leading-relaxed">
               Plan trips simply. Explore more with smart routes.
              Enjoy creating your journey visually.
          </p>
        </div>

        {/* Steps */}
        <div className="space-y-32">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`flex flex-col ${
                index % 2 === 0
                  ? "lg:flex-row"
                  : "lg:flex-row-reverse"
              } items-center gap-14`}
            >

              {/* TEXT */}
              <div className="w-full lg:w-1/2 order-1 lg:order-none text-center lg:text-left">
                
                <span className="text-blue-300 font-semibold tracking-[0.2em] uppercase text-sm">
                  {step.step}
                </span>

                <h3 className="mt-4 text-3xl md:text-4xl font-bold text-white leading-tight">
                  {step.title}
                </h3>

                <p className="mt-6 text-white/70 text-lg leading-relaxed max-w-xl mx-auto lg:mx-0">
                  {step.description}
                </p>

                {/* Decorative Line */}
                <div className="mt-8 w-24 h-[3px] bg-blue-400 rounded-full mx-auto lg:mx-0" />
              </div>

              {/* IMAGE */}
              <div className="w-full lg:w-1/2 order-2 lg:order-none">
                <div
                  className="
                    relative
                    rounded-3xl
                    overflow-hidden
                    border border-white/10
                    bg-white/5
                    backdrop-blur-md
                    shadow-2xl
                    group
                  "
                >
                  <img
                    src={step.image}
                    alt={step.title}
                    className="
                      w-full
                      h-[320px]
                      object-cover
                      transition-transform
                      duration-500
                      group-hover:scale-105
                    "
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 " />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;