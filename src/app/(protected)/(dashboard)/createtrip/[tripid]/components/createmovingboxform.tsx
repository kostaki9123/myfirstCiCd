'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import DatePicker from 'react-datepicker'
import DateRangePicker from './locationinput/datepicker'
import PlaceSearchWrapper from './locationinput/locationinput'

const Createmovingboxform = () => {
    const clientaction = async (formData : FormData) => {
  }
  

  return (
     <>
 
    <form
      action={clientaction}
      className="w-full m-1 "
    >
     <p className="leading-7 [&:not(:first-child)]:mt-6 text-gray-600 text-xs md:text-sm pb-3 450:whitespace-nowrap ">
         The moving box represents your journey between places.
     </p>
      <Label>From</Label>
         <PlaceSearchWrapper onMovingbox={true} apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API!}/>
      <Label>To</Label>
         <PlaceSearchWrapper onMovingbox={true} apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API!}/>
      <Label>By</Label>
        <Input placeholder="by" className=" placeholder:text-sm"  />
      <Label>Departure Date</Label>
        <div className=' relative ' >
          <DateRangePicker />   
        </div>
      <Label>Arrival time</Label>
         <Input placeholder="time" className=" placeholder:text-sm"  />
   
      <div className="  rounded-sm z-50 " >
      
      </div>
      <div className=' h-14 flex justify-center items-end '>
          <Button type='submit' className='right-0 ml-4'>Create moving cyrcle</Button>
       </div>
    </form>
     
    </>
  ) 
}

export default Createmovingboxform