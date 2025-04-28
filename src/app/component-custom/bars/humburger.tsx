import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import Link from 'next/link'
import React from 'react'

const Humburger = () => {
  return (
    <DropdownMenu>
        <DropdownMenuTrigger className='text-white md:hidden my-2 mx-2 px-5 text-xl '>☰</DropdownMenuTrigger>
        <DropdownMenuContent align='start'  side='bottom' className=' cursor-pointer  md:hidden  bg-[#010038] text-white mb-2' >
          <Link href='/home/233' >
            <DropdownMenuItem className=' cursor-pointer' >Home</DropdownMenuItem>
          </Link>
          <Link href='/createtrip/233' >
            <DropdownMenuItem className=' cursor-pointer' >Create trip</DropdownMenuItem>
          </Link>
          <Link  href='/itinerary/233'>
             <DropdownMenuItem className=' cursor-pointer'>Itinerary</DropdownMenuItem>
          </Link>
          <Link href='/budget/233'>
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