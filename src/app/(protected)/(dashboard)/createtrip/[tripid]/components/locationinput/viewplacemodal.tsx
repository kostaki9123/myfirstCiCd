import React from 'react'
import { IoMdAdd } from "react-icons/io";

const ViewPlaceMoadal = () => {
  return (
    <div className='  820:h-fit  flex flex-col 820:flex-row overflow-y-auto justify-start items-center gap-5 '>
      
       <div className='  h-60 flex-grow flex  items-center justify-center   relative px-0'>

          <h4 className="scroll-m-20 text-base  font-semibold tracking-tight text-center absolute top-0">
             Accomodation
          </h4>

          
          <div className=' rounded-md border-2 border-gray-500 border-dashed flex items-center justify-center flex-col gap-3 py-3 cursor-pointer'>
              <div className='gray-500 rounded-full bg-gray-500 text-white h-20 w-20 flex items-center  justify-center  '>
                   <IoMdAdd fontSize="27px"/>
              </div>
              <p className=' text-gray-500 text-center font-medium  w-3/4  '>
                Add A Place To Stay
              </p>
           </div>
          
       </div>

       <div className='  h-60 flex-grow  flex items-center justify-center  relative'>
          <h4 className="scroll-m-20 text-base  font-semibold tracking-tight text-center absolute top-0">
             Places
          </h4>

          <div className=' rounded-md border-2 border-gray-500 border-dashed flex items-center justify-center flex-col gap-3 py-3 cursor-pointer'>
              <div className='gray-500 rounded-full bg-gray-500 text-white h-20 w-20 flex items-center  justify-center  '>
                   <IoMdAdd fontSize="27px"/>
              </div>
              <p className=' text-gray-500 text-center font-medium  w-3/4  '>
                Add A Places To visit
              </p>
           </div>

       </div>
      

</div> 
  )
}

export default ViewPlaceMoadal