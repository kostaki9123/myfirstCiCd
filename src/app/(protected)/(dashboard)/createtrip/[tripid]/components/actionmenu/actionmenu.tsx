
import React from 'react'
import { HiDotsHorizontal } from "react-icons/hi";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
//import Deletbtn from './deletbtn';
//import Movepoint from './movepoint';import { Label } from '@/components/ui/label';
import Dropdowncontent from './dropdowncontent';

type props = {
  pointId : string 
}

const Actionsmenu = (props : props) => {

  const onSubmit = () => {

  }

  return (

    <DropdownMenu >
        <DropdownMenuTrigger asChild className=' cursor-pointer h-full w-full text-sm'>
             <HiDotsHorizontal className=' text-xl z-10'/>
        </DropdownMenuTrigger>
        <Dropdowncontent pointId={props.pointId} />
    </DropdownMenu>



   
  )
}

export default Actionsmenu