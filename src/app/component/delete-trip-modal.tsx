"use client"

import React, {  useState } from 'react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { deleteTrip } from '../(protected)/action'



type props = {
  tripId : string
}

const DeleteAlertDialog = (props : props) => {
  const [open, setOpen] = useState(false);

  function onSubmit(
  ) {
    return async () => {

      try {
            
         await deleteTrip(props.tripId);
         setOpen(false);
         return;

      } catch (err) {
         if (err instanceof Error && err.name === "DatabaseOperationError") {
            
         }
      //    setErrorMessage(err.message); 
         console.error("Unexpected error:", err);
       }
    };
  }


  return (
    <AlertDialog>
     <AlertDialogTrigger asChild>
          <div className=" px-4 py-2 text-[#f87171] border border-[#f87171] rounded-lg hover:bg-[#f87171] hover:text-white transition cursor-pointer">
                Delete
          </div>
     </AlertDialogTrigger>
     <AlertDialogContent>
       <AlertDialogHeader>
         <AlertDialogTitle>Confirm delete</AlertDialogTitle>
         <AlertDialogDescription>
           Are you sure you want to delete this trip?
         </AlertDialogDescription>
       </AlertDialogHeader>
       <AlertDialogFooter>
         <AlertDialogCancel>Cancel</AlertDialogCancel>
         <form action={onSubmit()}>
           <AlertDialogAction type='submit'>
               Delete
           </AlertDialogAction>
         </form>
       </AlertDialogFooter>
     </AlertDialogContent>
   </AlertDialog>
  )
}

export default DeleteAlertDialog