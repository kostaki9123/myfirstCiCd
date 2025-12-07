import React from 'react'
import Itineraryboard from './components/itineraryboard';
import { getPoints } from '../../createtrip/[tripid]/action';


interface PageProps {
  params: Promise<{ tripid: string }>; // ✅ params is now async
}

const Page = async ({ params }: PageProps) => {
  const { tripid } = await params; 

  console.log("Server-side ID from itinerary:", tripid); 

  const points = await getPoints(tripid);

  console.log('Itinerary points',points);


  return (
    <div className=' h-full bottom-0 absolute right-0 left-0  flex border-4 border-yellow-600 min-w-[344px] '>
      <div className=' h-[100%] 950:w-[53%] w-[100%]  block  bg-lime-500 ' >
         <Itineraryboard cyrclesArr={points} />
      </div>
      <div className=' h-[100%]  w-[47%]   950:block hidden bg-slate-500 ' >
           google map                           
      </div>
    </div>
  )
}

export default Page