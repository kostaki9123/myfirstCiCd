import { IBudgetsRepository } from "../../application/repositories/budget.repository";
import { Budget, BudgetInsert } from "../../entities/models/budget";

export class MockBudgetsRepository implements IBudgetsRepository {
  private _budgets: Budget[];

  constructor() {
    this._budgets = [
      {
        id: "1",
        tripId: "1",
        Amount: 0,
        genCurrency: "Euro",
        budgetAmount: 2500,
        budgetCurrency: "Euro",
      },
      {
        id: "2",
        tripId: "2",
        Amount: 0,
        genCurrency: "Euro",
        budgetAmount: 1800,
        budgetCurrency: "Euro",
      },
      {
        id: "3",
        tripId: "3",
        Amount: 0,
        genCurrency: "Yen",
        budgetAmount: 3000,
        budgetCurrency: "Yen",
      },
      {
        id: "4",
        tripId: "4",
        Amount: 0,
        genCurrency: "USD",
        budgetAmount: 3500,
        budgetCurrency: "USD",
      },
      {
        id: "5",
        tripId: "5",
        Amount: 0,
        genCurrency: "USD",
        budgetAmount: 2000,
        budgetCurrency: "USD",
      },
    ];
  }

  async getBudget(id: string): Promise<Budget | undefined> {
    const budget = this._budgets.find((b) => b.id === id);
    return budget;
  }

  async getBudgetByTripId(tripId: string): Promise<Budget | undefined> {
    const budget = this._budgets.find((b) => b.tripId === tripId);
    return budget;
  }

  async updateBudget(
    id: string,
    input: Partial<BudgetInsert>,
    tx?: any
  ): Promise<Budget> {
    const index = this._budgets.findIndex((budget) => budget.id === id);

    if (index === -1) {
      throw new Error(`Budget with ID ${id} not found`);
    }

    // Merge existing budget with new input
    this._budgets[index] = {
      ...this._budgets[index],
      ...input,
    };

    return this._budgets[index];
  }

  async createBudget(budget: BudgetInsert, tx?: any): Promise<Budget> {
    const newBudget: Budget = {
      id: `budget_${Math.random().toString(36).substr(2, 9)}`,
      ...budget,
    };

    this._budgets.push(newBudget);
    return newBudget;
  }

  async deleteBudget(id: string, tx?: any): Promise<void> {
    const index = this._budgets.findIndex((budget) => budget.id === id);

    if (index === -1) {
      throw new Error(`Budget with ID ${id} not found`);
    }

    this._budgets.splice(index, 1);
  }
}
