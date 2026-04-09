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
import {
  createExpense,
  updateExpense,
  getExpensesByConnectedToId,
  getExpenseById, // 👈 YOU MUST HAVE THIS
} from '../action'
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
  description: z.string().min(1, 'Description is required').max(100),
  category: z.enum(EXPENSE_CATEGORIES),
  amount: z.number().positive('Amount must be greater than 0'),
  expenseCurrency: z.enum(CURRENCIES),
})

/* ---------------------------------- */
/* props */
/* ---------------------------------- */

type Props = {
  budgedId: string
  connectedToId?: string
  expenseId?: string // 👈 for table edit
  fromItinerary?: boolean
  fromAllExpenses?: boolean
}

/* ---------------------------------- */
/* component */
/* ---------------------------------- */

const ExpenseDialog = ({
  budgedId,
  connectedToId,
  expenseId,
  fromItinerary,
  fromAllExpenses,
}: Props) => {
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isFetching, setIsFetching] = useState(false)

  const [expense, setExpense] = useState<Expense | null>(null)

  const [amount, setAmount] = useState<number | ''>('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [currency, setCurrency] = useState('USD')

  const [errors, setErrors] = useState<Record<string, string>>({})

  console.log('ddd',expenseId)
  /* ---------------------------------- */
  /* fetch existing expense */
  /* ---------------------------------- */
  useEffect(() => {
    if (!open) return

    const fetchExpense = async () => {
      try {
        setIsFetching(true)

        let data: Expense | null = null

        if (connectedToId) {
          data = await getExpensesByConnectedToId(connectedToId)
        } else if (expenseId) {
          data = await getExpenseById(expenseId)
        }

        if (data) {
          setExpense(data)
          setAmount(data.amount ?? '')
          setDescription(data.description ?? '')
          setCategory(data.category ?? '')
          setCurrency(data.expenseCurrency ?? 'USD')
        }
      } catch (err) {
        console.error('Failed to fetch expense', err)
      } finally {
        setIsFetching(false)
      }
    }

    fetchExpense()
  }, [open, connectedToId, expenseId])

  /* ---------------------------------- */
  /* reset when modal closes */
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
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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

    // skip if no changes
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

    const fd = new FormData()
    fd.append('description', payload.description)
    fd.append('category', payload.category)
    fd.append('amount', payload.amount.toString())
    fd.append('expenseCurrency', payload.expenseCurrency)
    fd.append('budgedId', budgedId)

    if (connectedToId) fd.append('connectedToId', connectedToId)

    try {
      setIsLoading(true)
      setErrors({})

      if (expense?.id || expenseId) {
        await updateExpense(expense?.id || expenseId!, fd)
      } else {
        await createExpense(fd)
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
        className={`rounded-lg ${
          fromItinerary
            ? 'text-gray-700 hover:bg-gray-100 bg-white py-2 flex items-center justify-center gap-2 px-2'
            : expenseId
            ? 'text-blue-600 text-sm hover:underline'
            : 'absolute top-2 right-2 px-2 bg-[#ACA7CB]'
        }`}
      >
        {fromItinerary ? (
          <>
            <MdOutlineAttachMoney className="text-xl text-blue-600" />
            <span>Add cost</span>
          </>
        ) : expenseId ? (
          'Edit'
        ) : (
          '+'
        )}
      </DialogTrigger>

      <DialogContent className="w-[300px] text-black rounded-lg sm:max-h-[90%] p-1">
        <form onSubmit={handleSubmit}>
          <Card>
            <CardHeader>
              <DialogTitle>
                {expense || expenseId ? 'Update Expense' : 'Add Expense'}
              </DialogTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              {isFetching ? (
                <div className="flex justify-center items-center h-32">
                  <span className="text-gray-500">Loading...</span>
                </div>
              ) : (
                <>
                  {/* Amount */}
                  <div>
                    <Label>Amount</Label>
                    <div className="relative flex items-center">
                      <Input
                        type="number"
                        step="0.01"
                        value={amount}
                        onChange={(e) =>
                          setAmount(e.target.value === '' ? '' : Number(e.target.value))
                        }
                        className="pl-[60px]"
                      />
                      <div className="absolute">
                        <CurrencyDropdown
                          fromGeneralCurrency={!fromItinerary}
                          fromAllExpenses={fromAllExpenses}
                          value={currency}
                          setCurrency={setCurrency}
                        />
                      </div>
                    </div>
                    {errors.amount && (
                      <p className="text-red-500 text-sm">{errors.amount}</p>
                    )}
                  </div>

                  {/* Description */}
                  <div>
                    <Label>Description</Label>
                    <Input
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
                    />
                    {errors.category && (
                      <p className="text-red-500 text-sm">{errors.category}</p>
                    )}
                  </div>

                  {/* General error */}
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
                {isLoading
                  ? expense || expenseId
                    ? 'Updating...'
                    : 'Creating...'
                  : expense || expenseId
                  ? 'Update Expense'
                  : 'Add Expense'}
              </Button>
            </CardFooter>
          </Card>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default ExpenseDialog