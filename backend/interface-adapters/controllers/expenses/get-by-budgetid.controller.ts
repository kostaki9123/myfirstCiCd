import { z } from "zod"
import { InputParseError } from "../../../entities/errors/common"
import { getExpensesByBudgetIdUseCase } from "../../../application/use-cases/expense/getbybudgetid-expense.use-case"

/* ---------------------------------- */
/* schema */
/* ---------------------------------- */

export const getExpensesByBudgetIdSchema = z.object({
  budgetId: z.string().min(1, "Budget ID is required"),
})

/* ---------------------------------- */
/* controller */
/* ---------------------------------- */

export const getExpensesByBudgetIdController = async (
  budgetId: string
) => {
  // 1️⃣ Validate input
  const { data, error } = getExpensesByBudgetIdSchema.safeParse({ budgetId })
  if (error) {
    throw new InputParseError("Invalid Budget ID", { cause: error })
  }

  // 2️⃣ Call use case
  return await getExpensesByBudgetIdUseCase({ budgetId: data.budgetId })
}
