"use client";

import { useState } from "react";
import { FaLocationPin } from "react-icons/fa6";
import { MdOutlineAttachMoney } from "react-icons/md";
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

/* -------------------------------------------------------
   TYPES
------------------------------------------------------- */

type Props = {
  id: string;
  pointId: string;
  placeType: "ACCOMMODATION" | "PLACE_TO_VISIT";
  name: string;
  stayFrom?: Date | null;
  stayUntil?: Date | null;
  visitDate?: Date | null;
  visitTime?: Date | null;
  notes?: string | null;
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

      console.log("notes", d.notes)

    fd.append("id", d.id);
    fd.append("pointId", d.pointId);
    if (d.visitDate) fd.append("visitDate", d.visitDate.toISOString());
    if (d.visitTime) fd.append("visitTime", d.visitTime.toISOString());
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
      defaultValue="item-1"
      onValueChange={(v) => !v && resetState()}
    >
      <AccordionItem value="item-1">
        {/* HEADER */}
        <AccordionTrigger className="relative">
          <div className="flex items-start gap-2 pl-1">
            <div className="relative inline-flex items-center justify-center">
              <FaLocationPin className="text-2xl text-black" />
              <span className="absolute text-white text-[14px] font-bold -translate-y-[3.5px]">
                1
              </span>
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
                    startDate={props.stayFrom ?? ""}
                    endDate={props.stayUntil ?? ""}
                    onChange={(v) => {
                      setVisitDate(v);
                      setIsDirty(true);
                    }}
                  />
              </div>
              <div>
                  <label className="text-xs text-gray-700">Visit Time</label>
                  <TimeSlotsDropdown
                   startTime="03:00"
                   endTime="08:00"
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
            <button className="flex items-center justify-center gap-2 w-full max-w-[202px] bg-white border rounded-lg py-2 text-sm hover:bg-gray-100 active:scale-95 transition" > <MdOutlineAttachMoney className="text-lg" /> 
                          Add cost 
            </button>

            {/* NOTES */}
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
