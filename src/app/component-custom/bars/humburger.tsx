'use client'

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const Humburger = () => {
   const pathname = usePathname()
    
      console.log("pathname humburger",pathname)
      const id = pathname.split("/").pop();
      console.log(id);
    // Sidebar items
   

  return (
    <DropdownMenu>
        <DropdownMenuTrigger className='text-white md:hidden my-2 mx-2 px-5 text-xl '>☰</DropdownMenuTrigger>
        <DropdownMenuContent align='start'  side='bottom' className=' cursor-pointer  md:hidden  bg-[#010038] text-white mt-1 z-[60]' >
          <Link href={`/home/${id}`} >
            <DropdownMenuItem className=' cursor-pointer' >Home</DropdownMenuItem>
          </Link>
          <Link href={`/createtrip/${id}`} >
            <DropdownMenuItem className=' cursor-pointer' >Create trip</DropdownMenuItem>
          </Link>
          <Link  href={`/itinerary/${id}`}>
             <DropdownMenuItem className=' cursor-pointer'>Itinerary</DropdownMenuItem>
          </Link>
          <Link href={`/budget/${id}`}>
             <DropdownMenuItem className=' cursor-pointer'>Budget</DropdownMenuItem>
          </Link>
          <Link href='/'>
              <DropdownMenuItem className=' cursor-pointer'>Manage trips</DropdownMenuItem>
          </Link>
        </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default Humburger