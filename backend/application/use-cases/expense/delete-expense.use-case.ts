import { ExpenseRepository } from "../../../infrastructure/repository/expense.repository"
import { MockExpenseRepository } from "../../../infrastructure/repository/expense.repository.mock"
import { DatabaseOperationError } from "../../../entities/errors/common"
import { IExpenseRepository } from "../../repositories/expense.repository"

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


  try {
  
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
