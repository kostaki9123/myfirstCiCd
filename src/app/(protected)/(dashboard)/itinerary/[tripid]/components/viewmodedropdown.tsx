import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IoIosArrowDown } from "react-icons/io";

export type ItineraryViewMode = "DAY_BY_DAY" | "CUSTOM";

type Props = {
  selectedMode: ItineraryViewMode;
  setSelectedMode: (mode: ItineraryViewMode) => void;
};

const ViewModeDropdown = ({
  selectedMode,
  setSelectedMode,
}: Props) => {
  const selectedLabel =
    selectedMode === "DAY_BY_DAY" ? "Day by day" : "Custom";

  return (
   <DropdownMenu>
  <DropdownMenuTrigger asChild>
    <button
      type="button"
      className="
        flex items-center gap-1
        rounded-full
        border border-white/15
        bg-white/10
        px-3 py-1
        text-xs font-medium text-white
        backdrop-blur-sm
        transition-all
        hover:bg-white/20
      "
    >
      <span>
        {selectedMode === "DAY_BY_DAY" ? "Day by day" : "Custom"}
      </span>
      <IoIosArrowDown className="h-3.5 w-3.5 opacity-80" />
    </button>
  </DropdownMenuTrigger>

  <DropdownMenuContent
    align="start"
    className="w-40 rounded-xl border-white/10 bg-[#0b1338]/95 text-white backdrop-blur-xl"
  >
    <DropdownMenuItem
      className="cursor-pointer rounded-lg focus:bg-white/10  focus:text-white"
      onSelect={() => setSelectedMode("DAY_BY_DAY")}
    >
      Day by day
    </DropdownMenuItem>

    <DropdownMenuItem
      className="cursor-pointer rounded-lg focus:bg-white/10 focus:text-white"
      onSelect={() => setSelectedMode("CUSTOM")}
    >
      Custom
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
  );
};

export default ViewModeDropdown;