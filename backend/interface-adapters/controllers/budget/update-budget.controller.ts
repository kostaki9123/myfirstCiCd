import { z } from "zod"
import { InputParseError } from "../../../entities/errors/common"
import { updateBudgetUseCase } from "../../../application/use-cases/budget/update-budget.use-case"

/* ---------------------------------- */
/* schema */
/* ---------------------------------- */

export const CurrencyEnum = z.string()

export const inputSchema = z.object({
  budgetId: z.string().min(1, "Budget ID is required"),
  tripId: z.string().optional(),
  Amount: z.number().positive().optional(),
  genCurrency: CurrencyEnum.optional(),
  budgetAmount: z.number().min(0).optional(),
  budgetCurrency: CurrencyEnum.optional(),
})

/* ---------------------------------- */
/* controller */
/* ---------------------------------- */

export const updateBudgetController = async (
  input: Partial<z.infer<typeof inputSchema>>
): Promise<ReturnType<typeof updateBudgetUseCase>> => {
  // input validation
  const { data, error: inputParseError } = inputSchema.safeParse(input)

  if (inputParseError) {
    throw new InputParseError("Invalid data", { cause: inputParseError })
  }

  // call use case
  return await updateBudgetUseCase({
    budgetId: data.budgetId,
    tripId: data.tripId,
    Amount: data.Amount,
    genCurrency: data.genCurrency,
    budgetAmount: data.budgetAmount,
    budgetCurrency: data.budgetCurrency,
  })
}
