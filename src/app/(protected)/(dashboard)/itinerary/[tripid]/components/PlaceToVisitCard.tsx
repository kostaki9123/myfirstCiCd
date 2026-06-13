"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { z } from "zod";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import AbleDatesDropdown from "./ableDatesDropdown";
import TimeSlotsDropdown from "./timeDropdown";
import Deleteplacebtn from "./deleteplacebtn";
import { Button } from "@/components/ui/button";
import NotesBox from "@/app/component/notes/edittextarea";
import { updatePlace } from "../action";
import AddExpenseDialog from "../../../budget/[tripid]/component/expenseDialog";
import { RiExternalLinkLine } from "react-icons/ri";
import PayStatusDropdown from "./paidstatusdropdown";


type Props = {
  index : number
  internalId : string
  id: string;
  pointId: string;
  budgetid: string
  placeType: "ACCOMMODATION" | "PLACE_TO_VISIT";
  name: string;
  ablestayFrom?: Date | null;
  ablestayUntil?: Date | null;
  visitDate?: Date | null;
  visitTime?: Date | null;
  notes?: string | null;
  affiliateLink?: string | null
  paymentStatus?: string;
  dateColorClass?: string
  entryPrice? : number | null
};

/* -------------------------------------------------------
   VALIDATION
------------------------------------------------------- */

const updateSchema = z.object({
  id: z.string(),
  pointId: z.string(),
  visitDate: z.date().nullable(),
  visitTime: z.date().nullable(),
  notes: z.string().nullable(),
});

/* -------------------------------------------------------
   COMPONENT
------------------------------------------------------- */

export default function PlaceToVisitCard(props: Props) {
  /* ------------------ STATE ------------------ */

  const [visitDate, setVisitDate] = useState<Date | null>(
    props.visitDate ?? null
  );
  const [visitTime, setVisitTime] = useState<Date | null>(
    props.visitTime ?? null
  );

  const [paymentStatus, setPaymentStatus] = useState(
  props.paymentStatus ?? ''
)

  
  const [notes, setNotes] = useState(props.notes ?? "");

  const [isDirty, setIsDirty] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /* ------------------ RESET ------------------ */

  const resetState = () => {
    setVisitDate(props.visitDate ?? null);
    setVisitTime(props.visitTime ?? null);
    setNotes(props.notes ?? "");
    setIsDirty(false);
    setError(null);
  };

  /* ------------------ SAVE ------------------ */

  const handleSave = async () => {
    setError(null);

    const validation = updateSchema.safeParse({
      id: props.id,
      pointId: props.pointId,
      visitDate,
      visitTime,
      notes,
    });

    if (!validation.success) {
      setError(validation.error.errors[0].message);
      return;
    }

    const d = validation.data;
    const fd = new FormData();

    fd.append("internalId", props.internalId );
    if (d.visitDate) fd.append("visitDate", d.visitDate.toLocaleDateString("en-CA"));
    if (d.visitTime) fd.append("visitTime", d.visitTime.toISOString());
    fd.append("paymentStatus", paymentStatus);
    fd.append("notes", d.notes ?? "");

    try {
      await updatePlace(fd);
      setIsDirty(false);
    } catch {
      setError("Failed to update");
    }
  };

  /* ------------------ RENDER ------------------ */

  return (
    <Accordion
      type="single"
      collapsible
      className="w-full bg-white/5 rounded-md"
      onValueChange={(v) => !v && resetState()}
    >
      <AccordionItem value="item-1">
        {/* HEADER */}
        <AccordionTrigger className="relative">
          <div className="flex items-center  gap-4 pl-1">
            <div className="w-8 h-10">
                   <svg viewBox="0 0 24 36" className="w-full h-full">
                     {/* Pin */}
                     <path
                    
                       d="M12 0C7 0 3 4 3 9c0 6 9 21 9 21s9-15 9-21c0-5-4-9-9-9z"
                       fill={`${props.dateColorClass ? props.dateColorClass : '#6b7280'}`}
                       strokeWidth="1"
                     />
                
                     {/* Tourist attraction star */}
                     <path
                       d="M12 4.5 L13.2 7.2 L16.2 7.5 L14 9.4 L14.7 12.2 L12 10.7 L9.3 12.2 L10 9.4 L7.8 7.5 L10.8 7.2 Z"
                       fill="white"
                     />
                
                     {/* Number */}
                     <text
                       x="12"
                       y="22"
                       textAnchor="middle"
                       fontSize="10"
                       fill="white"
                       fontFamily="Arial"
                       fontWeight="bold"
                     >
                       {props.index + 1}
                     </text>
                   </svg>
                </div>

            <div className="font-semibold flex items-center gap-1 hover:underline max-w-[140px] ">
              {props.name}
              <ChevronDown className="h-4 w-4 text-neutral-500" />
            </div>
             <div className=" text-xs text-white/70 no-underline! [text-decoration:none] " >     
             {props.visitDate
                ? new Date(props.visitDate).toLocaleDateString("en-GB", {
                    month: "2-digit",
                    day: "2-digit",
                  })
                :"N/A"}
             </div>
             <>-</>
            <div className=" text-xs text-white/70 no-underline! [text-decoration:none] " >     
            {props.visitTime
               ? new Date(props.visitTime).toLocaleTimeString("en-GB", {
                   hour: "2-digit",
                   minute: "2-digit",
                   timeZone: "UTC",
                 })
               :"N/A"}
             </div>
              {props.entryPrice &&
                  (props.entryPrice > 0 ?
                <div className="mt-2 flex items-center justify-between">
  <div className="flex flex-col">
    <div className="flex items-center gap-1">
      <span className="text-xs opacity-60">🎟️</span>
      <span className="text-sm font-medium text-white/70">
        ${props.entryPrice}
      </span>
    </div>

    <span className="text-[9px] text-white/40">
      Est. entry
    </span>
  </div>
</div>
                     :
                     <div className="text-sm font-semibold text-emerald-300 opacity-60">
                     Free
                   </div>
                     )} 
          </div>
          <Deleteplacebtn placeId={props.id} pointId={props.pointId} />
        </AccordionTrigger>

        {/* CONTENT */}
        <AccordionContent className="pb-4">
          <div className="p-4 flex flex-col  gap-4 max-w-[500px]">
            {/* DATE */}
            <div className="grid grid-cols-2 gap-3" >
              <div>
                  <label className="text-xs text-white">Visit date</label>
                  <AbleDatesDropdown
                    value={visitDate}
                    startDate={props.ablestayFrom ?? ""}
                    endDate={props.ablestayUntil ?? ""}
                    onChange={(v) => {
                      setVisitDate(v);
                      setIsDirty(true);
                    }}
                  />
              </div>
              <div>
                  <label className="text-xs text-white">Visit Time</label>
                  <TimeSlotsDropdown
                   value={visitTime}
                   onChange={(v) => {
                     setVisitTime(v);
                     setIsDirty(true);
                   }}
                 />
              </div>

            </div>

            {/* TIME + COST */}
            <div className="py-1 flex flex-col gap-4 max-w-[500px] ">
            {/* CHECK-IN / CHECK-OUT */}
               <div className="grid grid-cols-2 gap-3">
                   <div className="flex flex-col">
                        <label className="text-xs text-white  ">Cost</label>
                      <AddExpenseDialog connectedToId={props.internalId} budgedId={props.budgetid} fromAllExpenses={true}  fromItinerary/> 
                     
                   </div>

                   <div className="flex flex-col">
                        <label className="text-xs text-white">Payment Status</label>
                        <PayStatusDropdown
                          value={paymentStatus}
                          onChange={(v) => {
                            setPaymentStatus(v)
                            setIsDirty(true)
                          }}
                        />
                    </div>

                </div>
             </div>


            {/* NOTES */}
            <div className="flex flex-col">
              <label className="text-xs text-white">Notes</label>
              <NotesBox
                value={notes}
                onChange={(v) => {
                  setNotes(v);
                  setIsDirty(true);
                }}
                placeholder="Opening hours, ticket info, best time to visit…"
                showLabel={false}
                fromItinerary
              />
            </div>

              {props.affiliateLink && (
                   <a
                     href={props.affiliateLink} 
                     target="_blank"
                     rel="noopener noreferrer"
                   >
                     <Button className="bg-[#0356BC] hover:bg-[#0466D9] text-white border border-white/10 shadow-lg
                 shadow-blue-950/40 px-4 py-2 rounded-xl font-medium transition-all duration-200 active:scale-[0.98] w-full">
                       {props.affiliateLink.includes('www.google.com') ? 'View Here'  : "Book Here"}
                       <RiExternalLinkLine className=' text-lg'/>
                     </Button>
                   </a>
                 )} 

            {/* SAVE */}
            {isDirty && (
              <div className="flex justify-end gap-2 items-center">
                {error && <p className="text-sm text-red-500">{error}</p>}
                <Button className="bg-[#0356BC] hover:bg-[#0466D9] text-white border border-white/10 shadow-lg
                 shadow-blue-950/40 px-4 py-2 rounded-xl font-medium transition-all duration-200 active:scale-[0.98]" onClick={handleSave}>Save</Button>
              </div>
            )}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
