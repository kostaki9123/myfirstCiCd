import Navbar from '@/app/component-custom/bars/navbar'
import Sidebar from '@/app/component-custom/bars/sidebar'
import React, { ReactNode } from 'react'



type props = {
    children : ReactNode
}

const DashboardLayout = ({children} : props) => {

   

  return (
    <div className=' h-screen relative '>
       <Navbar withManageTripbtn withtripname/>
       <Sidebar/>
       <div className=' bg-white top-14 absolute md:left-56 left-0 right-0 bottom-0  border-2 border-lime-600   '>
       {children} 
       </div>
    </div>
  ) 
}

export default DashboardLayout