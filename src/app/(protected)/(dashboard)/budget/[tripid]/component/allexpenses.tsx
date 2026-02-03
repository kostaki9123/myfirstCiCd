import React from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import AddExpenseDialog from "./expenseDialog"
import { getBudgetByTripId, getExpensesByBudgetId } from "../action"
import DeleteExpenseButton from "./DeleteExpenseButton"

type Expense = {
  id: string
  description: string
  category: string
  amount: number
  expenseCurrency: string
  connectedToId?: string
}

type Props = {
  budgedId: string
  tripId: string
}

const Allexpenses = async (props :Props) => {
  if (!props.budgedId) return
   <div className='bg-[#ACA7CB] overflow-y-auto relative rounded-md p-2'>
     <p>No budget selected</p>
   </div>

  let expenses: Expense[] = []
  
  let budgetId

  try {
    
    const rawExpenses = await getExpensesByBudgetId(props.budgedId)

    // Map raw data to match the Expense type
    expenses = rawExpenses.map((e: any) => ({
      id: e.id ?? "", // make sure id is always a string
      description: e.description,
      category: e.category,
      amount: e.amount,
      expenseCurrency: e.expenseCurrency,
      connectedToId: e.connectedToId ?? undefined, // optional
    }))
  } catch (err) {
    console.error("❌ Error fetching expenses:", err)
  }

  return (
    <div className='bg-[#ACA7CB] overflow-y-auto relative rounded-md p-2 base:row-start-3 base:row-end-4 base:col-start-1 base:col-end-2 535:row-start-2 535:row-end-3 535:col-start-1 535:col-end-3 986:row-start-5 986:row-end-9 986:col-start-1 986:col-end-3 lg:col-start-1 lg:787:col-end-3 xl:col-start-1 xl:col-end-3'>
      <h4 className="bg-[#ACA7CB] scroll-m-20 text-xl font-semibold tracking-tight z-10">
        Expenses
      </h4>

      <AddExpenseDialog budgedId={props.budgedId}  />

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Description</TableHead>
            <TableHead>Category</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow> 
        </TableHeader>

        <TableBody>
          {expenses.map((expense) => (
            <TableRow key={expense.id}>
              <TableCell className="font-medium">{expense.description}</TableCell>
              <TableCell>{expense.category}</TableCell>
              <TableCell className="text-right">
                {expense.amount.toLocaleString(undefined, {
                  style: "currency",
                  currency: expense.expenseCurrency,
                })}
              </TableCell>
              <TableCell className="text-center">
                 <DeleteExpenseButton
                   expenseId={expense.id}
                   budgetId={props.budgedId}
                 />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default Allexpenses
