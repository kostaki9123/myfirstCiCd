import { z } from "zod"

/**
 * Base schema (NO effects)
 */
const expenseBaseSchema = z.object({
  id: z.string().optional(), // DB primary key

  budgetId: z.string().cuid(),

  description: z.string().min(1, "Description is required"),

  category: z.string().min(1, "Category is required"),

  expenseCurrency: z.string().min(1, "Currency is required"),

  amount: z.number().positive(),

  connectedToId: z.string().nullable().optional(),

})

/**
 * Full select schema (reserved for future rules)
 */
export const selectExpenseSchema = expenseBaseSchema.superRefine(
  (_data, _ctx) => {
    // no cross-field validation yet
  }
)

/**
 * Types
 */
export type Expense = z.infer<typeof selectExpenseSchema>

/**
 * Insert schema (pick BEFORE effects)
 * internalId & createdAt are omitted because DB generates them
 */
export const insertCreateExpenseSchema = expenseBaseSchema.pick({
  budgetId: true,
  description: true,
  category: true,
  expenseCurrency: true,
  amount: true,
  connectedToId: true,
})

export type ExpenseInsert = z.infer<typeof insertCreateExpenseSchema>
