'use client'

import React, { useState, useEffect } from 'react'
import { FaEuroSign } from "react-icons/fa6";
import CurrencyDropdown from './currencydropdown';
import { updateBudget } from '../action'; // your server action
import { CURRENCIES } from '@/lib/currency';

type Props = {
  budgetId: string
  Currency: string
}

const Currency = ({ budgetId, Currency }: Props) => {
  const [currency, setCurrency] = useState(Currency)
  const [isLoading, setIsLoading] = useState(false)

  /* ---------------- CALL ACTION WHEN CURRENCY CHANGES ---------------- */
  useEffect(() => {
    if (currency === Currency) return // skip initial render

    const updateCurrency = async () => {
      try {
        setIsLoading(true)

        const formData = new FormData()
        formData.append("genCurrency", currency)

        await updateBudget(budgetId, formData)
        // optional: show a toast "Currency updated"
      } catch (err) {
        console.error("Failed to update currency:", err)
      } finally {
        setIsLoading(false)
      }
    }

    updateCurrency()
  }, [currency, budgetId, Currency])

   const currencysymbol = CURRENCIES.filter(
      (c : any) => c.code === Currency
    )
  

  return (
    <div className='bg-[#ACA7CB] p-2 rounded-md relative base:row-start-5 base:row-end-6 base:col-start-1 base:col-end-2 535:row-start-3 535:row-end-4 535:col-start-2 535:col-end-3 986:row-start-5 986:row-end-9 986:col-start-3 986:col-end-4 lg:row-start-5 lg:row-end-9 lg:col-start-3 lg:col-end-4 xl:row-start-5 xl:row-end-9 xl:col-start-4 xl:col-end-5'>
      <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
        Currency
      </h4>

      <div className='flex flex-col items-center justify-center gap-4 absolute bottom-2 left-2 top-9 right-2'>
        <div className='w-[100px] h-[40px] text-2xl flex items-center justify-center '>
          {currencysymbol?.[0].symbol}
        </div>

        <div className='cursor-pointer flex justify-center gap-2  w-[80px] py-1'>
          <CurrencyDropdown 
            setCurrency={setCurrency} 
            value={currency} 
            fromGeneralCurrency={true} 
          />
        </div>

        {isLoading && <p className="text-sm text-gray-600">Updating…</p>}
      </div>
    </div>
  )
}

export default Currency
