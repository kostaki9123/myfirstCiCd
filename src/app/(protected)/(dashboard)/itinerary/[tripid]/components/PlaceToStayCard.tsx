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
  import NotesBox from "../../../../../component/notes/edittextarea";
  import Deleteplacebtn from "./deleteplacebtn";
  import { Button } from "@/components/ui/button";
  import { updatePlace } from "../action";
  import AddExpenseDialog from "../../../budget/[tripid]/component/expenseDialog";
  import { RiExternalLinkLine } from "react-icons/ri";
  import PayStatusDropdown from "./paidstatusdropdown";

  type Props = {
    index : number
    internalId : string
    id: string;  
    budgetid: string
    pointId: string;
    placeType: "ACCOMMODATION" | "PLACE_TO_VISIT";
    name: string;
    stayFrom?: Date | null;
    stayUntil?: Date | null;
    notes?: string | null;
    ablestayFrom: Date | null | undefined;
    ablestayUntil: Date | null | undefined
    affiliateLink?: string | null
    paymentStatus?: string;
    entryPrice? : number | null
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
    const [paymentStatus, setPaymentStatus] = useState(
    props.paymentStatus ?? ''
  )

  
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
      fd.append("internalId", props.internalId );
        

      if (d.stayFrom) fd.append("stayFrom",  d.stayFrom.toLocaleDateString("en-CA"));
      if (d.stayUntil) fd.append("stayUntil", d.stayUntil.toLocaleDateString("en-CA"));

      fd.append("paymentStatus", paymentStatus);
      fd.append("notes", d.notes ?? "");

      try {
        await updatePlace(fd);
        setIsDirty(false);
      } catch (err) {
        console.error(err);
        setError("Failed to update");
      }
    };

    return (
      <Accordion
        type="single"
        collapsible
        className="w-full bg-white/5 rounded-md"
        onValueChange={(v) => {
          if (!v) resetState();
        }}
      >
        <AccordionItem value="item-1">
          {/* ---------------- HEADER ---------------- */}
          <AccordionTrigger className="relative ">
            <div className="flex items-center gap-4 pl-1">
              
              <div className="w-8 h-10">
                  <svg viewBox="0 0 24 36" className="w-full h-full">
                    {/* Pin base */}
                    <path
                      d="M12 0C7 0 3 4 3 9c0 6 9 21 9 21s9-15 9-21c0-5-4-9-9-9z"
                      fill="#22c55e"
                    />
                
                    {/* House */}
                    <path
                      d="M8 8.5 L12 4.5 L16 8.5 V13.5 H8 Z"
                      fill="white"
                    />
                    <rect x="10" y="10.5" width="4" height="3" fill="#22c55e" />
                
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
              <div className=" font-semibold overflow-hidden  text-xs 450:text-sm  flex items-center gap-1 hover:underline max-w-[60px] 450:max-w-[70px] md:max-w-[80px] 986:max-w-[140px]">
                {props.name}
                <ChevronDown className="h-4 w-4 text-neutral-500" />
              </div>
            <div className="flex flex-col  535:flex-row md:flex-col 986:flex-col 1150:flex-row   gap-2 items-center justify-center">
                  <div className=" text-xs  text-white/70 no-underline! [text-decoration:none] " >
                       {props.stayFrom
                       ? new Date(props.stayFrom).toLocaleDateString("en-GB", {
                           month: "2-digit",
                           day: "2-digit",
                         })
                       : "N/A"}
                    </div>  
                    <div className="  h-1 flex items-center justify-center" >
                       <div>
                        -
                       </div>
                     </div>
                      <div className="  text-xs text-white/70 no-underline! [text-decoration:none] " >
                      {props.stayUntil
                        ? new Date(props.stayUntil).toLocaleDateString("en-GB", {
                            month: "2-digit",
                            day: "2-digit",
                          })
                        :  "N/A"} 
                      </div> 
                </div>
                {props.entryPrice  &&
                (props.entryPrice > 0 ? (
                  <div className="mt-2 flex items-center justify-between">
                    <div className="flex flex-col">
                      <div className="flex items-center gap-1">
                        <span className="text-xs opacity-60">🏨</span>
                        <span className="text-sm font-medium text-white/70">
                          ${props.entryPrice}/night
                        </span>
                      </div>
              
                      <span className="text-[9px] text-white/40">
                        Est. accommodation
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="text-sm font-semibold text-emerald-300 opacity-60">
                    Free stay
                  </div>
                ))}
              </div>
            
            <Deleteplacebtn placeId={props.id} pointId={props.pointId} />
          </AccordionTrigger>

          {/* ---------------- CONTENT ---------------- */}
          <AccordionContent className="pb-4 " >
            <div className="p-4 flex flex-col gap-4 max-w-[500px]">
              {/* CHECK-IN / CHECK-OUT */}
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col">
                  <label className="text-xs text-white">Check In</label>
                  <AbleDatesDropdown
                    value={checkIn}
                    startDate={props.ablestayFrom ?? ""}
                    endDate={props.ablestayUntil ?? ""}
                    onChange={(v) => {
                      setCheckIn(v);
                      setIsDirty(true);
                    }}
                  />
                </div>

                <div className="flex flex-col">
                  <label className="text-xs text-white">Check Out</label>
                  <AbleDatesDropdown
                    value={checkOut}
                    startDate={props.ablestayFrom ?? ""}
                    endDate={props.ablestayUntil ?? ""}
                    onChange={(v) => {
                      setCheckOut(v);
                      setIsDirty(true);
                    }}
                  />
                </div>
              </div>

              {/* COST (optional) */}
              <div className="py-1 flex flex-col gap-4 max-w-[500px] ">
              {/* CHECK-IN / CHECK-OUT */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col ">
                      <label className="text-xs text-white ">Cost</label>
                      <AddExpenseDialog connectedToId={props.internalId} budgedId={props.budgetid} fromAllExpenses={true} fromItinerary />             
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
                  placeholder="Check-in instructions,host contact…"
                  value={notes}
                  showLabel={false}
                  fromItinerary
                  onChange={(v: string) => {
                    setNotes(v);
                    setIsDirty(true);
                  }}
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
                        Book Here
                          <RiExternalLinkLine className=' text-lg'/>
                      </Button>
                    </a>
                  )} 

              {/* SAVE */}
              {isDirty && (
                <div className="flex justify-end gap-2 items-center">
                  {error && (
                    <p className="text-sm text-red-500">{error}</p>
                  )}
                      <Button
                      className="bg-[#0356BC] hover:bg-[#0466D9] text-white border border-white/10 shadow-lg
                 shadow-blue-950/40 px-4 py-2 rounded-xl font-medium transition-all duration-200 active:scale-[0.98]"
                        onClick={(e) => {
                          e.stopPropagation(); 
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
