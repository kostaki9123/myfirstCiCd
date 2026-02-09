"use client";

import { useState } from "react";
import { IoHome } from "react-icons/io5";
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
import NotesBox from "../../../../../component/notes/edittextarea";
import Deleteplacebtn from "./deleteplacebtn";
import { Button } from "@/components/ui/button";
import { updatePlace } from "../action";
import AddExpenseDialog from "../../../budget/[tripid]/component/expenseDialog";
//import { updatePlaceToStay } from "../actions"; // 👈 your server action

/* -------------------------------------------------------
   TYPES
------------------------------------------------------- */

type Props = {
  internalId : string
  id: string;
  budgetid: string
  pointId: string;
  placeType: "ACCOMMODATION" | "PLACE_TO_VISIT";
  name: string;
  stayFrom?: Date | null;
  stayUntil?: Date | null;
  notes?: string | null;
};

/* -------------------------------------------------------
   VALIDATION
------------------------------------------------------- */

const updateSchema = z
  .object({
    id: z.string(),
    pointId: z.string(),
    stayFrom: z.date().nullable(),
    stayUntil: z.date().nullable(),
    notes: z.string().nullable(),
  })
  .refine(
    (v) =>
      !v.stayFrom ||
      !v.stayUntil ||
      v.stayUntil >= v.stayFrom,
    {
      message: "Check-out cannot be before check-in",
    }
  );

/* -------------------------------------------------------
   COMPONENT
------------------------------------------------------- */

export default function PlaceToStayCard(props: Props) {
  /* ------------------ STATE ------------------ */

  const [checkIn, setCheckIn] = useState<Date | null>(props.stayFrom ?? null);
  const [checkOut, setCheckOut] = useState<Date | null>(props.stayUntil ?? null);
  const [notes, setNotes] = useState(props.notes ?? "");

  const [isDirty, setIsDirty] = useState(false);
  const [error, setError] = useState<string | null>(null);

  console.log('id',props.id)
  /* ------------------ RESET ------------------ */

  const resetState = () => {
    setCheckIn(props.stayFrom ?? null);
    setCheckOut(props.stayUntil ?? null);
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
      stayFrom: checkIn,
      stayUntil: checkOut,
      notes,
    });

    if (!validation.success) {
      setError(validation.error.errors[0].message);
      return;
    }

    

    const d = validation.data;

    const fd = new FormData();
    fd.append("id", d.id);
    fd.append("pointId", d.pointId);

    if (d.stayFrom) fd.append("stayFrom", d.stayFrom.toISOString());
    if (d.stayUntil) fd.append("stayUntil", d.stayUntil.toISOString());

    fd.append("notes", d.notes ?? "");

    try {
      await updatePlace(fd);
      setIsDirty(false);
    } catch (err) {
      console.error(err);
      setError("Failed to update");
    }
  };

  console.log('from',props.stayFrom)
  console.log(props.stayUntil)

  /* ------------------ RENDER ------------------ */

  return (
    <Accordion
      type="single"
      collapsible
      className="w-full bg-gray-400 rounded-md"
      onValueChange={(v) => {
        if (!v) resetState();
      }}
    >
      <AccordionItem value="item-1">
        {/* ---------------- HEADER ---------------- */}
        <AccordionTrigger className="relative">
          <div className="flex items-center gap-2 pl-1">
            <IoHome className="text-2xl" />
            <div className="font-semibold flex items-center gap-1">
              {props.name}
              <ChevronDown className="h-4 w-4 text-neutral-500" />
            </div>
          </div>
          <Deleteplacebtn placeId={props.id} pointId={props.pointId} />
        </AccordionTrigger>

        {/* ---------------- CONTENT ---------------- */}
        <AccordionContent className="pb-4">
          <div className="p-4 flex flex-col gap-4 max-w-[500px]">
            {/* CHECK-IN / CHECK-OUT */}
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col">
                <label className="text-xs text-gray-700">Check In</label>
                <AbleDatesDropdown
                  value={checkIn}
                  startDate={props.stayFrom ?? ""}
                  endDate={props.stayUntil ?? ""}
                  onChange={(v) => {
                    setCheckIn(v);
                    setIsDirty(true);
                  }}
                />
              </div>

              <div className="flex flex-col">
                <label className="text-xs text-gray-700">Check Out</label>
                <AbleDatesDropdown
                  value={checkOut}
                  startDate={props.stayFrom ?? ""}
                  endDate={props.stayUntil ?? ""}
                  onChange={(v) => {
                    setCheckOut(v);
                    setIsDirty(true);
                  }}
                />
              </div>
            </div>

            {/* COST (optional) */}
            <div className="flex flex-col">
            <label className="text-xs text-gray-700  ">Cost</label>
                 <AddExpenseDialog connectedToId={props.internalId} budgedId={props.budgetid} fromItinerary/> 
            </div>

            {/* NOTES */}
            <div className="flex flex-col">
              <label className="text-xs text-gray-700">Notes</label>
              <NotesBox
                placeholder="Check-in instructions, Wi-Fi, host contact…"
                value={notes}
                showLabel={false}
                fromItinerary
                onChange={(v: string) => {
                  setNotes(v);
                  setIsDirty(true);
                }}
              />
            </div>

            {/* SAVE */}
            {isDirty && (
              <div className="flex justify-end gap-2 items-center">
                {error && (
                  <p className="text-sm text-red-500">{error}</p>
                )}
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();   // 🔥 THIS FIXES IT
                        handleSave();
                      }}
                    >
                      Save
                    </Button>
              </div>
            )}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
