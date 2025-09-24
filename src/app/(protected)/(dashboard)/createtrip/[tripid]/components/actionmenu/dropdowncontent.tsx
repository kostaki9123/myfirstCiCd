"use client"

import { Dialog,DialogTrigger,DialogContent,DialogHeader,DialogTitle,DialogDescription, } from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import React, { useState } from 'react'
//import Deletbtn from './deletbtn'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'


type props = {
  cyrcleId : string 
}

const Dropdowncontent = (props:props) => {
   const [dialogtype , setDialogtype ] = useState<string>("")

  return (
    <Dialog>
        <DropdownMenuContent className="w-56  rounded-md">
              <DropdownMenuLabel className=' w-[240px] py-[6px] pr-4 text-center'>Actions List</DropdownMenuLabel>
             
              <DropdownMenuGroup>
                 <DialogTrigger>       
                    <DropdownMenuItem className=' w-[240px] py-[6px] px-3 ' onSelect={()=>setDialogtype("move cyrcle")}>
                       Move cyrcle  
                    </DropdownMenuItem>
                 </DialogTrigger>
                 <DropdownMenuItem className=' w-[240px] py-[6px] px-3 '>
                    Delete point
                   {/**   <Deletbtn cyrcleId={props.cyrcleId} /> */ }
                 </DropdownMenuItem>
    
              </DropdownMenuGroup>
       </DropdownMenuContent>



  <DialogContent className=' h-fit w-[60%] 360:w-[50%]  600:w-auto min-w-[250px]  426::w-fit   absolute p-4     z-50  text-black  '>
        <form className='  ' >
        
              <DialogTitle>
                Move cyrcle
              </DialogTitle>
            
                <div className="flex flex-col space-y-1.5 600:min-w-[350px] py-6 ">
                    <Input type="number"  defaultValue={0} min={0} max={5} ></Input>
                </div>
              <div className='flex justify-end' >
                  <Button type="submit">Move</Button>
              </div>
              
        
        </form>
         
    </DialogContent>
  </Dialog>
  )
}

export default Dropdowncontent