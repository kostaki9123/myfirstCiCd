import { useState } from "react";
import { Button } from "@/components/ui/button";
import { BsMap } from "react-icons/bs";
import { IoArrowBack } from "react-icons/io5";
import Mapprovider from "@/app/component/map/map-provider";
import { RecommendedPlace } from "@/app/component/map/map";

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
    <>
      {/* Trigger Button */}
      <Button
        onClick={() => setMapOpen(true)}
        className="
          absolute bottom-5 left-1/2 -translate-x-1/2 h-10 px-5 rounded-lg
          bg-white/10 hover:bg-white/15 text-white border border-white/15 backdrop-blur-md
          shadow-lg shadow-black/20 transition-all duration-200 flex items-center gap-2 950:hidden
        "
      >
        <BsMap />
        View Map
      </Button>

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
    </>
  );
}
