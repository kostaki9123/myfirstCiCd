import { Budget, BudgetInsert } from "../../entities/models/budget";

export interface IBudgetsRepository {
  createBudget(budget: BudgetInsert, tx?: any): Promise<Budget>;

  getBudget(id: string): Promise<Budget | undefined>;

  getBudgetByTripId(tripId: string): Promise<Budget | undefined>;

  updateBudget(
    id: string,
    input: Partial<BudgetInsert>,
    tx?: any
  ): Promise<Budget>;

  deleteBudget(id: string, tx?: any): Promise<void>;
}
