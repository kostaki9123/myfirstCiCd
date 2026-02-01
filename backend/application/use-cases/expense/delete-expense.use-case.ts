import { ExpenseRepository } from "../../../infrastructure/repository/expense.repository"
import { MockExpenseRepository } from "../../../infrastructure/repository/expense.repository.mock"
import { BudgetsRepository } from "../../../infrastructure/repository/budget.repository"
import { MockBudgetsRepository } from "../../../infrastructure/repository/budget.repository.mock"
import { DatabaseOperationError } from "../../../entities/errors/common"
import { IExpenseRepository } from "../../repositories/expense.repository"
import { IBudgetsRepository } from "../../repositories/budget.repository"
import { convertCurrency } from "../../../infrastructure/services/convert-currency"
 // your currency conversion helper

type Props = {
  expenseId: string
  budgetId: string
}

export type IDeleteExpenseUseCase = ReturnType<typeof deleteExpenseUseCase>

export const deleteExpenseUseCase = async (input: Props) => {
  // 1️⃣ Choose repositories based on environment
  const expenseRepository: IExpenseRepository =
    process.env.NODE_ENV === "test"
      ? new MockExpenseRepository()
      : new ExpenseRepository()

  const budgetRepository: IBudgetsRepository =
    process.env.NODE_ENV === "test"
      ? new MockBudgetsRepository()
      : new BudgetsRepository()

  try {
    // 2️⃣ Get the expense to know its amount & currency
    const expense = await expenseRepository.getExpensesFromId(input.expenseId)
    if (!expense) throw new DatabaseOperationError(`Expense ${input.expenseId} not found`)

    // 3️⃣ Get the budget
    const budget = await budgetRepository.getBudget(input.budgetId)
    if (!budget) throw new DatabaseOperationError(`Budget ${input.budgetId} not found`)

    // 4️⃣ Convert expense amount to budget currency if needed
    let amountToSubtract = expense.amount
    if (expense.expenseCurrency !== budget.budgetCurrency) {
      amountToSubtract = await convertCurrency(
        expense.amount,
        expense.expenseCurrency,
        budget.budgetCurrency
      )
    }

    // 5️⃣ Update the budget amount
    const newBudgetAmount = (budget.Amount || 0) - amountToSubtract
    await budgetRepository.updateBudget(input.budgetId, {
      Amount: newBudgetAmount,
    })

    // 6️⃣ Delete the expense
    const result = await expenseRepository.deleteExpense(input.expenseId)

    return result
  } catch (err) {
    console.error(`❌ Error deleting expense ${input.expenseId}:`, err)
    throw new DatabaseOperationError(
      `Ops something went wrong: ${(err as Error).message}`
    )
  }
}
