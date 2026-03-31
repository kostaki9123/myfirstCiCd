import { ExpenseRepository } from "../../../infrastructure/repository/expense.repository"
import { MockExpenseRepository } from "../../../infrastructure/repository/expense.repository.mock"
import { DatabaseOperationError } from "../../../entities/errors/common"
import { IExpenseRepository } from "../../repositories/expense.repository"

type Props = {
  expenseId: string
  description?: string
  category?: string
  expenseCurrency?: string
  amount?: number
  connectedToId?: string
}

export type IUpdateExpenseUseCase = ReturnType<typeof updateExpenseUseCase>

export const updateExpenseUseCase = async (input: Props) => {
  // 1️⃣ Choose repository based on environment
  const expenseRepository: IExpenseRepository =
    process.env.NODE_ENV === "test"
      ? new MockExpenseRepository()
      : new ExpenseRepository()

  try {
    // 2️⃣ Call repository to update
    const result = await expenseRepository.updateExpense(input.expenseId, {
      description: input.description,
      category: input.category,
      expenseCurrency: input.expenseCurrency,
      amount: input.amount,
      connectedToId: input.connectedToId,
    })

    if (!result) {
      throw new DatabaseOperationError(`Expense ${input.expenseId} could not be updated`)
    }

    return result
  } catch (err) {
    console.error(`❌ Error updating expense ${input.expenseId}:`, err)
    throw new DatabaseOperationError(`Ops something went wrong: ${(err as Error).message}`)
  }
}
