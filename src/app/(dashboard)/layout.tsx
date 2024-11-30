import React, { ReactNode } from 'react'
import Navbar from '../component-custom/bars/navbar'
import Sidebar from '../component-custom/bars/sidebar'


type props = {
    children : ReactNode
}

const DashboardLayout = ({children} : props) => {

   

  return (
    <div className=' min-h-[612px]  '>
       <Navbar withManageTripbtn withtripname/>
       <Sidebar/>
       <div className=' top-20 absolute md:left-64 left-0 right-0 min-h-[532px]  '>
       {children} 
       </div>
    </div>
  ) 
}

export default DashboardLayout