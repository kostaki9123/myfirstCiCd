'use client'

import React, { useEffect, useState } from 'react'
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
import { MdOutlineAttachMoney } from 'react-icons/md'
import { createExpense, updateExpense, getExpensesByConnectedToId } from '../action'
import { Expense } from '../../../../../../../backend/entities/models/expense'

/* ---------------------------------- */
/* constants */
/* ---------------------------------- */

const EXPENSE_CATEGORIES = [
  'Flights','Lodging','Car rental','Transit','Food','Drinks','Sightseeing',
  'Activities','Shopping','Gas','Groceries','Other',
] as const

const CURRENCIES = [
  'USD','EUR','GBP','JPY','AUD','CAD','CHF','CNY','INR','KRW','SGD','HKD',
  'NZD','MXN','BRL','ZAR','SEK','NOK','DKK','PLN','TRY','THB','IDR','MYR',
  'PHP','VND','AED','SAR','ILS','EGP',
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
  budgedId: string
  connectedToId?: string
  fromItinerary?: boolean
}

/* ---------------------------------- */
/* component */
/* ---------------------------------- */

const AddExpenseDialog = ({ budgedId, connectedToId, fromItinerary }: Props) => {
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isFetching, setIsFetching] = useState(false) // NEW: data fetching state

  // Controlled states
  const [expense, setExpense] = useState<Expense | null>(null)
  const [amount, setAmount] = useState<number | ''>('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [currency, setCurrency] = useState('USD')
  const [errors, setErrors] = useState<Record<string, string>>({})

  /* ---------------------------------- */
  /* fetch existing expense */
  /* ---------------------------------- */
  useEffect(() => {
    if (!open || !connectedToId) return

    const fetchExpense = async () => {
      setIsFetching(true) // start fetching
      try {
        const data = await getExpensesByConnectedToId(connectedToId)
        setExpense(data)
        setAmount(data?.amount ?? '')
        setDescription(data?.description ?? '')
        setCategory(data?.category ?? '')
        setCurrency(data?.expenseCurrency ?? 'USD')
      } catch (err) {
        console.error('Failed to fetch expense', err)
      } finally {
        setIsFetching(false) // stop fetching
      }
    }

    fetchExpense()
  }, [open, connectedToId])

  /* ---------------------------------- */
  /* reset state when modal closes */
  /* ---------------------------------- */
  useEffect(() => {
    if (!open) {
      setExpense(null)
      setAmount('')
      setDescription('')
      setCategory('')
      setCurrency('USD')
      setErrors({})
    }
  }, [open])

  /* ---------------------------------- */
  /* submit */
  /* ---------------------------------- */
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const payload = {
      description: description.trim(),
      category,
      amount: Number(amount),
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

    // Skip backend call if no changes
    if (
      expense &&
      expense.description === payload.description &&
      expense.category === payload.category &&
      expense.amount === payload.amount &&
      expense.expenseCurrency === payload.expenseCurrency
    ) {
      setOpen(false)
      return
    }

    const actionFormData = new FormData()
    actionFormData.append('description', payload.description)
    actionFormData.append('category', payload.category)
    actionFormData.append('amount', payload.amount.toString())
    actionFormData.append('expenseCurrency', payload.expenseCurrency)
    actionFormData.append('budgedId', budgedId)
    if (connectedToId) actionFormData.append('connectedToId', connectedToId)

    try {
      setIsLoading(true)
      setErrors({})
      if (expense?.id) {
        await updateExpense(expense.id, actionFormData)
      } else {
        await createExpense(actionFormData)
      }
      setOpen(false)
    } catch {
      setErrors({ GeneralError: 'Failed to save expense' })
    } finally {
      setIsLoading(false)
    }
  }

  /* ---------------------------------- */
  /* render */
  /* ---------------------------------- */
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        className={`bg-[#ACA7CB] text-black rounded-lg ${
          fromItinerary
            ? 'text-gray-700 hover:bg-gray-100 active:scale-95 transition shadow-sm bg-white max-w-[202px] py-2 rounded-lg flex items-center justify-center'
            : 'absolute top-2 right-2 px-2 rounded-lg'
        }`}
      >
        {fromItinerary ? (
          <div className="flex justify-center items-center gap-2 pr-2">
            <MdOutlineAttachMoney className="text-xl text-blue-600" />
            <div>Add cost</div>
          </div>
        ) : (
          <>+</>
        )}
      </DialogTrigger>

      <DialogContent className="w-[300px] text-black rounded-lg p-0   sm:max-h-[90%] min-w-[262px] w-full sm:w-auto max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl p-1">
        <form onSubmit={handleSubmit}>
          <Card>
            <CardHeader>
              <DialogTitle>Add Expense</DialogTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              {isFetching ? (
                <div className="flex justify-center items-center h-32">
                  <span className="text-gray-500">Loading expense...</span>
                </div>
              ) : (
                <>
                  {/* Amount */}
                  <div>
                    <Label>Amount</Label>
                    <div className="relative flex items-center">
                      <Input
                        name="amount"
                        type="number"
                        step="0.01"
                        value={amount}
                        onChange={(e) =>
                          setAmount(e.target.value === '' ? '' : Number(e.target.value))
                        }
                        className="pl-[60px]"
                      />
                      <div className="absolute left-1">
                        <CurrencyDropdown
                          fromGeneralCurrency={!!fromItinerary}
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
                    <Input
                      name="description"
                      placeholder="e.g. Dinner"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
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
                </>
              )}
            </CardContent>

            <CardFooter className="flex justify-end">
              <Button
                type="submit"
                disabled={isLoading || isFetching || !category || !currency}
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
