import { ExpenseRepository } from "../../../infrastructure/repository/expense.repository"
import { MockExpenseRepository } from "../../../infrastructure/repository/expense.repository.mock"
import { IExpenseRepository } from "../../repositories/expense.repository"

type Props = {
  budgetId: string
}

export type IGetExpensesByBudgetIdUseCase = ReturnType<typeof getExpensesByBudgetIdUseCase>

export const getExpensesByBudgetIdUseCase = async (input: Props) => {
  // 1️⃣ Choose repository
  const expenseRepository: IExpenseRepository =
    process.env.NODE_ENV === "test"
      ? new MockExpenseRepository()
      : new ExpenseRepository()

  // 2️⃣ Get expenses
  return await expenseRepository.getExpensesForBudget(input.budgetId)
}
