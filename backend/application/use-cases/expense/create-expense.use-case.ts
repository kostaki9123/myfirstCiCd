import { Expense, ExpenseInsert } from "../../../entities/models/expense"
import { ExpenseRepository } from "../../../infrastructure/repository/expense.repository"
import { MockExpenseRepository } from "../../../infrastructure/repository/expense.repository.mock"
import { IExpenseRepository } from "../../repositories/expense.repository"
import { IBudgetsRepository } from "../../repositories/budget.repository"
import { MockBudgetsRepository } from "../../../infrastructure/repository/budget.repository.mock"
import { BudgetsRepository } from "../../../infrastructure/repository/budget.repository"

type Props = ExpenseInsert

export type ICreateExpenseUseCase = ReturnType<typeof createExpenseUseCase>

export const createExpenseUseCase = async (
  input: Props
): Promise<Expense> => {
  // 1️⃣ Choose repositories
  const expenseRepository: IExpenseRepository =
    process.env.NODE_ENV === "test"
      ? new MockExpenseRepository()
      : new ExpenseRepository()

  const budgetRepository: IBudgetsRepository =
    process.env.NODE_ENV === "test"
      ? new MockBudgetsRepository()
      : new BudgetsRepository()

  try {
    /* ---------------- CREATE EXPENSE ---------------- */
    const createdExpense = await expenseRepository.createExpense(input)

    if (!createdExpense) {
      throw new Error("Expense could not be created")
    }

    /* ---------------- GET BUDGET ---------------- */
    const budget = await budgetRepository.getBudget(input.budgetId)

    if (!budget) {
      throw new Error(`Budget ${input.budgetId} not found`)
    }

    
    return createdExpense
  } catch (err) {
    throw new Error(
      `Ops something went wrong: '${(err as Error).message}'`
    )
  }
}
