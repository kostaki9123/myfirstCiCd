import React from 'react'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { FaNotesMedical } from "react-icons/fa6";

const Sheetnotes = () => {
  return (
 
     <Sheet>
            <SheetTrigger className=" absolute  top-2 right-2 cursor-pointer p-2   text-xl " ><FaNotesMedical/></SheetTrigger>
            <SheetContent  autoFocus={false}  >
              <SheetHeader>
                <SheetTitle>Are you absolutely sure?</SheetTitle>
                <SheetDescription>
                  This action cannot be undone. This will permanently delete your account
                  and remove your data from our servers.
                </SheetDescription>
              </SheetHeader>
            </SheetContent> 
    </Sheet>  

  )
}

export default Sheetnotes