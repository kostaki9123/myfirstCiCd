'use client'

import { SignUp } from '@clerk/nextjs'
import React from 'react'

const Page = () => {
  return (
    <div className="relative min-h-screen grid md:grid-cols-2 bg-gradient-to-br from-sky-50 via-white to-emerald-50 overflow-hidden">

      {/* Decorative Background Circles */}
      <div className="absolute w-72 h-72 bg-sky-300 rounded-full blur-3xl opacity-20 -top-20 -left-20"></div>
      <div className="absolute w-72 h-72 bg-emerald-300 rounded-full blur-3xl opacity-20 bottom-0 right-0"></div>
      <div className="absolute w-40 h-40 bg-orange-300 rounded-full blur-3xl opacity-20 top-1/3 right-10"></div>

      {/* LEFT SIDE – Concept Explanation */}
      <div className="hidden md:flex relative z-10 flex-col justify-center px-16 backdrop-blur-sm">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-sky-600 to-emerald-600 bg-clip-text text-transparent mb-6">
          Start Planning Your Journey
        </h1>

        <p className="text-slate-600 mb-10 text-lg leading-relaxed">
          Create your trip by connecting circles as destinations,
          defining travel paths, and organizing your itinerary and budget
          all in one visual planner.
        </p>

        <div className="space-y-6">
          <div className="p-4 rounded-xl bg-white/70 shadow-sm border border-slate-200">
            <h3 className="font-semibold text-sky-600 mb-1">
              📍 Place Nodes
            </h3>
            <p className="text-slate-600 text-sm">
              Add destinations as interactive circles.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white/70 shadow-sm border border-slate-200">
            <h3 className="font-semibold text-emerald-600 mb-1">
              ✈ Travel Connections
            </h3>
            <p className="text-slate-600 text-sm">
              Connect your destinations to define your journey visually.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white/70 shadow-sm border border-slate-200">
            <h3 className="font-semibold text-orange-500 mb-1">
              📅 Smart Itinerary & Budget
            </h3>
            <p className="text-slate-600 text-sm">
              Organize activities, accommodations, and track your expenses.
            </p>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE – Sign Up */}
      <div className="relative z-10 flex items-center justify-center p-6">
        <div className="bg-white/90 backdrop-blur-xl shadow-2xl rounded-3xl md:p-6 border border-slate-200">
          <SignUp
            appearance={{
              elements: {
                card: "shadow-none border-none",
                headerTitle: "text-2xl font-semibold text-slate-800",
                headerSubtitle: "text-slate-500",
                formButtonPrimary:
                  "bg-sky-600 hover:bg-sky-700 text-white font-medium transition-all duration-200 rounded-lg",
                footerActionLink:
                  "text-sky-600 hover:text-sky-700 font-medium",
                formFieldInput:
                  "rounded-lg border-slate-300 focus:border-sky-500 focus:ring-sky-500",
              },
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default Page