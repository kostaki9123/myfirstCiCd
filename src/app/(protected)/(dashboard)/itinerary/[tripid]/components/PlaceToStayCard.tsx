"use client";

import { useState } from "react";
import { FaNoteSticky } from "react-icons/fa6";
import { ChevronDown } from "lucide-react"
import { MdDelete } from "react-icons/md";
import { CiClock2 } from "react-icons/ci";
import { IoHome } from "react-icons/io5";
import { MdOutlineAttachMoney } from "react-icons/md";
import DatePickerExample from "../../../createtrip/[tripid]/components/locationinput/datepicker";
import NotesBox from "../../../../../component/notes/edittextarea";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import AbleDatesDropdown from "./ableDatesDropdown";


type props = {
    placeName : string
    startDate :  string | Date | null | undefined;
    endDate :  string | Date | null | undefined;
}

export default function PlaceToStayCard(props : props) {
  const [placeName, setPlaceName] = useState("Downtown Copenhagen Hostel");

  const [checkIndate, setCheckIndate] = useState<Date | null>(null);
  const [checkOutdate, setCheckOutdate] = useState<Date | null>(null);

  

  const [cost, setCost] = useState("");
  const [notes, setNotes] = useState("");

  return (
   <Accordion
      type="single"
      collapsible
      className="w-full bg-gray-400 rounded-md overflow-visible"
      defaultValue="item-1"
    > 
     <AccordionItem value="item-1"   className="overflow-visible">
      {/* HEADER */}
      <AccordionTrigger className="relative   " >
       <div className="flex items-center justify-start gap-2 pl-1 ">
         <IoHome className=" lg:text-3xl 950:text-2xl 535:text-3xl text-2xl " /> {/* bigger house icon */}
         <div className="font-semibold flex items-center justify-start text-start outline-none w-full  bg-transparent lg:text-lg 950:text-md 535:text-lg text-md xl:max-w-[295px] lg:max-w-[250px] 950:max-w-[220px] 535:max-w-none max-w-[200px]  ">    
           <div className="" >
            {placeName}
           </div>
          <ChevronDown className="h-4 w-4 m-1  shrink-0 text-neutral-500 transition-transform duration-200 dark:text-neutral-400" />
         </div>
       </div>
       
       <div className=" cursor-pointer text-red-600 absolute top-5 right-5 " >
           <MdDelete className="  lg:text-lg 950:text-md 535:text-lg text-md" />
       </div>
      </AccordionTrigger> 
      <AccordionContent className="flex flex-col gap-4 pb-0 text-balance rounded-md ">
        <div className="w-full relative max-w-[490px]  rounded-2xl  p-4 flex flex-col gap-4">
      
         <div className="grid grid-cols-2 gap-3 w-full">

              <div className="flex flex-col w-full min-w-[90px]">
                <label className="text-xs text-gray-700">Check In</label>
                  <AbleDatesDropdown value={checkIndate} startDate={props.startDate ? props.startDate : ''} endDate={props.endDate ? props.endDate : ''} onChange={setCheckIndate} />
              </div>
   
              <div className="flex flex-col w-full min-w-[90px]">
                 <label className="text-xs text-gray-700">Check Out</label>
                  <AbleDatesDropdown value={checkOutdate} startDate={props.startDate ? props.startDate : ''} endDate={props.endDate ? props.endDate : ''} onChange={setCheckOutdate} />
              </div>
           </div>

           {/* TIME + COST */}
           <div className="grid grid-cols-2 gap-3 ">

             
            
             <button
               className="flex items-center justify-center gap-2 w-full max-w-[202px] bg-white border rounded-lg py-2 text-sm hover:bg-gray-100 active:scale-95 transition"
             >
               <MdOutlineAttachMoney className="text-lg" />
               Add cost
             </button>
           </div>


           {/* NOTES */}
           <div className="flex flex-col  ">
             <label className="text-xs text-gray-700   ">Notes</label>
             <NotesBox id="trip_1" placeholder="Check-in instructions, Wi-Fi, host contact, nearby tips…"  defaultNotes="" showLabel={false} fromItinerary />
           </div>
       </div> 
    </AccordionContent>
   </AccordionItem>
  </Accordion>   
  );
}

  

