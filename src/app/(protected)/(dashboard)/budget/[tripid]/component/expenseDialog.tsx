'use client'

import React, { useState } from 'react'
import { z } from 'zod'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import ExpenseCategorydropdown from './expensecategorydropdown'
import CurrencyDropdown from './currencydropdown'
import { MdOutlineAttachMoney } from "react-icons/md";
import { createExpense } from '../action'
// import { createExpense } from '../actions/createExpense'

/* ---------------------------------- */
/* constants */
/* ---------------------------------- */

const EXPENSE_CATEGORIES = [
  "Flights",
  "Lodging",
  "Car rental",
  "Transit",
  "Food",
  "Drinks",
  "Sightseeing",
  "Activities",
  "Shopping",
  "Gas",
  "Groceries",
  "Other",
] as const

const CURRENCIES = [
  "USD", "EUR", "GBP", "JPY", "AUD", "CAD", "CHF", "CNY",
  "INR", "KRW", "SGD", "HKD", "NZD", "MXN", "BRL", "ZAR",
  "SEK", "NOK", "DKK", "PLN", "TRY", "THB", "IDR", "MYR",
  "PHP", "VND", "AED", "SAR", "ILS", "EGP",
] as const

/* ---------------------------------- */
/* schema */
/* ---------------------------------- */

const expenseSchema = z.object({
  description: z.string().min(1).max(100),
  category: z.enum(EXPENSE_CATEGORIES),
  amount: z.number().positive(),
  expenseCurrency: z.enum(CURRENCIES),
})

/* ---------------------------------- */
/* props */
/* ---------------------------------- */

type Props = {
  tripId : string
  budgedId: string
  connectedToId?: string
  fromItinerary? : boolean
}

/* ---------------------------------- */
/* component */
/* ---------------------------------- */

const AddExpenseDialog = ({
  budgedId,
  connectedToId,
  fromItinerary,
  tripId
}: Props) => {
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const [category, setCategory] = useState('')
  const [currency, setCurrency] = useState('USD')
  const [errors, setErrors] = useState<Record<string, string>>({})


  async function handleSubmit(formData: FormData) {
    const payload = {
      description: formData.get('description')?.toString().trim(),
      category,
      amount: Number(formData.get('amount')),
      expenseCurrency: currency,
    }

    const validation = expenseSchema.safeParse(payload)

    if (!validation.success) {
      const flat = validation.error.flatten().fieldErrors
      setErrors({
        description: flat.description?.[0] || '',
        category: flat.category?.[0] || '',
        amount: flat.amount?.[0] || '',
        expenseCurrency: flat.expenseCurrency?.[0] || '',
      })
      return
    }

    /* ---------------------------------- */
    /* FormData → backend action */
    /* ---------------------------------- */

    const actionFormData = new FormData()
    ;
    actionFormData.append('description', validation.data.description)
    actionFormData.append('category', validation.data.category)
    actionFormData.append('amount', validation.data.amount.toString())
    actionFormData.append('expenseCurrency', validation.data.expenseCurrency)
    actionFormData.append('budgedId', budgedId)
    actionFormData.append('tripId', tripId)

    if (connectedToId) {
      actionFormData.append('connectedToId', connectedToId)
    }

    try {
      setIsLoading(true)
      setErrors({})
    
       await createExpense(actionFormData)

      setOpen(false)
    } catch {
      setErrors({ GeneralError: 'Failed to create expense' })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className={`bg-[#ACA7CB] text-black rounded-lg ${fromItinerary ? 'text-gray-700 hover:bg-gray-100 active:scale-95 transition shadow-sm bg-white max-w-[202px] py-2 rounded-lg flex items-center justify-center  '  :'absolute top-2 right-2  px-2 rounded-lg' }`}>
        {fromItinerary ?
          <div className='flex justify-center items-center gap-2 pr-2 ' > 
            <MdOutlineAttachMoney className='text-xl text-blue-600  ' />
             <div  >Add cost </div>
          </div> 
          : 
          <>+</> 
          }
      </DialogTrigger>

      <DialogContent className="w-[300px] h-fit text-black rounded-lg p-0">
        <form
          onSubmit={async (e) => {
            e.preventDefault()
            await handleSubmit(new FormData(e.currentTarget))
          }}
        >
          <Card>
            <CardHeader>
              <DialogTitle>Add Expense</DialogTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Amount + Currency */}
              <div>
                <Label>Amount</Label>
                <div className="relative flex items-center">
                  <Input
                    name="amount"
                    type="number"
                    step="0.01"
                    className="pl-[60px]"
                  />
                  <div className="absolute left-1">
                    <CurrencyDropdown
                      fromGeneralCurrency={fromItinerary ? true : false}
                      value={currency}
                      setCurrency={setCurrency}
                    />
                  </div>
                </div>
                {errors.amount && <p className="text-red-500 text-sm">{errors.amount}</p>}
              </div>

              {/* Description */}
              <div>
                <Label>Description</Label>
                <Input name="description" placeholder="e.g. Dinner" />
                {errors.description && (
                  <p className="text-red-500 text-sm">{errors.description}</p>
                )}
              </div>

              {/* Category */}
              <div>
                <Label>Category</Label>
                <ExpenseCategorydropdown
                  value={category}
                  setExpenseCategory={setCategory}
                  placeholder="Select category"
                />
                {errors.category && (
                  <p className="text-red-500 text-sm">{errors.category}</p>
                )}
              </div>

              {errors.GeneralError && (
                <p className="text-red-500 text-sm">{errors.GeneralError}</p>
              )}
            </CardContent>

            <CardFooter className="flex justify-end">
              <Button
                type="submit"
                disabled={isLoading || !category || !currency}
              >
                {isLoading ? 'Saving...' : 'Add Expense'}
              </Button>
            </CardFooter>
          </Card>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default AddExpenseDialog
