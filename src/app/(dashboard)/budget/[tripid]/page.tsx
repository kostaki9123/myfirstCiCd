import React from 'react'
import Amounts from './components/amount'
import Allexpenses from './components/allexpenses'
import Expenseschart from './components/expenseschart'
import Setbudgetamount from './components/setbudgetamount'
import Avgproductprice from './components/Avgpruductprice/avgproductprice'
import Currency from './components/currency'

const page = () => {
  return (
    
   
    <div className=' border-4 border-pink-700 min-w-[364px]  gap-[30px] p-[30px] grid  base:min-w-[300px] base:h-[1800px] base:grid-rows-6 base:grid-cols-1                  535:h-[1200px] 535:grid-rows-3 535:grid-cols-2        986:h-full 986:grid-rows-8 986:grid-cols-3        xl:min-w-[1020px] lg:grid-cols-3 xl:grid-cols-4 lg:border-2 lg:border-yellow-700 '>
      {/** Display amount component */}
      <Amounts/>

      {/** Chart component */}
      <Expenseschart/>

      {/**Set budget component */}
      <Setbudgetamount/>

      {/**All expense*/}
      <Allexpenses/> 

      {/**Avarage product price */}
      <div className='bg-[#ACA7CB] p-2 rounded-md overflow-hidden relative    base:row-start-5 base:row-end-6 base:col-start-1 base:col-end-2       535:row-start-3 535:row-end-4 535:col-start-1 535:col-end-2     986:row-start-1 986:row-end-5 986:col-start-3 986:col-end-4   lg:row-start-5 lg:row-end-9 lg:col-start-3 lg:col-end-4  '>omo</div>
       
      {/** Example static div to test scrolling */}
      <Currency/>
      
    </div>
  
  
  )
}

export default page