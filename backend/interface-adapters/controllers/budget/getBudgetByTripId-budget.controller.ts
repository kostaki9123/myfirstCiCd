import { z } from "zod"
import { InputParseError } from "../../../entities/errors/common"
import { getBudgetByTripIdUseCase } from "../../../application/use-cases/budget/getBudgetByTripId-budget.use-case"

/* ---------------------------------- */
/* schema */
/* ---------------------------------- */

export const inputSchema = z.object({
  tripId: z.string().min(1, "Trip ID is required"),
})

/* ---------------------------------- */
/* controller */
/* ---------------------------------- */

export const getBudgetByTripIdController = async (
  input: z.infer<typeof inputSchema>
): Promise<ReturnType<typeof getBudgetByTripIdUseCase>> => {
  // input validation
  const { data, error: inputParseError } = inputSchema.safeParse(input)

  if (inputParseError) {
    throw new InputParseError("Invalid data", { cause: inputParseError })
  }

  // call use case
  return await getBudgetByTripIdUseCase({
    tripId: data.tripId,
  })
}
