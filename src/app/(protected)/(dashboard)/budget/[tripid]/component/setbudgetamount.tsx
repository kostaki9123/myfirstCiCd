"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import React, { useState } from "react"
import CurrencyDropdown from "./currencydropdown"
import { updateBudget } from "../action"

type Props = {
  budgedCurrency: string
  budgetAmount: number
  budgetId: string
}

const Setbudgetamount = ({
  budgedCurrency,
  budgetAmount,
  budgetId,
}: Props) => {
  const [currency, setCurrency] = useState(budgedCurrency)
  const [amount, setAmount] = useState<number>(budgetAmount)
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const [savedBudget, setSavedBudget] = useState<{
    amount: number
    currency: string
  } | null>(
    budgetAmount
      ? { amount: budgetAmount, currency: budgedCurrency }
      : null
  )

  /* ---------------------------------- */
  /* submit to action */
  /* ---------------------------------- */
  const handleSetBudget = async () => {
    const formData = new FormData()
    formData.append("budgetAmount", amount.toString())
    formData.append("budgetCurrency", currency)

    try {
      setIsLoading(true)

      await updateBudget(budgetId, formData)

      setSavedBudget({ amount, currency })
      setIsEditing(false)
    } catch (err) {
      console.error("Failed to update budget", err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancel = () => {
    if (savedBudget) {
      setAmount(savedBudget.amount)
      setCurrency(savedBudget.currency)
    }
    setIsEditing(false)
  }

  return (
    <div className="bg-[#ACA7CB] rounded-md p-2 relative base:row-start-2 base:row-end-3 base:col-start-1 base:col-end-2 535:row-start-1 535:row-end-2 535:col-start-2 535:col-end-3 986:row-start-1 986:row-end-5 986:col-start-2 986:col-end-3 lg:col-start-2 lg:787:col-end-3 xl:col-start-4 xl:col-end-5">
      <h4 className="text-xl font-semibold tracking-tight">Budget</h4>

      {/* -------- BEFORE (no budget) -------- */}
      {!isEditing && !savedBudget && (
        <div className="absolute inset-x-2 bottom-2 top-11 flex items-center justify-center">
          <Button onClick={() => setIsEditing(true)}>Set budget</Button>
        </div>
      )}

      {/* -------- VIEW MODE -------- */}
      {!isEditing && savedBudget && (
        <div className="absolute inset-x-2 bottom-2 top-11 flex flex-col items-center justify-center gap-2">
          <p className="text-lg font-medium">
            {savedBudget.currency} {savedBudget.amount}
          </p>
          <Button variant="outline" onClick={() => setIsEditing(true)}>
            Edit
          </Button>
        </div>
      )}

      {/* -------- EDIT MODE -------- */}
      {isEditing && (
        <div className="absolute inset-x-2 bottom-2 top-11 flex flex-col p-3">
          <div className="h-1/2 flex justify-center items-end pb-2 relative">
            <div className="relative">
              <Input
                className="w-[160px] pl-[59px]"
                type="number"
                defaultValue={amount} // controlled input
                onChange={(e) => setAmount(Number(e.target.value))}
              />
              <div className="pl-1 absolute left-0 top-0 bottom-0 w-[60px] flex items-center">
                <CurrencyDropdown
                  setCurrency={setCurrency}
                  value={currency}
                  fromSetBudget
                />
              </div>
            </div>
          </div>

          <div className="h-1/2 flex justify-center gap-3 items-start pt-2">
            <Button
              className="w-[89px]"
              variant="destructive"
              onClick={handleCancel}
              disabled={isLoading}
            >
              Cancel
            </Button>

            <Button
              className="w-[56px]"
              onClick={handleSetBudget}
              disabled={isLoading}
            >
              {isLoading ? "Saving…" : "Set"}
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Setbudgetamount
