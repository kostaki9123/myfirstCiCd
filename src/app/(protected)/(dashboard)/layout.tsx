import Navbar from '@/app/component-custom/bars/navbar'
import Sidebar from '@/app/component-custom/bars/sidebar'
import React, { ReactNode } from 'react'
import { getTrip } from '../action';



 interface props {
  params: Promise<{ tripid: string }>;
  children : ReactNode // ✅ params is now async
}

const DashboardLayout = async ({ children ,params }: props) => {

  const { tripid } = await params;
  
  const trip = await getTrip(tripid);


  return (
    <div className=' h-screen relative '>
       <Navbar withManageTripbtn withtripname tripName={trip.tripName}/>
       <Sidebar/>
       <div className=' bg-white top-14 absolute md:left-56 left-0 right-0 bottom-0 '>
       {children} 
       </div>
    </div>
  ) 
}

export default DashboardLayout