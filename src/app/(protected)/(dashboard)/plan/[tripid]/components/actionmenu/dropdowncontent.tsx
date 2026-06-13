"use client"

import { Dialog,DialogTrigger,DialogContent,DialogTitle } from '@/components/ui/dialog'
import {
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu"
import React, { useState }  from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Deletebtn from './deletebtn'
import { MovePoint } from '../../action'
import { CiCircleCheck } from 'react-icons/ci'


type props = {
  pointId: string;
  tripId: string;
  pointIndex: number;
  pointslength: number; 
}

const Dropdowncontent = ({ pointId, tripId, pointIndex, pointslength }: props) => {

    const [showUpdated, setShowUpdated] = useState(false);
  
  const handleMove = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  const formData = new FormData(e.currentTarget); // extract data from form

  const newIndex = formData.get("newIndex"); // <-- get input value here

  const sendData = new FormData();
  sendData.append("tripId", tripId);
  sendData.append("pointId", pointId);
  sendData.append("newIndex", String(newIndex));



  try {
    await MovePoint(sendData);
     setShowUpdated(true);

      setTimeout(() => {
        setShowUpdated(false);
      }, 3000);
  } catch (err) {
  }
};

  return (
    <Dialog>
        <DropdownMenuContent className="w-56  rounded-md">
              <DropdownMenuLabel className=' w-[240px] py-[6px]  text-start'>Actions List</DropdownMenuLabel>
             
              <DropdownMenuGroup>
                 <DialogTrigger>       
                    <DropdownMenuItem className=' w-[240px] py-[6px] px-3 cursor-pointer ' >
                       Move cyrcle  
                    </DropdownMenuItem>
                 </DialogTrigger>
                 <DropdownMenuItem className=' w-[240px] min-h-[30px] relative '>
                     <Deletebtn pointId={pointId} tripId={tripId}/>
                 </DropdownMenuItem>
    
              </DropdownMenuGroup>
       </DropdownMenuContent>



  <DialogContent className='  z-[52]  bg-[#07124F]/95 border border-white/10 text-white sm:max-h-[90%] min-w-[262px] w-full sm:w-auto max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl p-4 '>
        <form onSubmit={handleMove} className="space-y-4" >
        
              <DialogTitle >
                Move cyrcle
              </DialogTitle>
            
                <div className="flex flex-col space-y-1.5 600:min-w-[350px] py-6  ">
                    <Input
                       name="newIndex" 
                       type="number"
                       min={1}
                       max={pointslength}
                       defaultValue={pointIndex}
                     />
                </div>
                {showUpdated && (
                          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 rounded-xl  bg-white/10 backdrop-blur-md px-4 py-2 text-green-200 shadow-lg">
                              <CiCircleCheck
                                className="text-green-400"
                                size={20}
                              />
                            
                              <div className="text-sm font-medium">
                                Moved successfully
                              </div>
                           </div>
                    )}
              <div className='flex justify-end' >
                  <Button className='bg-[#0356BC] hover:bg-[#0466D9] text-white border border-white/10 shadow-lg shadow-blue-950/40 px-4 py-2 rounded-xl font-medium transition-all duration-200 active:scale-[0.98]' type="submit">Move</Button>
              </div>
              
        
        </form>
         
    </DialogContent>
  </Dialog>
  )
}

export default Dropdowncontent