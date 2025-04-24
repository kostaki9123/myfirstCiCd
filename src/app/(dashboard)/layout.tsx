import React, { ReactNode } from 'react'
import Navbar from '../component-custom/bars/navbar'
import Sidebar from '../component-custom/bars/sidebar'


type props = {
    children : ReactNode
}

const DashboardLayout = ({children} : props) => {

   

  return (
    <div className=' min-h-screen relative  '>
       <Navbar withManageTripbtn withtripname/>
       <Sidebar/>
       <div className=' bg-white top-20 absolute md:left-64 left-0 right-0 bottom-0 min-h-[632px]  '>
       {children} 
       </div>
    </div>
  ) 
}

export default DashboardLayout