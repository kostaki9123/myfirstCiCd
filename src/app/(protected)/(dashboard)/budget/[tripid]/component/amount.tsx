import { CURRENCIES } from '@/lib/currency'
import React from 'react'
import { getExpensesByBudgetId } from '../action'
import { Expense } from './expenseschart'
import { convertCurrency } from '../../../../../../../backend/infrastructure/services/convert-currency'

type Props = {
  budgetId: string
  genCur: string
  budgetAmount: number
  budgetCurrency: string
}

const Amounts = async ({
  budgetId,
  genCur,
  budgetAmount,
  budgetCurrency,
}: Props) => {
  if (!budgetId) return null

  const rawExpenses = await getExpensesByBudgetId(budgetId)

  const expenses: Expense[] = rawExpenses.map((e: any) => ({
    id: e.id ?? '',
    description: e.description,
    category: e.category,
    amount: e.amount,
    expenseCurrency: e.expenseCurrency,
  }))

  // ===============================
  // 1️⃣ TOTAL IN BUDGET CURRENCY (for logic)
  // ===============================
  const totalInBudgetCurrency = expenses.reduce((sum, e) => {
    if (!e.amount) return sum

    return (
      sum +
      convertCurrency(e.amount, e.expenseCurrency, budgetCurrency)
    )
  }, 0)

  // ===============================
  // 2️⃣ TOTAL IN GEN CUR (for display)
  // ===============================
  const totalInGenCurrency = expenses.reduce((sum, e) => {
    if (!e.amount) return sum

    return sum + convertCurrency(e.amount, e.expenseCurrency, genCur)
  }, 0)

  // ===============================
  // 3️⃣ REMAINING (based on budget currency)
  // ===============================
  const remaining = budgetAmount - totalInBudgetCurrency
  const isOverBudget = remaining < 0

  const currency = CURRENCIES.find((c) => c.code === genCur)
  const budgetCurrencySymbol = CURRENCIES.find(
    (c) => c.code === budgetCurrency
  )

  return (
    <div className="bg-[#ACA7CB] p-2 rounded-md relative base:row-start-1 base:row-end-2 base:col-start-1 base:col-end-2 535:row-start-1 535:row-end-2 535:col-start-1 535:col-end-2 986:row-start-1 986:row-end-5 986:col-start-1 986:col-end-2">

      <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
        Amounts
      </h4>

      <div className="flex absolute bottom-2 top-8 left-2 right-2 flex-col items-center justify-center gap-[30px] 986:gap-[10px]">

        {/* ================= EXPENSES (GEN CUR) ================= */}
        <div className="flex h-[70px] w-[50%] flex-col border-dashed border-2 border-gray-500 rounded-sm">
          <div className="flex h-[35%] w-full pt-[3px] pl-[9px] text-gray-500 font-normal">
            Total Expenses
          </div>
          <div className="flex h-[35%] w-full pb-[10px] mt-2 text-black items-start justify-center font-medium">
            {totalInGenCurrency.toFixed(2)} {currency?.symbol}
          </div>
        </div>

        {/* ================= BUDGET STATUS ================= */}
        {budgetAmount > 0 && (
          <>
            {isOverBudget ? (
              <div className="flex h-[70px] w-[50%] flex-col border-dashed border-2 border-gray-500 rounded-sm">
                <div className="flex h-[35%] w-full pt-[3px] pl-[9px] text-gray-500 font-normal">
                  Over budget by
                </div>
                <div className="flex h-[35%] w-full pb-[10px] mt-2 text-black items-start justify-center font-medium">
                  {Math.abs(remaining).toFixed(2)} {budgetCurrencySymbol?.symbol}
                </div>
              </div>
            ) : (
              <div className="flex h-[70px] w-[50%] flex-col border-dashed border-2 border-gray-500 rounded-sm">
                <div className="flex h-[35%] w-full pt-[3px] pl-[9px] text-gray-500 font-normal">
                  Remaining
                </div>
                <div className="flex h-[35%] w-full pb-[10px] mt-2 text-black items-start justify-center font-medium">
                  {remaining.toFixed(2)} {budgetCurrencySymbol?.symbol}
                </div>
              </div>
            )}
          </>
        )}

      </div>
    </div>
  )
}

export default Amounts