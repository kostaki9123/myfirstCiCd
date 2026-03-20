"use client"

import NotesBox from '@/app/component/notes/edittextarea'
import { Button } from '@/components/ui/button'
import React, { useState } from 'react'
import { z } from 'zod'
import { updatePlace } from '../../../itinerary/[tripid]/action'
import { updatePoint } from '../../../createtrip/[tripid]/action'

type props = {
    id: string
    tripId: string
    index : number
    notes : string | null | undefined
    fromName : string
    fromId : string
    fromAddress : string
    fromLat : string
    fromLng : string
    toName : string
    toId : string
    toAddress : string
    toLat : string
    toLng : string
    transportType : string
    departureDate : Date
}


const updateSchema = z.object({
     notes: z.string().nullable(),
});

const Pointnotes = (props:props) => {
    const [notes, setNotes] = useState(props.notes ?? "");
    const [isDirty, setIsDirty] = useState(false);
    const [error, setError] = useState<string | null>(null);

     const resetState = () => {
        setNotes(props.notes ?? "");
        setIsDirty(false);
        setError(null);
      };
    
      /* ------------------ SAVE ------------------ */
    
      const handleSave = async () => {
        setError(null);
    
        const validation = updateSchema.safeParse({
          notes,
        });
    
        if (!validation.success) {
          setError(validation.error.errors[0].message);
          return;
        }
    
        const d = validation.data;
        const fd = new FormData();
    
          console.log("notes", d.notes)
    
        fd.append("id", props.id ?? "");
        fd.append("tripId", props.tripId ?? "");
        fd.append("role",  "MOVING_BOX" );
        fd.append("index", props.index.toString() ?? "");
        
        fd.append("fromName", props.fromName);
        fd.append("fromId", props.fromId);
        fd.append("fromAddress", props.fromAddress);
        fd.append("fromLat", props.fromLat.toString());
        fd.append("fromLng", props.fromLng.toString());
        fd.append("toName", props.toName);
        fd.append("toId", props.toId);
        fd.append("toAddress", props.toAddress);
        fd.append("toLat", props.toLat.toString());
        fd.append("toLng", props.toLng.toString());
        fd.append("transportType", props.transportType);
        fd.append("departureDate", props.departureDate.toLocaleDateString("en-CA"));

        fd.append("notes", d.notes ?? "");
    
        try {
          console.log('runnig  ')
          await updatePoint(fd);
          setIsDirty(false);
        } catch {
          setError("Failed to update");
        }
      };
    

  return (
   <>
    <NotesBox
     value={notes}
     onChange={(v) => {
       setNotes(v);
       setIsDirty(true);
     }}
     placeholder="Flight details, departure time, terminal, booking info, useful links…"
     showLabel={false}
     fromItinerary={false}
     />
      {isDirty && (
          <div className="flex justify-end gap-2 items-center">
            {error && <p className="text-sm text-red-500">{error}</p>}
            <Button onClick={handleSave}>Save</Button>
          </div>
      )}
  </> 
  )
}

export default Pointnotes