import { z } from "zod"
import { InputParseError } from "../../../entities/errors/common"
import { getExpenseByIdUseCase } from "../../../application/use-cases/expense/get-expense-by-id.use-case"

/* ---------------------------------- */
/* schema */
/* ---------------------------------- */

export const getExpenseByIdSchema = z.object({
  id: z.string().min(1, "ExpenseId is required"),
})

/* ---------------------------------- */
/* controller */
/* ---------------------------------- */

export const getExpensesByIdController = async (
  expenseId: string
) => {
  // 1️⃣ Validate input
  const { data, error } = getExpenseByIdSchema.safeParse({id :expenseId })
  if (error) {
    throw new InputParseError("Invalid Id", { cause: error })
  }

  // 2️⃣ Call use case
  return await getExpenseByIdUseCase({ id: data.id })
}
