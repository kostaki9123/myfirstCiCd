
import React from 'react'
import { HiDotsHorizontal } from "react-icons/hi";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Dropdowncontent from './dropdowncontent';

type props = {
  pointIndex : number
  pointslength : number
  pointId : string 
  tripId : string
}

const Actionsmenu = (props : props) => {

  return (

    <DropdownMenu >
        <DropdownMenuTrigger asChild className=' cursor-pointer bg-white/10 rounded-md p-1  text-sm'>
             <HiDotsHorizontal className=' text-xl z-10 '/>
        </DropdownMenuTrigger>
        <Dropdowncontent tripId={props.tripId} pointIndex={props.pointIndex} pointId={props.pointId} pointslength={props.pointslength} />
    </DropdownMenu>



   
  )
}

export default Actionsmenu