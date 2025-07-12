import React from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { IoIosArrowDown } from "react-icons/io";
import Link from 'next/link';


type props = {

cyrclesArr : any
selectedPlacceId? : string
}

const Placesdropdown = (props : props) => {
  return (
    <DropdownMenu >
    <DropdownMenuTrigger asChild className='   cursor-pointer h-full w-fit text-sm   left-0  xxl:relative    '>      
       <div className=" cursor-pointer flex justify-center items-center scroll-m-20 text-lg sm:text-xl  font-semibold tracking-tight gap-2 ">
           <div className='scroll-m-20  font-semibold tracking-tight'>
            {props.selectedPlacceId ?
             props.cyrclesArr.map((cyrcle : any , key : number)=>
               
                <div key={key}>
                   {cyrcle.id === props.selectedPlacceId &&
                    <>{cyrcle.location}</>
                   }
                </div>
             ) 
             :
            props.cyrclesArr[0].location}
            </div>
           <IoIosArrowDown />
       </div>
    </DropdownMenuTrigger>
    <DropdownMenuContent className="w-56  rounded-md">
    <DropdownMenuLabel className=' w-[240px] py-[6px] pr-4 text-center'>Places</DropdownMenuLabel>
    <DropdownMenuSeparator /> 
       {props.cyrclesArr.map((cyrcle :any , key : number) => 
       cyrcle.role === "POINT" &&
      <Link key={key} href={`/dashboard/itinerary/?placeId=${cyrcle.id}`}>
           <DropdownMenuItem className=' w-[240px] py-[6px] px-3 '>
            {cyrcle.location}
           </DropdownMenuItem>
      </Link>  
    )}
        
    </DropdownMenuContent>
</DropdownMenu>

  )
}

export default Placesdropdown