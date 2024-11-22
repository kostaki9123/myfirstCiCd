import React, { ReactNode } from 'react'
import Navbar from '../component-custom/bars/navbar'
import Sidebar from '../component-custom/bars/sidebar'


type props = {
    children : ReactNode
}

const DashboardLayout = ({children} : props) => {

   

  return (
    <div className=' min-h-screen '>
       <Navbar withManageTripbtn withtripname/>
       <Sidebar/>
       <div className='fixed  top-20 right-0 bottom-0 left-0  md:left-64 '>
       {children} 
       </div>
    </div>
  ) 
}

export default DashboardLayout