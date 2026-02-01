import { IExpenseRepository } from "../../application/repositories/expense.repository"
import { DatabaseOperationError } from "../../entities/errors/common"
import { Expense, ExpenseInsert } from "../../entities/models/expense"

export class MockExpenseRepository implements IExpenseRepository {
  private expenses: Expense[] = []

  async createExpense(input: ExpenseInsert): Promise<Expense> {
    const newExpense: Expense = {
      id: crypto.randomUUID(),
      budgetId: input.budgetId,
      description: input.description,
      category: input.category,
      expenseCurrency: input.expenseCurrency,
      amount: input.amount,
      connectedToId: input.connectedToId ?? null,
    }

    this.expenses.push(newExpense)
    return newExpense
  }

  async getExpensesForBudget(budgetId: string): Promise<Expense[]> {
    return this.expenses.filter(
      (e) => e.budgetId === budgetId
    )
  }

  async getExpensesFromId(id: string): Promise<Expense | null> {
    const expense = this.expenses.find((e) => e.id === id)
      return expense ?? null
   }
  
   async getExpensesFromConnectedId(connectedId: string): Promise<Expense | null> {
     const expense = this.expenses.find((e) => e.connectedToId === connectedId)
      return expense ?? null
  }

 



  async updateExpense(
    expenseId: string,
    input: Partial<ExpenseInsert>,
    tx?: any
  ): Promise<Expense> {
    const index = this.expenses.findIndex(
      (e) => e.id === expenseId
    )

    if (index === -1) {
      throw new DatabaseOperationError(
        `Expense ${expenseId} not found`
      )
    }

    const existing = this.expenses[index]

    const updated: Expense = {
      ...existing,
      description: input.description ?? existing.description,
      category: input.category ?? existing.category,
      expenseCurrency:
        input.expenseCurrency ?? existing.expenseCurrency,
      amount: input.amount ?? existing.amount,
      connectedToId:
        input.connectedToId ?? existing.connectedToId,
    }

    this.expenses[index] = updated
    return updated
  }

  async deleteExpense(
    expenseId: string,
    tx?: any
  ): Promise<void> {
    const index = this.expenses.findIndex(
      (e) => e.id === expenseId
    )

    if (index === -1) {
      throw new DatabaseOperationError(
        `Expense ${expenseId} not found`
      )
    }

    this.expenses.splice(index, 1)
  }

  async deleteExpensesByBudgetId(
    budgetId: string
  ): Promise<void> {
    const initialLength = this.expenses.length

    this.expenses = this.expenses.filter(
      (e) => e.budgetId !== budgetId
    )

    if (this.expenses.length === initialLength) {
      throw new DatabaseOperationError(
        `No expenses found for budget ${budgetId}`
      )
    }
  }
}
