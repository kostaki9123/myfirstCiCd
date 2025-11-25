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
import Deletebtn from './deletebtn'
import { MovePoint } from '../../action'


type props = {
  pointId: string;
  tripId: string;
  pointIndex: number;
  pointslength: number; 
}

const Dropdowncontent = ({ pointId, tripId, pointIndex, pointslength }: props) => {

  console.log('point index ww',pointIndex)

  
  const handleMove = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  const formData = new FormData(e.currentTarget); // extract data from form

  const newIndex = formData.get("newIndex"); // <-- get input value here

  const sendData = new FormData();
  sendData.append("tripId", tripId);
  sendData.append("pointId", pointId);
  sendData.append("newIndex", String(newIndex));

  try {
    console.log('runn1')
    await MovePoint(sendData);
  } catch (err) {
    console.error("Move error:", err);
  }
};

  return (
    <Dialog>
        <DropdownMenuContent className="w-56  rounded-md">
              <DropdownMenuLabel className=' w-[240px] py-[6px] pr-4 text-center'>Actions List</DropdownMenuLabel>
             
              <DropdownMenuGroup>
                 <DialogTrigger>       
                    <DropdownMenuItem className=' w-[240px] py-[6px] px-3 ' >
                       Move cyrcle  
                    </DropdownMenuItem>
                 </DialogTrigger>
                 <DropdownMenuItem className=' w-[240px] py-[6px] px-3 '>
                     <Deletebtn pointId={pointId}/>
                 </DropdownMenuItem>
    
              </DropdownMenuGroup>
       </DropdownMenuContent>



  <DialogContent className=' h-fit w-[60%] 360:w-[50%]  600:w-auto min-w-[250px]  426::w-fit    p-4    z-50  text-black  '>
        <form onSubmit={handleMove} className="space-y-4" >
        
              <DialogTitle>
                Move cyrcle
              </DialogTitle>
            
                <div className="flex flex-col space-y-1.5 600:min-w-[350px] py-6 ">
                    <Input
                       name="newIndex" 
                       type="number"
                       min={1}
                       max={pointslength}
                       defaultValue={pointIndex}
                     />
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