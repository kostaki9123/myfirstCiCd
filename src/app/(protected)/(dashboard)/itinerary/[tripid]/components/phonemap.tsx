'use client'

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { BsMap } from "react-icons/bs";
import { IoArrowBack } from "react-icons/io5";
import Mapprovider from "@/app/component/map/map-provider";
import { RecommendedPlace } from "@/app/component/map/map";
import { LucideMapPinned } from "lucide-react";

type LatLng = { lat: number; lng: number };

type props = {
      focusplace?: LatLng | null;
      cyrclesArr: any[]
      addedplacetovisit?: RecommendedPlace[]
      addedplacetostay?: RecommendedPlace[]
      recommendedVisits?: RecommendedPlace[] 
      recommendedStays?: RecommendedPlace[];
      visitDateColors?: Record<string, string> 
}          

export default function PhoneMap(props:props) {
  const [mapOpen, setMapOpen] = useState(false);

  return (
    <div className="">
      {/* Trigger Button */}
      <div
        onClick={() => setMapOpen(true)}
        className="
          fixed cursor-pointer  bottom-[15px] left-1/2 -translate-x-1/2 px-5 
          bg-white/10 hover:bg-white/15 text-white  border-white/15 backdrop-blur-md
          shadow-black/20  gap-2 535:hidden
           flex h-16 w-16 items-center justify-center rounded-full
             z-[998]    bg-gradient-to-br from-blue-500 to-emerald-500
          shadow-xl transition-all duration-300 text-4xl
        "
      >
         <LucideMapPinned  className="text-white" />
      </div>

      {/* Full-Screen Map Overlay */}
      {mapOpen && (
        <div className="fixed inset-0 top-14   z-50 bg-black">
          {/* Map iframe */}
           <Mapprovider

            cyrclesArr={props.cyrclesArr}
            focusplace={props.focusplace}
            addedplacetostay={props.addedplacetostay}
            addedplacetovisit={props.addedplacetovisit}
            visitDateColors={props.visitDateColors}  
          />

          {/* Back Button */}
          <Button
            onClick={() => setMapOpen(false)}
            className="
              absolute top-5 left-4 h-10 px-4 rounded-lg z-10
              bg-[#1a194c] hover:bg-[#272656] text-white border border-white/20
              backdrop-blur-md shadow-lg shadow-black/30
              transition-all duration-200 flex items-center gap-2
            "
          >
            <IoArrowBack />
            Back
          </Button>
        </div>
      )}
    </div>
  );
}
