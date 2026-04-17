import Navbar from '@/app/component-custom/bars/navbar'
import Sidebar from '@/app/component-custom/bars/sidebar'
import React, { ReactNode } from 'react'

 interface props {
  params: Promise<{ tripid: string }>;
  children : ReactNode // ✅ params is now async
}

const DashboardLayout = async ({ children }: props) => {

  return (
    <div className=' h-screen relative '>
       <Navbar  withtripname={true} withManageTripbtn={true}/>
       <Sidebar/>
       <div className=' bg-white top-14 absolute md:left-56 left-0 right-0 bottom-0 '>
       {children} 
       </div>
    </div>
  ) 
}

export default DashboardLayout