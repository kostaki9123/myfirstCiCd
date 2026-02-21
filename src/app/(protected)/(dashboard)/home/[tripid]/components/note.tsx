"use client"

import NotesBox from '@/app/component/notes/edittextarea'
import { Button } from '@/components/ui/button'
import React, { useState } from 'react'
import { z } from 'zod'
import { updatePlace } from '../../../itinerary/[tripid]/action'

type props = {
    internalId: string; 
    notes : string | null | undefined
}


const updateSchema = z.object({
  notes: z.string().nullable(),
});

const Notes = (props:props) => {
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
    
        fd.append("internalId", props.internalId);
        fd.append("notes", d.notes ?? "");
    
        try {
          await updatePlace(fd);
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
     placeholder="Opening hours, ticket info, best time to visit…"
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

export default Notes