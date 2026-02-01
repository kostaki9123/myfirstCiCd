import { z } from "zod"
import { InputParseError, DatabaseOperationError } from "../../../entities/errors/common"
import { updateExpenseUseCase } from "../../../application/use-cases/expense/update-expense.use-case"

/* ---------------------------------- */
/* schema */
/* ---------------------------------- */

export const updateExpenseSchema = z.object({
  description: z.string().min(1).optional(),
  category: z.string().optional(),
  expenseCurrency: z.string().optional(),
  amount: z.number().positive().optional(),
  connectedToId: z.string().optional(),
})

/* ---------------------------------- */
/* controller */
/* ---------------------------------- */

export const updateExpenseController = async (
  expenseId: string,
  input: Partial<z.infer<typeof updateExpenseSchema>>
): Promise<ReturnType<typeof updateExpenseUseCase>> => {
  // 1️⃣ Validate input
  const { data, error } = updateExpenseSchema.safeParse(input)
  if (error) {
    throw new InputParseError("Invalid data for updating expense", { cause: error })
  }

  try {
    // 2️⃣ Call the use case with validated data
    return await updateExpenseUseCase({
      expenseId,
      ...data, // spread only validated fields
    })
  } catch (err) {
    console.error(`❌ Failed to update expense ${expenseId}:`, err)
    throw new DatabaseOperationError(`Failed to update expense ${expenseId}`)
  }
}
