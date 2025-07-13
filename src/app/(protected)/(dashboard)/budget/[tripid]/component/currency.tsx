import React from 'react'
import { FaEuroSign } from "react-icons/fa6";
import { IoIosArrowDown } from "react-icons/io";


const Currency = () => {
  return (
    <div className='bg-[#ACA7CB] p-2  rounded-md relative   base:row-start-6 base:row-end-7 base:col-start-1 base:col-end-2       535:row-start-3 535:row-end-4 535:col-start-2 535:col-end-3     986:row-start-5 986:row-end-9 986:col-start-3 986:col-end-4   lg:row-start-5 lg:row-end-9 lg:col-start-3 lg:col-end-4   xl:row-start-5 xl:row-end-9 xl:col-start-4 xl:col-end-5 '>
         <h4 className="scroll-m-20 text-xl font-semibold tracking-tight ">
           Currency
         </h4>
     
         <div className=' flex flex-col items-center justify-center gap-7 absolute bottom-2 left-2 top-9 right-2' >
            <div className='  w-[100px] flex items-center justify-center '>
                  <FaEuroSign fontSize={24} />
            </div>
            <div className=' cursor-pointer border-2 flex justify-center gap-2 border-black w-[80px] py-1 '>
                  <div>EUR</div> 
                  <div className=' py-1'>
                     <IoIosArrowDown/>
                  </div> 
            </div>
         </div>
    </div>
  )
}

export default Currency