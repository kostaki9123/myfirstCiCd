import React from "react";
import { FaRoute, FaMapMarkedAlt, FaRegLightbulb, FaWallet, FaListAlt, FaThLarge } from "react-icons/fa";

const FeaturesSection = () => {
  return (
    <section
      id="features"
      className="relative py-28 px-5 bg-gradient-to-r from-[#010038] via-white/5 to-[#010038]"
    >
      <div className="container mx-auto">

        {/* Title */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Features You'll Love
          </h2>

          <p className="mt-5 text-white/70 max-w-2xl mx-auto text-lg">
            A simple, smart and visual way to plan your trips.
          </p>
        </div>

        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 items-center gap-12  w-fit mx-auto lg:w-auto lg:mx-0">

          {/* LEFT FEATURES */}
         <div className="space-y-16 text-left  ">

               <div className="flex  gap-4  pl-8 lg:pl-0">
                 <FaRoute className="text-blue-400 text-xl mt-1" />
                 <div>
                   <h3 className="text-xl font-semibold text-white mb-2">
                     Visual Trip Builder
                   </h3>
                   <p className="text-white/70">
                     Create your journey by connecting destinations in a simple visual flow.
                   </p>
                 </div>
               </div>
             
               <div className="flex gap-4 pl-8 lg:pl-0">
                 <FaMapMarkedAlt className="text-blue-400 text-xl mt-1" />
                 <div>
                   <h3 className="text-xl font-semibold text-white mb-2">
                     Smart Routes
                   </h3>
                   <p className="text-white/70">
                     Save time and explore more with optimized travel routes.
                   </p>
                 </div>
               </div>
             
               <div className="flex gap-4 pl-8 lg:pl-0">
                 <FaRegLightbulb className="text-blue-400 text-xl mt-1" />
                 <div>
                   <h3 className="text-xl font-semibold text-white mb-2">
                     Easy Planning
                   </h3>
                   <p className="text-white/70">
                     Organize your trip without complexity or confusion.
                   </p>
                 </div>
               </div>
             
          </div>

          {/* PHONE MOCKUP */}
              <div className="hidden  lg:flex justify-center">
              {/* Phone Frame */}
                  <div className="relative w-[240px] h-[440px]">
                
                    {/* Outer glow */}
                    <div className="absolute inset-0 bg-blue-500/10 blur-2xl rounded-[3rem]" />
                
                    {/* Phone body */}
                    <div className="relative w-full h-[375px] rounded-xl bg-black border border-white/20 shadow-2xl overflow-hidden">
                
                    
                
                      {/* Screen */}
                      <div className="absolute  rounded-sm overflow-hidden bg-white/5">
                
                        <img
                          src={'/Στιγμιότυπο οθόνης 2026-06-03, 8.46.32 πμ.png'}
                          alt="app preview"
                          className="w-full h-full object-cover   "
                        />
                
                        {/* Screen overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#010038]/60 via-transparent to-transparent" />
                      </div>
                
                      {/* Bottom home indicator */}
                      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-[80px] h-[4px] bg-white/20 rounded-full" />
                
                    </div>
                  </div>
           </div>
       
          {/* RIGHT FEATURES */}
         
          <div className="space-y-16 text-left">

                 <div className="flex gap-4 pl-8 lg:pl-0">
                   <FaWallet className="text-blue-400 text-xl mt-1" />
                   <div>
                     <h3 className="text-xl font-semibold text-white mb-2">
                       Budget Tracking
                     </h3>
                     <p className="text-white/70">
                       Keep all your travel expenses in one clear place.
                     </p>
                   </div>
                 </div>
                
                 <div className="flex gap-4 pl-8 lg:pl-0">
                   <FaListAlt className="text-blue-400 text-xl mt-1" />
                   <div>
                     <h3 className="text-xl font-semibold text-white mb-2">
                       Itinerary Planning
                     </h3>
                     <p className="text-white/70">
                       Organize stays, activities, and experiences for every destination.
                     </p>
                   </div>
                 </div>
                
                 <div className="flex gap-4 pl-8 lg:pl-0">
                   <FaThLarge className="text-blue-400 text-xl mt-1" />
                   <div>
                     <h3 className="text-xl font-semibold text-white mb-2">
                       All Trips Dashboard
                     </h3>
                     <p className="text-white/70">
                       Access and manage all your journeys anytime.
                     </p>
                   </div>
                 </div>
                
            </div>

        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;