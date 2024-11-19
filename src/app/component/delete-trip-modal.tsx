"use client"

import React, { useCallback, useState } from 'react'
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
import { MdOutlineDeleteOutline } from "react-icons/md";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { HiDotsHorizontal } from "react-icons/hi";


type props = {
  tripId : string
}

const DeleteAlertDialog = (props : props) => {
  const [open, setOpen] = useState(false);


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
         <AlertDialogAction >Delete</AlertDialogAction>
       </AlertDialogFooter>
     </AlertDialogContent>
   </AlertDialog>
  )
}

export default DeleteAlertDialog