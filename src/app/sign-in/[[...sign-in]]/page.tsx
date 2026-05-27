import React from 'react'
import DelayedSignIn from './components/signIn'
import { FaRoute, FaMapMarkedAlt, FaWallet } from 'react-icons/fa'

const Page = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-r from-[#010038] via-white/5 to-[#010038] text-white">

      {/* Background Glow Effects */}
      <div className="absolute top-[-120px] left-[-100px] w-[350px] h-[350px] rounded-full blur-3xl" />
      
      <div className="absolute bottom-[-120px] right-[-100px] w-[350px] h-[350px]rounded-full blur-3xl" />

      {/* Grid Layout */}
      <div className="relative z-10 grid min-h-screen lg:grid-cols-2">

        {/* LEFT SIDE */}
        <div className="hidden  lg:flex flex-col justify-center px-16  lg:ml-28">

                {/* Main Heading */}
                <div className="max-w-xl">
              
                  <h1 className="text-5xl font-bold leading-tight">
                    Plan Simply.
                    <br />
                    Travel Smarter.
                  </h1>
              
                  <p className="mt-6 text-lg text-white/70 leading-relaxed">
                    Create routes visually, organize every destination,
                    and manage your whole journey in one smart travel planner.
                  </p>
                </div>
              
                {/* Small Features */}
                <div className="mt-14 space-y-6 max-w-lg">
              
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-400/20 flex items-center justify-center">
                      <FaRoute className="text-blue-400" />
                    </div>
              
                    <div>
                      <h3 className="font-semibold text-white">
                        Smart Route Building
                      </h3>
              
                      <p className="text-white/60 text-sm mt-1">
                        Connect destinations visually and optimize your journey.
                      </p>
                    </div>
                  </div>
              
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-400/20 flex items-center justify-center">
                      <FaMapMarkedAlt className="text-cyan-300" />
                    </div>
              
                    <div>
                      <h3 className="font-semibold text-white">
                        Simple Itinerary Planning
                      </h3>
              
                      <p className="text-white/60 text-sm mt-1">
                        Organize stays, activities and places without complexity.
                      </p>
                    </div>
                  </div>
              
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-400/20 flex items-center justify-center">
                      <FaWallet className="text-indigo-300" />
                    </div>
              
                    <div>
                      <h3 className="font-semibold text-white">
                        Budget Tracking
                      </h3>
              
                      <p className="text-white/60 text-sm mt-1">
                        Keep your travel expenses organized in one place.
                      </p>
                    </div>
                  </div>
              
                </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="relative flex items-center justify-center px-6 py-16 lg:px-12">

          {/* Glass Background */}
          <div className="absolute w-[500px] h-[500px] bg-white/5 rounded-full blur-3xl" />

          {/* Auth Form */}
          <div className="relative z-10 w-full max-w-md">
            <DelayedSignIn />
          </div>

        </div>
      </div>
    </div>
  )
}

export default Page