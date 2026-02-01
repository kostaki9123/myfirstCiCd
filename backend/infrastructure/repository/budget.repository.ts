import prisma from "../../../prisma/client";
import { IBudgetsRepository } from "../../application/repositories/budget.repository";
import { DatabaseOperationError } from "../../entities/errors/common";
import { BudgetInsert, Budget } from "../../entities/models/budget";

export class BudgetsRepository implements IBudgetsRepository {

  async updateBudget(
    budgetId: string,
    input: Partial<BudgetInsert>,
    tx?: any
  ): Promise<Budget> {

    try {
      const updatedBudget = await prisma.budget.update({
        where: {
          id: budgetId,
        },
        data: {
          tripId: input.tripId,
          Amount: input.Amount,
          genCurrency: input.genCurrency,
          budgetAmount: input.budgetAmount,
          budgetCurrency: input.budgetCurrency,
        },
      });

      if (!updatedBudget) {
        throw new Error(`Budget with ID ${budgetId} not found`);
      }

      return updatedBudget;
    } catch (err) {
      throw err;
    }
  }

  async getBudget(budgetId: string): Promise<Budget | undefined> {
    try {
      const budget = await prisma.budget.findFirst({
        where: {
          id: budgetId,
        },
      });

      if (!budget) {
        throw new Error(`Budget with ID ${budgetId} not found`);
      }

      return budget;
    } catch (err) {
      throw err;
    }
  }

  async getBudgetByTripId(tripId: string): Promise<Budget | undefined> {
    try {
      const budget = await prisma.budget.findFirst({
        where: {
          tripId: tripId,
        },
      });

      if (!budget) {
        throw new Error(`Budget for Trip ID ${tripId} not found`);
      }

      return budget;
    } catch (err) {
      throw err;
    }
  }

  async deleteBudget(budgetId: string, tx?: any): Promise<void> {
    try {
      const deletedBudget = await prisma.budget.delete({
        where: {
          id: budgetId,
        },
      });

      if (!deletedBudget) {
        throw new Error(`Budget with ID ${budgetId} not found`);
      }

      return;
    } catch (err) {
      throw err;
    }
  }

  async createBudget(input: BudgetInsert, tx?: any): Promise<Budget> {
    try {
      const newBudget = await prisma.budget.create({
        data: {
          tripId: input.tripId,
          Amount: input.Amount,
          genCurrency: input.genCurrency,
          budgetAmount: input.budgetAmount,
          budgetCurrency: input.budgetCurrency,
        },
      });

      if (!newBudget) {
        throw new DatabaseOperationError("Cannot create budget.");
      }

      return newBudget;
    } catch (err) {
      throw err;
    }
  }
}
