import { getExpensesByBudgetId } from "../action"
import ExpensesChartClient from "./ExpensesChartclient"


type Expense = {
  id: string
  description: string
  category: string
  amount: number
  expenseCurrency: string
}

type Props = {
  budgetId: string
}

export default async function ExpensesChart({ budgetId }: Props) {
  if (!budgetId) return null

  const rawExpenses = await getExpensesByBudgetId(budgetId)

  const expenses: Expense[] = rawExpenses.map((e: any) => ({
    id: e.id ?? "",
    description: e.description,
    category: e.category,
    amount: e.amount,
    expenseCurrency: e.expenseCurrency,
  }))

  // Group by category
  const grouped: Record<string, number> = {}

  expenses.forEach((expense) => {
    grouped[expense.category] =
      (grouped[expense.category] || 0) + expense.amount
  })

  const labels = Object.keys(grouped)
  const data = Object.values(grouped)

  return (
    <ExpensesChartClient
      labels={labels}
      data={data}
    />
  )
}
