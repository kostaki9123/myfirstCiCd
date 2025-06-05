import React from 'react'
import {  SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { allowExpensiveAI } from '@/app/flags/flags';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Humburger from './humburger';

type props = {
  withtripname? : boolean
  withManageTripbtn? : boolean
} 

const  Navbar = async (props : props) => {
  const expensiveAI = await allowExpensiveAI();

  return (
    <div className= 'h-20 fixed bg-[#010038] top-0 left-0 right-0    justify-center flex   items-center z-50 md:min-w-screen shadow-lg'>
          

       <div className='absolute left-0 min-w-fit h-full flex  text-white  '> 
           <Humburger/>

           <div className='md:w-[249px] w-[180px] justify-center items-center flex  '>
               <h3 className=" scroll-m-20 text-xl md:text-2xl font-semibold tracking-tight ">
                   Trip planner
               </h3>
           </div>
           {props.withtripname &&
           <div className='  justify-center items-center h-full hidden lg:flex '>
               <h4 className="scroll-m-20 text-xl font-semibold tracking-tight  ml-14">
              Demark-Germany-Belgium Trip
              </h4>
           </div>
           }
       </div>

      {/**  <header className="w-full py-6 text-center hidden lg:flex justify-center ">
        <h1 className="text-4xl font-bold tracking-wide text-white">
          {expensiveAI ? "My Trips" : "My Journeys"}
        </h1>
      </header>
      */}


        <div className=" ml-[210px] 343:ml-0  343:absolute top-0 right-0 flex h-full items-center justify-around base:pl-36 150:pl-36 200:pl-28 255:pl-16  290:pl-10 343:px-6 text-white " >

           <div className=' hidden md:flex w-[158px] h-full  items-center justify-center   '>
              <Link href="/" >
                <Button className=' bg-zinc-600'> Manage Trips</Button>
              </Link>
            </div>
        
            <SignedOut >
                <SignInButton />
            </SignedOut>
            <SignedIn  >
            <UserButton      
            appearance={{
              elements: {
                userButtonAvatarBox: "w-10 h-10" ,
              },
            }}
          />
            </SignedIn>
            
        </div>
    </div>
  )
}

export default Navbar