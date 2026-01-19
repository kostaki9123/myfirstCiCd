import React from 'react'

const Amounts = () => {
  return (
    <div className='bg-[#ACA7CB] p-2 rounded-md relative   base:row-start-1 base:row-end-2 base:col-start-1 base:col-end-2    535:row-start-1 535:row-end-2 535:col-start-1 535:col-end-2    986:row-start-1 986:row-end-5 986:col-start-1 986:col-end-2  '>
           <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
             Amounts
           </h4>

           <div className='  flex  absolute bottom-2 top-8 left-2 right-2 flex-col items-center justify-center gap-[30px] 986:gap-[10px] '>
                <div  className='flex h-[70px] w-[50%] flex-col border-dashed border-2 border-gray-500 rounded-sm'  >
                     <div className='flex h-[35%] w-full pt-[3px] pl-[9px] text-gray-500 font-normal'  >Expenses</div>
                     <div className='flex h-[35%] w-full pb-[10px] mt-2 text-black items-start justify-center font-medium' >$1750</div>
                </div>
               
           </div>
           
       </div>
  )
}

export default Amounts