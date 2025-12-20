"use client";

import { useState } from "react";
import { FaNoteSticky } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import { CiClock2 } from "react-icons/ci";
import { IoHome } from "react-icons/io5";
import { MdOutlineAttachMoney } from "react-icons/md";
import DatePickerExample from "../../../createtrip/[tripid]/components/locationinput/datepicker";

type props = {
    placeName : string
}

export default function PlaceToStayCard() {
  const [placeName, setPlaceName] = useState("Downtown Copenhagen Hostel");
  const [cost, setCost] = useState("");
  const [notes, setNotes] = useState("");
  const [checkIndate, setCheckIndate] = useState<Date | null>(null);
  const [checkOutdate, setCheckOutdate] = useState<Date | null>(null);
  const [startTime, setStartTime] = useState("");
  const [finishTime, setFinishTime] = useState("");

  return (
    <div className="w-full relative max-w-[490px] min-h-[240px] bg-[#ACA7CB] rounded-2xl shadow-md p-4 flex flex-col gap-4">
      
      {/* HEADER */}
      <div className="flex items-start justify-start gap-2">
        <IoHome className=" lg:text-3xl 950:text-2xl 535:text-3xl text-2xl " /> {/* bigger house icon */}
        <div className="font-semibold flex text-start outline-none w-full bg-transparent lg:text-text-lg 950:text-md 535:text-lg text-md   lg:max-w-none 950:max-w-[260px] 535:max-w-none max-w-[235px]  ">    
         {placeName}
        </div>
      </div>
      <div className=" cursor-pointer text-red-600 absolute top-4 right-4 " >
          <MdDelete className=" text-lg" />
      </div>

      {/* DATES ROW */}
      {/* DATES ROW */}
<div className="grid grid-cols-2 gap-3 w-full">

  <div className="flex flex-col w-full min-w-[90px]">
    <label className="text-xs text-gray-700">Check In</label>
    <DatePickerExample
      onChange={(value) => {
        if (Array.isArray(value)) {
          setCheckIndate(value[0] ?? null);
        } else {
          setCheckIndate(value as Date);
        }
      }}
      fromItinerary={true}
    />
  </div>

  <div className="flex flex-col w-full min-w-[90px]">
    <label className="text-xs text-gray-700">Check Out</label>
    <DatePickerExample
      onChange={(value) => {
        if (Array.isArray(value)) {
          setCheckOutdate(value[0] ?? null);
        } else {
          setCheckOutdate(value as Date);
        }
      }}
      fromItinerary={true}
    />
  </div>
</div>

{/* TIME + COST */}
<div className="grid grid-cols-2 gap-3 ">
  <button
    className="flex items-center justify-center gap-2 w-full max-w-[202px] bg-white border rounded-lg py-2 text-sm hover:bg-gray-100 active:scale-95 transition"
  >
    <CiClock2 className="text-lg" />
    Add time
  </button>

  <button
    className="flex items-center justify-center gap-2 w-full max-w-[202px] bg-white border rounded-lg py-2 text-sm hover:bg-gray-100 active:scale-95 transition"
  >
    <MdOutlineAttachMoney className="text-lg" />
    Add cost
  </button>
</div>


      {/* NOTES */}
      <div className="flex flex-col">
        <label className="text-xs text-gray-700">Notes</label>
        <textarea
          placeholder="Add notes here..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="border rounded-lg px-2 py-1 min-h-[50px] outline-none resize-none bg-white"
        />
      </div>
    </div>
  );
}
