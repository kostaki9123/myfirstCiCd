import { z } from "zod"
import { InputParseError, DatabaseOperationError } from "../../../entities/errors/common"
import { deleteExpenseUseCase } from "../../../application/use-cases/expense/delete-expense.use-case"

/* ---------------------------------- */
/* schema */
/* ---------------------------------- */

export const deleteExpenseSchema = z.object({
  expenseId: z.string().min(1, "Expense ID is required"),
  budgetId: z.string().min(1, "Expense ID is required"),
})

/* ---------------------------------- */
/* controller */
/* ---------------------------------- */

export const deleteExpenseController = async (
  input: Partial<z.infer<typeof deleteExpenseSchema>>
): Promise<ReturnType<typeof deleteExpenseUseCase>> => {
  // 1️⃣ Input validation
  const { data, error } = deleteExpenseSchema.safeParse(input)
  if (error) {
    throw new InputParseError("Invalid data for deletion", { cause: error })
  }

  try {
    // 2️⃣ Call the use case with validated data
    const result = await deleteExpenseUseCase({ expenseId: data.expenseId, budgetId: data.budgetId })

    return result
  } catch (err) {
    console.error(`❌ Failed to delete expense ${data.expenseId}:`, err)
    throw new DatabaseOperationError(`Failed to delete expense ${data.expenseId}`)
  }
}
