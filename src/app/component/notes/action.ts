'use server';

import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

import { MockUsersRepository } from "../../../../backend/infrastructure/repository/users.repository.mock"; 
import { UsersRepository } from "../../../../backend/infrastructure/repository/users.repository";
import { IUsersRepository } from "../../../../backend/application/repositories/users.repository.interface"; 


export async function updateNotes(formData: FormData) {
  console.log("🟡 updateNotes action called");
 
  // 1️⃣ Auth check
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  // 2️⃣ Get or create user
  const usersRepository: IUsersRepository =
    process.env.NODE_ENV === "test"
      ? new MockUsersRepository()
      : new UsersRepository();

  const existingUser = await usersRepository.getUser(userId);
  if (!existingUser) redirect("/sign-in");

  try {
    // 3️⃣ Parse common fields
    const id =    formData.get("id") as string;
    const notes = formData.get("notes") as string;
           
    if (!id || !notes) {
      throw new Error("Missing required fields: id or notes");
    }

    let input: any = {
      id,
      notes,
    };

    console.log('aqui:' , input)

  //  const result = await updatePointController(input);

  //  console.log("✅ Point created successfully:", result);
 
    revalidatePath('/')
  //  return result;
   
  } catch (err) {
    console.error("❌ Error updating notes:", err);
    throw new Error(
      `Oops, something went wrong: ${(err as Error).message}`
    );
  }
}
