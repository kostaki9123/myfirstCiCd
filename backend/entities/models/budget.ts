import { z } from "zod"

/**
 * Base schema (NO effects)
 */
const budgetBaseSchema = z.object({
  id: z.string().optional(), // DB primary key

  tripId: z.string().cuid(),

  Amount: z.number().int().positive(),

  genCurrency: z.string().min(1, "General currency is required"),

  budgetAmount: z.number().int().positive(),

  budgetCurrency: z.string().min(1, "Budget currency is required"),
})

/**
 * Full select schema (reserved for future rules)
 */
export const selectBudgetSchema = budgetBaseSchema.superRefine(
  (_data, _ctx) => {
    // future cross-field validation
    // e.g. currency consistency rules
  }
)

/**
 * Types
 */
export type Budget = z.infer<typeof selectBudgetSchema>

/**
 * Insert schema (pick BEFORE effects)
 * id is omitted because DB generates it
 */
export const insertCreateBudgetSchema = budgetBaseSchema.pick({
  tripId: true,
  Amount: true,
  genCurrency: true,
  budgetAmount: true,
  budgetCurrency: true,
})

export type BudgetInsert = z.infer<typeof insertCreateBudgetSchema>
