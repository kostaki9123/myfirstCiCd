import React from 'react'
import Mapprovider from '@/app/component/map/map-provider';
import Tripboard from './components/tripboard';
import Tripboardphone from './components/tripboardphone';
import { getPoints } from './action';
import Navbar from '@/app/component-custom/bars/navbar';
import { getTrip } from '@/app/(protected)/action';


interface PageProps {
  params: Promise<{ tripid: string }>; // ✅ params is now async
}

const Page = async ({ params }: PageProps) => {
  const { tripid } = await params; 

  console.log("Server-side ID:", tripid); 

    const points = await  getPoints(tripid)
     
    console.log('ποιντσ',points);


  return (
     <div className=' min-h-[490px] xxs:border-4 bg-gray-500  bottom-0 absolute right-0 left-0 top-0  flex flex-col '>
        <div className=' h-[45%]  xxs:block hidden    ' >
           <Tripboard  tripId={tripid} cyrclesArr={points} />
        </div>
        <div className=' h-[55%]  w-full xxs:block hidden bg-slate-500  ' >
             <Mapprovider cyrclesArr={points} /> 
        </div>

       
       
        <div  className='  h-[43%] block xxs:hidden '>
           <Tripboardphone  tripId={tripid} cyrclesArr={points} />
        </div>
    </div>
  )
}

export default Page