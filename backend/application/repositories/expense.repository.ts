import { Expense, ExpenseInsert } from "../../entities/models/expense"

export interface IExpenseRepository {
  // Create expense
  createExpense(insert: ExpenseInsert): Promise<Expense>

  // Get all expenses for a budget
  getExpensesForBudget(budgetId: string): Promise<Expense[]>

  getExpensesFromConnectedId(ConnectedId: string): Promise<Expense | null>

  getExpensesFromId(id: string): Promise<Expense | null>

  // Update expense using expense internalId
  updateExpense(
    expenseId: string,
    input: Partial<ExpenseInsert>,
    tx?: any
  ): Promise<Expense>

  // Delete expense using expense internalId
  deleteExpense(
    expenseId: string,
    tx?: any
  ): Promise<void>

  // Delete all expenses for a budget
  deleteExpensesByBudgetId(
    budgetId: string
  ): Promise<void>
}
