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
      className="w-full bg-gray-400 rounded-md"
      onValueChange={(v) => !v && resetState()}
    >
      <AccordionItem value="item-1">
        {/* HEADER */}
        <AccordionTrigger className="relative">
          <div className="flex items-center  gap-2 pl-1">
            <div className="w-8 h-10">
                   <svg viewBox="0 0 24 36" className="w-full h-full">
                     {/* Blue pin */}
                     <path
                       d="M12 0C7 0 3 4 3 9c0 6 9 21 9 21s9-15 9-21c0-5-4-9-9-9z"
                       fill="#401eff"
                       stroke="#311eff"
                       strokeWidth="1"
                     />
                 
                     {/* Circle icon */}
                     <circle cx="12" cy="9" r="4" fill="white" />
                 
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

            <div className="font-semibold flex items-center gap-1">
              {props.name}
              <ChevronDown className="h-4 w-4 text-neutral-500" />
            </div>
          </div>
          <Deleteplacebtn placeId={props.id} pointId={props.pointId} />
        </AccordionTrigger>

        {/* CONTENT */}
        <AccordionContent className="pb-4">
          <div className="p-4 flex flex-col  gap-4 max-w-[500px]">
            {/* DATE */}
            <div className="grid grid-cols-2 gap-3" >
              <div>
                  <label className="text-xs text-gray-700">Visit date</label>
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
                  <label className="text-xs text-gray-700">Visit Time</label>
                  <TimeSlotsDropdown
                   startTime="00:00"
                   endTime="23:45"
                   stepMinutes={15}
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
                        <label className="text-xs text-gray-700  ">Cost</label>
                      <AddExpenseDialog connectedToId={props.internalId} budgedId={props.budgetid} fromAllExpenses={true}  fromItinerary/> 
                     
                   </div>

                   <div className="flex flex-col">
                        <label className="text-xs text-gray-700">Payment Status</label>
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
              <label className="text-xs text-gray-700">Notes</label>
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
                     <Button className="w-full">
                       Book Here
                       <RiExternalLinkLine className=' text-lg'/>
                     </Button>
                   </a>
                 )} 

            {/* SAVE */}
            {isDirty && (
              <div className="flex justify-end gap-2 items-center">
                {error && <p className="text-sm text-red-500">{error}</p>}
                <Button onClick={handleSave}>Save</Button>
              </div>
            )}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
