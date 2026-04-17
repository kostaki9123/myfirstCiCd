import React from 'react'
import {  SignedIn, SignedOut, SignInButton} from "@clerk/nextjs";
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Humburger from './humburger';
import UserAvatarWithLoading from './UserAvatarWithLoading';
import Ded from './ded';
import Image from 'next/image';


type props = {
  withtripname? : boolean
  withManageTripbtn? : boolean
  withoutHumburger? : boolean
} 

const  Navbar =  (props : props) => {
 // const expensiveAI = await allowExpensiveAI();

  return (
    <div className= 'h-14 fixed bg-[#010038] top-0 left-0 right-0  justify-center flex   items-center z-[51] md:min-w-screen shadow-lg'>
          

       <div className='absolute left-0 min-w-fit h-full flex  text-white  '> 
           {props.withoutHumburger ?
            <></>
           :<Humburger/>
           }
           <Link
                href="/"
                className="relative w-[200px] md:ml-5 flex justify-center items-center "
              >
                <Image
                  src="/ChatGPT Image 10 Μαρ 2026, 04_35_50 μμ.png"
                  alt="Trip Planner Logo"
                  width={90}
                  height={90}
                  className="object-contain mt-2 absolute left-0 md:left-3"
                />
              
                <h3 className="mt-1 text-xl font-semibold tracking-tight text-white absolute left-16 md:left-20">
                  Tripaki
                </h3>
             </Link>
           {props.withtripname &&
             <Ded/>
           }
       </div>

        <div className=" ml-[210px] 343:ml-0  343:absolute top-0 right-0 flex h-full items-center justify-around base:pl-36 150:pl-36 200:pl-28 255:pl-16  290:pl-10 343:px-6 text-white " >

           <div className=' hidden md:flex w-[158px] h-full  items-center justify-center   '>
             {props.withManageTripbtn ? 
              <Link href="/" >
                <Button className=' bg-zinc-600'> Manage Trips</Button>
              </Link>
              :
              <></>
              }
            </div>

   <SignedOut >
  <div className="hidden md:flex gap-4 items-center ">
    
    {/* Sign In */}
    <SignInButton>
      <span className="cursor-pointer px-4 py-2 rounded-lg text-white font-medium 
                       hover:bg-white/10 transition-colors duration-200">
        log in
      </span>
    </SignInButton>

    {/* Sign Up */}
    <Link href={"/sign-up"}>
    
      <span className="cursor-pointer px-4 py-2 rounded-lg bg-sky-600 text-white font-semibold 
                       hover:bg-sky-700 transition-colors duration-200">
        Sign up
      </span>
  
   </Link>
  </div>
</SignedOut>
         
            <div className='w-11  flex items-center justify-center h-full '>
              <SignedIn>                     
                    <UserAvatarWithLoading/>    
              </SignedIn>
            </div>
            
        </div>
    </div>
  )
}

export default Navbar