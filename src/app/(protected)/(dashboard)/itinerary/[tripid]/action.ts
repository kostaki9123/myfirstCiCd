'use server';

import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

import { MockUsersRepository } from "../../../../../../backend/infrastructure/repository/users.repository.mock";
import { UsersRepository } from "../../../../../../backend/infrastructure/repository/users.repository"; 
import { IUsersRepository } from "../../../../../../backend/application/repositories/users.repository.interface"; 
import { createPlaceController } from "../../../../../../backend/interface-adapters/controllers/places/create-place.controller";
import { IplaceType } from "../../../../../../backend/application/use-cases/place/create-place.use-case";
import { getPlacesController } from "../../../../../../backend/interface-adapters/controllers/places/get-place.controller";


export async function createPlace(formData: FormData) {
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
    const pointId = formData.get("pointId") as string;
    const placeType = formData.get("placeType") as any;
    const name = formData.get("name") as string;
    const tripId = formData.get("tripId") as string;
       
    if (!id || !pointId || !placeType || !name) {
      throw new Error("Missing required fields: id or notes");
    }

    let input = {
      id,
      pointId,
      placeType,
      name 
    };

    console.log('aquiiiiic:' , input)

    const result = await createPlaceController(input);

  //  console.log("✅ Point created successfully:", result);
 
    revalidatePath(`/itinerary/${tripId}`)
    return result;
   
  } catch (err) {
    console.error("❌ Error updating notes:", err);
    throw new Error(
      `Oops, something went wrong: ${(err as Error).message}`
    );
  }
}


export async function getPlaces(pointId : string) {
  const { userId } = await auth(); // 🔐 Auth check

  if (!userId) {
    redirect('/sign-in'); // ✅ Έξω από try/catch
  }

  const usersRepository: IUsersRepository =
    process.env.NODE_ENV === 'test'
      ? new MockUsersRepository()
      : new UsersRepository();

  const existingUser = await usersRepository.getUser(userId);

  if (!existingUser) {
    redirect('/sign-in'); // ✅ Έξω από try/catch
  }

  try {
    const places = await getPlacesController(pointId);
    console.log('action places ', places)
    return places;
  } catch (err) {
    console.error(err);
    throw new Error(`Ops something went wrong: '${(err as Error).message}'`);
  }
}
