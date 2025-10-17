"use client"

import { cn } from "@/lib/utils"
//import { Calendar } from "@/components/ui/calendar"
import { Button } from '@/components/ui/button'
import {  useState } from 'react'
import {z } from 'zod'
//import { Form,FormField,FormItem,FormLabel,FormDescription,FormControl,FormMessage } from '@/components/ui/form'
//import { Popover,PopoverTrigger,PopoverContent } from '@/components/ui/popover'
//import { useForm } from 'react-hook-form'
//import { zodResolver } from '@hookform/resolvers/zod'
//import { CalendarIcon } from '@radix-ui/react-icons'
//import { addDays, format } from "date-fns"
//import { DateRange } from "react-day-picker"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

import DatePicker from "react-datepicker"
import DatePickerExample from "./locationinput/datepicker"
import PlaceSearchWrapper from "./locationinput/locationinput"
//import Places from "./locationinput/loadinginput"
//import { createcyrcleplace, CyrcleArr } from "./actions"

type maposT = {
  lat : string
  lng : string
}

const formSchema = z.object({
  place: z.string().min(1, {
    message: "You must enter a place",
  }),
  dates: z.object({
    startdate: z.string({message : "You must enter a valid date"}),
    enddate: z.string({message : 'You must enter a valid date'}),
  })
});

type props = {
  index : number 
  tripId : string
  cyrcleArrId : string | undefined
  setDialog : React.Dispatch<React.SetStateAction<boolean>>;
}

const Createplaceform = () => {
  const [placeId1 , setplaceId1] = useState<string>()
  const [mapos , setMapos] = useState<maposT>()
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const clientaction = async (formData : FormData) => {
  }
  



  return (
    <>
 
    <form
      action={clientaction}
      className="w-full m-1"
    >
      <p className="leading-7 [&:not(:first-child)]:mt-6 text-gray-600 text-sm pb-5">
      The place cyrcle represent a city,town or village you will stay.
      </p>

      <Label >Place</Label>
         <PlaceSearchWrapper onMovingbox={false} apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API!}/>
       { /**  <Input placeholder="Places autocomplete" className=" placeholder:text-sm"  /> */}
        
      <Label>Dates</Label> 
      <div className="  rounded-sm z-50 " >
        <DatePickerExample isRange />   
      </div>
      <div className=' h-14 flex justify-center items-end '>
          <Button type='submit' className='right-0 ml-4'>Create place cyrcle</Button>
       </div>
    </form>
     
    </>
  )
}

export default Createplaceform