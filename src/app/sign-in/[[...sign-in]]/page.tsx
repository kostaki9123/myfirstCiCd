

import React from 'react'
import DelayedSignIn from './components/signIn'

const  Page =  () => {

  return (
    <div className="relative min-h-screen grid md:grid-cols-2 bg-gradient-to-br from-sky-50 via-white to-emerald-50 overflow-hidden">

      {/* Decorative Background Circles */}
      <div className="absolute w-72 h-72 bg-sky-300 rounded-full blur-3xl opacity-20 -top-20 -left-20"></div>
      <div className="absolute w-72 h-72 bg-emerald-300 rounded-full blur-3xl opacity-20 bottom-0 right-0"></div>

      {/* LEFT SIDE – Concept Explanation */}
      <div className="hidden md:flex relative z-10 flex-col justify-center px-16 backdrop-blur-sm">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-sky-600 to-emerald-600 bg-clip-text text-transparent mb-6">
          Design Your Trip Step by Step
        </h1>

        <p className="text-slate-600 mb-10 text-lg leading-relaxed">
          Plan your journey visually. Add destination circles, link them in the order 
          you’ll visit, and organize your entire trip — itinerary, stays, and budget — 
          in one smart planner.
        </p>

        <div className="space-y-6">
          <div className="p-4 rounded-xl bg-white/70 shadow-sm border border-slate-200">
            <h3 className="font-semibold text-sky-600 mb-1">
              📍 Place Nodes
            </h3>
            <p className="text-slate-600 text-sm">
              Add destinations as interactive circles — click to edit details or add stops along your journey.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white/70 shadow-sm border border-slate-200">
            <h3 className="font-semibold text-emerald-600 mb-1">
              ✈ Travel Connections
            </h3>
            <p className="text-slate-600 text-sm">
              Connect your destinations visually to define the path of your trip.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white/70 shadow-sm border border-slate-200">
            <h3 className="font-semibold text-orange-500 mb-1">
              📅 Smart Itinerary & Budget
            </h3>
            <p className="text-slate-600 text-sm">
              Plan activities, accommodations, and track your expenses — all in one place.
            </p>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE – Sign In */}
        <div className="relative z-10 flex items-center justify-center p-6 ">
             <DelayedSignIn/>
        </div>
    </div>
  )
}

export default Page