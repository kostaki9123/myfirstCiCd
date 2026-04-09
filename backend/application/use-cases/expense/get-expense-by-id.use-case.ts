import { ExpenseRepository } from "../../../infrastructure/repository/expense.repository"
import { MockExpenseRepository } from "../../../infrastructure/repository/expense.repository.mock"
import { IExpenseRepository } from "../../repositories/expense.repository"

type Props = {
  id: string
}

export type IGetExpensesByIdUseCase = ReturnType<typeof getExpenseByIdUseCase>

export const getExpenseByIdUseCase = async (input: Props) => {
  // 1️⃣ Choose repository based on environment
  const expenseRepository: IExpenseRepository =
    process.env.NODE_ENV === "test"
      ? new MockExpenseRepository()
      : new ExpenseRepository()

  // 2️⃣ Get expenses connected to a specific ID
  return await expenseRepository.getExpensesFromId(input.id)
}
