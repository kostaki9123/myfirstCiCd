'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import DatePicker from 'react-datepicker'
import DateRangePicker from './locationinput/datepicker'

const Createmovingboxform = () => {
    const clientaction = async (formData : FormData) => {
  }
  

  return (
     <>
 
    <form
      action={clientaction}
      className="w-full m-1 "
    >
      <p className="leading-7 [&:not(:first-child)]:mt-6 text-gray-600 text-sm pb-3">
      The place cyrcle represent a city,town or village you will stay.
      </p>

      <Label>From</Label>
        <Input placeholder="Places autocomplete" className=" placeholder:text-sm"  />
      <Label>To</Label>
        <Input placeholder="Places autocomplete" className=" placeholder:text-sm"  />
      <Label>By</Label>
        <Input placeholder="Places autocomplete" className=" placeholder:text-sm"  />
      <Label>Departure Date</Label>
        <DateRangePicker />   
      <Label>Arrival time</Label>
        <DateRangePicker onlyTime/>    
      <div className="  rounded-sm z-50 " >
      
      </div>
      <div className=' h-14 flex justify-center items-end '>
          <Button type='submit' className='right-0 ml-4'>Create place cyrcle</Button>
       </div>
    </form>
     
    </>
  ) 
}

export default Createmovingboxform