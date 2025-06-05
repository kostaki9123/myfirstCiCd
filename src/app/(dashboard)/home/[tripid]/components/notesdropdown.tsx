import React from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { BsThreeDots } from "react-icons/bs";

const Notesdropdown = () => {
  return (
      <DropdownMenu >
             <DropdownMenuTrigger className='absolute right-0 top-0 bottom-0  px-1 cursor-pointer  '>
          
                   <BsThreeDots className='   text-2xl h-full ' />
            
             </DropdownMenuTrigger>
             <DropdownMenuContent align='end'  side='bottom' className=' cursor-pointer  text-black mb-2 ' >
              
                 <DropdownMenuItem className=' cursor-pointer' >Edit</DropdownMenuItem>
                 <DropdownMenuItem className=' cursor-pointer' >Delete</DropdownMenuItem>
              
             </DropdownMenuContent>
     </DropdownMenu>
  )
}

export default Notesdropdown