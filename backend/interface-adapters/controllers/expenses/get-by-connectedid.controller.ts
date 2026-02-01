import { z } from "zod"
import { InputParseError } from "../../../entities/errors/common"
import { getExpensesByConnectedToIdUseCase } from "../../../application/use-cases/expense/get-by-connectedid.use-case"

/* ---------------------------------- */
/* schema */
/* ---------------------------------- */

export const getExpensesByConnectedToIdSchema = z.object({
  connectedToId: z.string().min(1, "ConnectedTo ID is required"),
})

/* ---------------------------------- */
/* controller */
/* ---------------------------------- */

export const getExpensesByConnectedToIdController = async (
  connectedToId: string
) => {
  // 1️⃣ Validate input
  const { data, error } = getExpensesByConnectedToIdSchema.safeParse({ connectedToId })
  if (error) {
    throw new InputParseError("Invalid connectedToId", { cause: error })
  }

  // 2️⃣ Call use case
  return await getExpensesByConnectedToIdUseCase({ connectedToId: data.connectedToId })
}
