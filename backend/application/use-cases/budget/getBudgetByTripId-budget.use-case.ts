
import { DatabaseOperationError } from "../../../entities/errors/common"
import { BudgetsRepository } from "../../../infrastructure/repository/budget.repository"
import { MockBudgetsRepository } from "../../../infrastructure/repository/budget.repository.mock"
import { IBudgetsRepository } from "../../repositories/budget.repository"

type Props = {
  tripId: string
}

export type IGetBudgetByTripIdUseCase = ReturnType<
  typeof getBudgetByTripIdUseCase
>

export const getBudgetByTripIdUseCase = async (input: Props) => {
  // 1️⃣ Choose repository based on environment
  const budgetRepository: IBudgetsRepository =
    process.env.NODE_ENV === "test"
      ? new MockBudgetsRepository()
      : new BudgetsRepository()

  try {
    // 2️⃣ Fetch budgets
    const result = await budgetRepository.getBudgetByTripId(input.tripId)

    if (!result) {
      throw new DatabaseOperationError(
        `No budgets found for trip ${input.tripId}`
      )
    }

    return result
  } catch (err) {
    console.error(
      `❌ Error fetching budgets for trip ${input.tripId}:`,
      err
    )
    throw new DatabaseOperationError(
      `Ops something went wrong: ${(err as Error).message}`
    )
  }
}
