"use client"

import { Button } from "@/components/ui/button"
import Createtripmodal from "../create-trip-modal"

export default function EmptyTripsState() {
  return (
    <div className="flex flex-col items-center justify-center mt-32 text-center">
      <h2 className="text-3xl font-bold text-white mb-4">
        Start your first journey ✈️
      </h2>

      <p className="text-gray-400 max-w-md mb-8">
        Create a trip, add places as circles, connect them with transport,
        then plan itinerary and budget step by step.
      </p>

      <Createtripmodal />

      <div className="mt-10 text-sm text-gray-500 space-y-2">
        <p>1. Create a trip</p>
        <p>2. Add places</p>
        <p>3. Connect transport</p>
        <p>4. Plan itinerary</p>
        <p>5. Track budget</p>
      </div>
    </div>
  )
}