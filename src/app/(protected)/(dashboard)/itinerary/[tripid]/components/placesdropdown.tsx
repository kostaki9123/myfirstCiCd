import React from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { IoIosArrowDown } from "react-icons/io";
import { ItineraryPoint } from './itineraryboard';

type props = {
  cyrclesArr: ItineraryPoint[];
  selectedPlace?: ItineraryPoint;
  setSelectedPoint: (point: ItineraryPoint) => void;
}

const Placesdropdown = (props: props) => {

  console.log("Selected place:", props.selectedPlace);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="cursor-pointer flex items-center gap-2 text-xl font-semibold">
          <div>
            {props.selectedPlace?.placeName || "No place"}
          </div>
          <IoIosArrowDown />
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56 rounded-md">
        <DropdownMenuLabel className="text-center">Places</DropdownMenuLabel>
        <DropdownMenuSeparator />

        {props.cyrclesArr.map((cyrcle, key) =>
          cyrcle.role === "POINT" && (
            <DropdownMenuItem
              key={cyrcle.id}
              className="w-[240px] py-[6px] px-3"
              onClick={() => props.setSelectedPoint(cyrcle)}
            >
              {cyrcle.placeName}
            </DropdownMenuItem>
          )
        )}

      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default Placesdropdown;
