'use server';

import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"
import { IUsersRepository } from "../../../../../../backend/application/repositories/users.repository.interface"
import { MockUsersRepository } from "../../../../../../backend/infrastructure/repository/users.repository.mock"
import { UsersRepository } from "../../../../../../backend/infrastructure/repository/users.repository"
import { createExpenseController } from "../../../../../../backend/interface-adapters/controllers/expenses/create-expense.controller"
import { deleteExpenseController } from "../../../../../../backend/interface-adapters/controllers/expenses/delete-expense.controller"
import { updateExpenseController } from "../../../../../../backend/interface-adapters/controllers/expenses/update-place.controller"
import { getExpensesByBudgetIdController } from "../../../../../../backend/interface-adapters/controllers/expenses/get-by-budgetid.controller"
import { getExpensesByConnectedToIdController } from "../../../../../../backend/interface-adapters/controllers/expenses/get-by-connectedid.controller"
import { updateBudgetController } from "../../../../../../backend/interface-adapters/controllers/budget/update-budget.controller";
import { getBudgetByTripIdController } from "../../../../../../backend/interface-adapters/controllers/budget/getBudgetByTripId-budget.controller";

/* ---------------------------------- */
/* Create Expense */
/* ---------------------------------- */
export async function createExpense(formData: FormData) {
  console.log("🟡 createExpense action called")

  // 1️⃣ Auth check
  const { userId } = await auth()
  if (!userId) redirect("/sign-in")

  // 2️⃣ Get or create user
  const usersRepository: IUsersRepository =
    process.env.NODE_ENV === "test"
      ? new MockUsersRepository()
      : new UsersRepository()

  const existingUser = await usersRepository.getUser(userId)
  if (!existingUser) redirect("/sign-in")

  try {
    // 3️⃣ Parse fields from FormData
    const budgetId = formData.get("budgedId") as string
    const description = formData.get("description") as string
    const category = formData.get("category") as string
    const expenseCurrency = formData.get("expenseCurrency") as string
    const amount = Number(formData.get("amount"))
    const connectedToId = formData.get("connectedToId") as string | null
    const tripId = formData.get("tripId") as string | null

    // 4️⃣ Validate required fields
    if (!budgetId || !description || !category || !expenseCurrency || Number.isNaN(amount)) {
      throw new Error("Missing or invalid required expense fields")
    }

    // 5️⃣ Build input
    const input = {
      budgetId,
      description,
      category,
      expenseCurrency,
      amount,
      connectedToId: connectedToId || undefined,
    }
    
    // 6️⃣ Call controller
    const result = await createExpenseController(input)

    console.log("✅ Expense created successfully:", result)
    revalidatePath(`/budget/${tripId}`)
    return result
  } catch (err) {
    console.error("❌ Error creating expense:", err)
    throw new Error(`Oops, something went wrong: ${(err as Error).message}`)
  }
}

/* ---------------------------------- */
/* Update Expense */
/* ---------------------------------- */
export async function updateExpense(expenseId: string, formData: FormData) {
  const { userId } = await auth()
  if (!userId) redirect("/sign-in")

  try {
    const description = formData.get("description") as string | null
    const category = formData.get("category") as string | null
    const expenseCurrency = formData.get("expenseCurrency") as string | null
    const amountStr = formData.get("amount") as string | null
    const connectedToId = formData.get("connectedToId") as string | null

    const input: Record<string, any> = {}

    if (description) input.description = description
    if (category) input.category = category
    if (expenseCurrency) input.expenseCurrency = expenseCurrency
    if (amountStr) input.amount = Number(amountStr)
    if (connectedToId) input.connectedToId = connectedToId

    const result = await updateExpenseController(expenseId, input)
    revalidatePath('/')
    return result
  } catch (err) {
    console.error("❌ Error updating expense:", err)
    throw new Error(`Oops, something went wrong: ${(err as Error).message}`)
  }
}

/* ---------------------------------- */
/* Delete Expense */
/* ---------------------------------- */
export async function deleteExpense(formData:FormData) {
  const { userId } = await auth()
  if (!userId) redirect("/sign-in")
  
   const usersRepository: IUsersRepository =
    process.env.NODE_ENV === "test"
      ? new MockUsersRepository()
      : new UsersRepository()

  const existingUser = await usersRepository.getUser(userId)
  if (!existingUser) redirect("/sign-in")

  const expenseId = formData.get("expenseId") as string 
  const budgetId = formData.get("budgetId") as string 

  try {
    await deleteExpenseController({expenseId , budgetId})

    revalidatePath('/')
  } catch (err) {
    console.error("❌ Error deleting expense:", err)
    throw new Error(`Oops, something went wrong: ${(err as Error).message}`)
  }
}

/* ---------------------------------- */
/* Get Expenses by BudgetId */
/* ---------------------------------- */
export async function getExpensesByBudgetId(budgetId: string) {
  try {
    const expenses = await getExpensesByBudgetIdController(budgetId)
    return expenses
  } catch (err) {
    console.error("❌ Error fetching expenses by budgetId:", err)
    throw new Error(`Oops, something went wrong: ${(err as Error).message}`)
  }
}

/* ---------------------------------- */
/* Get Expenses by ConnectedToId */
/* ---------------------------------- */
export async function getExpensesByConnectedToId(connectedToId: string) {
  try {
    const expenses = await getExpensesByConnectedToIdController(connectedToId)
    return expenses
  } catch (err) {
    console.error("❌ Error fetching expenses by connectedToId:", err)
    throw new Error(`Oops, something went wrong: ${(err as Error).message}`)
  }
}


//Budget action 
/* ---------------------------------- */
/* Update Budget */
/* ---------------------------------- */
export async function updateBudget(budgetId: string, formData: FormData) {
  const { userId } = await auth()
  if (!userId) redirect("/sign-in")

  const usersRepository: IUsersRepository =
    process.env.NODE_ENV === "test"
      ? new MockUsersRepository()
      : new UsersRepository()

  const existingUser = await usersRepository.getUser(userId)
  if (!existingUser) redirect("/sign-in")

  try {
    const tripId = formData.get("tripId") as string | null
    const amountStr = formData.get("Amount") as string | null
    const genCurrency = formData.get("genCurrency") as string | null
    const budgetAmountStr = formData.get("budgetAmount") as string | null
    const budgetCurrency = formData.get("budgetCurrency") as string | null

    const input: Record<string, any> = {}

    if (budgetId) input.budgetId = budgetId
    if (tripId) input.tripId = tripId
    if (amountStr) input.Amount = Number(amountStr)
    if (genCurrency) input.genCurrency = genCurrency
    if (budgetAmountStr) input.budgetAmount = Number(budgetAmountStr)
    if (budgetCurrency) input.budgetCurrency = budgetCurrency

    const result = await updateBudgetController(input)

    console.log("✅ Budget updated successfully:", result)
    revalidatePath("/")
    return result
  } catch (err) {
    console.error("❌ Error updating budget:", err)
    throw new Error(`Oops, something went wrong: ${(err as Error).message}`)
  }
}


/* Get Budgets by TripId */
/* ---------------------------------- */
export async function getBudgetByTripId(tripId: string) {
  try {
    const budgets = await getBudgetByTripIdController({tripId})
    return budgets
  } catch (err) {
    console.error("❌ Error fetching budgets by tripId:", err)
    throw new Error(`Oops, something went wrong: ${(err as Error).message}`)
  }
}
