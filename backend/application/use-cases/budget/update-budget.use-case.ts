import { DatabaseOperationError } from "../../../entities/errors/common"
import { BudgetsRepository } from "../../../infrastructure/repository/budget.repository"
import { MockBudgetsRepository } from "../../../infrastructure/repository/budget.repository.mock"
import { IBudgetsRepository } from "../../repositories/budget.repository"

type Props = {
  budgetId: string
  tripId?: string
  Amount?: number
  genCurrency?: string
  budgetAmount?: number
  budgetCurrency?: string
}

export type IUpdateBudgetUseCase = ReturnType<typeof updateBudgetUseCase>

export const updateBudgetUseCase = async (input: Props) => {
  // 1️⃣ Choose repository based on environment
  const budgetRepository: IBudgetsRepository =
    process.env.NODE_ENV === "test"
      ? new MockBudgetsRepository()
      : new BudgetsRepository()

  try {
    
    const result = await budgetRepository.updateBudget(input.budgetId, {
      tripId: input.tripId,
      genCurrency: input.genCurrency,
      budgetAmount: input.budgetAmount,
      budgetCurrency: input.budgetCurrency,
    })

    if (!result) {
      throw new DatabaseOperationError(
        `Budget ${input.budgetId} could not be updated`
      )
    }

    return result
  } catch (err) {
    console.error(`❌ Error updating budget ${input.budgetId}:`, err)
    throw new DatabaseOperationError(
      `Ops something went wrong: ${(err as Error).message}`
    )
  }
}
