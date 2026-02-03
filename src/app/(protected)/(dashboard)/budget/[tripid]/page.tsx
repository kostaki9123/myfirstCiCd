import React from 'react'
import Amounts from './component/amount'
import Expenseschart from './component/expenseschart'
import Setbudgetamount from './component/setbudgetamount'
import Allexpenses from './component/allexpenses'
import Currency from './component/currency'
import { getPoints } from '../../createtrip/[tripid]/action'
import Avgproductprice from './component/Avgpruductprice/avgproductprice'
import TripBudgetCard from './component/Avgpruductprice/avgproductprice'
import { getBudgetByTripId } from './action'


const page = async ({
  params,
}: {
  params: Promise<{ tripid: string }>;
}) => {

    const { tripid } = await params;

    const points = await getPoints(tripid);
    const pointsOnly = points.filter((p) => p.role === 'POINT');

    const budget = await getBudgetByTripId(tripid)

     

  return (
    
   
    <div className='  bg-white min-w-[364px]  gap-[30px] p-[30px] grid  base:min-w-[300px] base:h-[1500px] base:grid-rows-5 base:grid-cols-1                  535:h-[1000px] 535:grid-rows-3 535:grid-cols-2     986:h-full 986:grid-rows-8 986:grid-cols-3        xl:min-w-[1020px] lg:grid-cols-3 xl:grid-cols-4 lg:border-2 lg:border-yellow-700 '>
      {/** Display amount component */}
      <Amounts budgedAmount={budget.Amount} budgetCurrecy={budget.genCurrency}/>

      {/** Chart component */}
      <Expenseschart budgetId={budget.id!} />

      {/**Set budget component */}
      <Setbudgetamount budgetId={budget.id!} budgedCurrency={budget.genCurrency} budgetAmount={budget.budgetAmount}/>

      
      <Allexpenses budgedId={budget.id!} tripId={tripid}/> 
      
      {/**Avarage product price */}
      <TripBudgetCard pointsArr={pointsOnly} /> 
      {/** Example static div to test scrolling */}
      <Currency budgetId={budget.id!} Currency={budget.genCurrency}/>
      
    </div>
  
  
  )
}

export default page