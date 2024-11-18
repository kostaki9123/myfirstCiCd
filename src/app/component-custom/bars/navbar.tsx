import React from 'react'
import {  SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { allowExpensiveAI } from '@/app/flags/flags';


const  Navbar = async () => {
  const expensiveAI = await allowExpensiveAI();
  return (
    <div className= 'h-20 absolute bg-[#010038] top-0 left-0 right-0 justify-center flex items-center z-50 min-w-[344px] shadow-lg'>
          

       <div className='absolute left-0 min-w-fit h-full flex  text-white '> 
           <div className='md:w-[249px] w-[180px] justify-center items-center flex  '>
               <h3 className=" scroll-m-20 text-xl md:text-2xl font-semibold tracking-tight ">
                   Trip planner
               </h3>
           </div>

       </div>

      {/**  <header className="w-full py-6 text-center hidden lg:flex justify-center ">
        <h1 className="text-4xl font-bold tracking-wide text-white">
          {expensiveAI ? "My Trips" : "My Journeys"}
        </h1>
      </header>
      */}


        <div className="absolute top-0 right-0 flex h-full items-center justify-around px-6 text-white " >
        
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