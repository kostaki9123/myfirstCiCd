"use client"

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import React from 'react'
import { RiArrowDropDownLine } from 'react-icons/ri'
//  import { Doughnut } from 'react-chartjs-2';

const Setbudgetamount = () => {

  const userData = {
    labels: [
      'Red',
      'Blue',
    ],
    datasets: [{
      label: 'My First Dataset',
      data: [300, 100],
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
      ],
      hoverOffset: 4
    }]
  };  
  


  return (
    <div className=' bg-[#ACA7CB] rounded-md p-2 relative    base:row-start-2 base:row-end-3 base:col-start-1 base:col-end-2         535:row-start-1 535:row-end-2 535:col-start-2 535:col-end-3         986:row-start-1 986:row-end-5 986:col-start-2 986:col-end-3      lg:col-start-2 lg:787:col-end-3   xl:col-start-4 xl:col-end-5 '>
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight ">
          Budget
        </h4>

      {/**   <div  className='  border-2 border-lime-600 flex items-center justify-center p-3  absolute top-11 bottom-2 left-2 right-2 ' >
              <Doughnut className=' border-2 border-lime-600' data={userData}/> 
        </div>
      */}

      {/**   <div className=' flex items-center justify-center p-3  absolute top-11 bottom-2 left-2 right-2 ' >
             <Button>Set budget</Button>
        </div>
      */}
      <div  className='  flex flex-col p-3  absolute top-11 bottom-2 left-2 right-2 ' >

             <div className='h-1/2 flex justify-center items-end pb-2 relative'>
                 <div className=' relative '>
                    <Input className=' w-[160px] pl-[59px]' />
                    <div className=' pl-1 absolute   left-0 bottom-0 top-0 w-[60px] flex items-center cursor-pointer'>
                        EUR
                        <RiArrowDropDownLine fontSize={20}/>
                    </div>
                 </div>
              </div>    

             <div className=' h-1/2 flex justify-center gap-3 items-start pt-2'>
                  <Button className='w-[89px]' variant="destructive"   >Cancel</Button>
                  <Button className='w-[56px]'>Set</Button>
             </div>              
      </div>
        
        
    </div>
)
}

export default Setbudgetamount