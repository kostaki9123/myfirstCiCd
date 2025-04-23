"use client"

import React, { useState, useEffect, useRef } from 'react';
import { RiArrowDropDownLine } from 'react-icons/ri'
//import ReactCountryFlag from "react-country-flag"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';

const Avgproductdropdown = () => {
  const [open, setOpen] = useState<boolean>(false)

  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setOpen(open!);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const arr = [
    {"countryCode" : "cy"} ,
    {"countryCode" : "GR"} ,
    {"countryCode" : "DE"} , 
  ]



  return (

    <DropdownMenu>
    <DropdownMenuTrigger className=' absolute flex items-center top-2 z-50 right-2 h-7 w-9 cursor-pointer   select-none text-sm outline-none  '>
           { /* <ReactCountryFlag countryCode="US" svg /> **/}
          <RiArrowDropDownLine fontSize="20px"/>
    </DropdownMenuTrigger>
    <DropdownMenuContent className=' w-11 rounded-md bg-white z-50  overflow-hidden border bg-popover  text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2'  >
       {arr.map((obj , key) =>
       <DropdownMenuItem key={key} className=' h-7 relative flex text-base cursor-pointer justify-center select-none items-center outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50' >
         { /*    <ReactCountryFlag countryCode= {obj.countryCode}  svg  /> **/}
        </DropdownMenuItem>
        )}
     </DropdownMenuContent>
  </DropdownMenu>
   

  )
}

export default Avgproductdropdown
