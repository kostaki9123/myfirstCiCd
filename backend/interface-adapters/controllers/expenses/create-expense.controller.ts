import { z } from "zod"
import { InputParseError } from "../../../entities/errors/common"
import { createExpenseUseCase } from "../../../application/use-cases/expense/create-expense.use-case"

/* ---------------------------------- */
/* schema */
/* ---------------------------------- */

export const ExpenseCategoryEnum = z.string()
export const CurrencyEnum = z.string()

export const inputSchema = z.object({
  budgetId: z.string().min(1, "Budget ID is required"),
  description: z.string().min(1, "Description is required"),
  category: ExpenseCategoryEnum,
  expenseCurrency: CurrencyEnum,
  amount: z.number().positive(),
  connectedToId: z.string().optional(),
})

/* ---------------------------------- */
/* controller */
/* ---------------------------------- */

export const createExpenseController = async (
  input: Partial<z.infer<typeof inputSchema>>
): Promise<ReturnType<typeof createExpenseUseCase>> => {
  // input validation
  const { data, error: inputParseError } = inputSchema.safeParse(input)

  if (inputParseError) {
    throw new InputParseError("Invalid data", { cause: inputParseError })
  }

  // call use case
  return await createExpenseUseCase({
    budgetId: data.budgetId,
    description: data.description,
    category: data.category,
    expenseCurrency: data.expenseCurrency,
    amount: data.amount,
    connectedToId: data.connectedToId,
  })
}
