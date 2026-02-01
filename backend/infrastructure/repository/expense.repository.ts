import prisma from "../../../prisma/client"
import { Expense, ExpenseInsert } from "../../entities/models/expense"
import { DatabaseOperationError } from "../../entities/errors/common"
import { IExpenseRepository } from "../../application/repositories/expense.repository"

export class ExpenseRepository implements IExpenseRepository {

  async createExpense(insert: ExpenseInsert): Promise<Expense> {
    try {
      return await prisma.expense.create({
        data: {
          budgetId: insert.budgetId,
          description: insert.description,
          category: insert.category,
          expenseCurrency: insert.expenseCurrency,
          amount: insert.amount,
          connectedToId: insert.connectedToId ?? null,
        },
      })
    } catch (err: any) {
      if (err.code === "P2002") {
        throw new DatabaseOperationError(
          "This expense already exists for this budget"
        )
      }
      throw new DatabaseOperationError("Expense could not be created")
    }
  }

  async getExpensesFromId(id: string): Promise<Expense | null> {
    return prisma.expense.findFirst({
       where: { id : id },
    })
 }

  async getExpensesForBudget(budgetId: string): Promise<Expense[]> {
    return prisma.expense.findMany({
      where: { budgetId },
      orderBy: { id: "asc" },
    })
  }

  async getExpensesFromConnectedId(ConnectedId: string): Promise<Expense | null> {
    return prisma.expense.findFirst({
       where: { connectedToId : ConnectedId },
    })
  }

  async updateExpense(
    expenseId: string,
    input: Partial<ExpenseInsert>,
    tx?: any
  ): Promise<Expense> {
    const client = tx ?? prisma

    try {
      return await client.expense.update({
        where: {
          id: expenseId,
        },
        data: {
          description: input.description,
          category: input.category,
          expenseCurrency: input.expenseCurrency,
          amount: input.amount,
          connectedToId: input.connectedToId ?? null,
        },
      })
    } catch {
      throw new DatabaseOperationError(
        `Expense ${expenseId} not found`
      )
    }
  }

  async deleteExpense(
    expenseId: string,
    tx?: any
  ): Promise<void> {
    const client = tx ?? prisma

    try {
      await client.expense.delete({
        where: {
          id: expenseId,
        },
      })
    } catch {
      throw new DatabaseOperationError(
        `Expense ${expenseId} not found`
      )
    }
  }

  async deleteExpensesByBudgetId(
    budgetId: string
  ): Promise<void> {
    try {
      await prisma.expense.deleteMany({
        where: {
          budgetId,
        },
      })
    } catch {
      throw new DatabaseOperationError(
        `Expenses not deleted for budgetId: ${budgetId}`
      )
    }
  }
}
