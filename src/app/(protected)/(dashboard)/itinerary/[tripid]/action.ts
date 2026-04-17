'use server';

import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { MockUsersRepository } from "../../../../../../backend/infrastructure/repository/users.repository.mock";
import { UsersRepository } from "../../../../../../backend/infrastructure/repository/users.repository"; 
import { IUsersRepository } from "../../../../../../backend/application/repositories/users.repository.interface"; 
import { createPlaceController } from "../../../../../../backend/interface-adapters/controllers/places/create-place.controller";
import { getPlacesController } from "../../../../../../backend/interface-adapters/controllers/places/get-place.controller";
import { deletePlaceController } from "../../../../../../backend/interface-adapters/controllers/places/delete-place.controller";
import { updatePlaceController } from "../../../../../../backend/interface-adapters/controllers/places/update-place.controller";


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
    const googleMapsUri = formData.get("googleMapsUri") as string;
    const affiliatelink = formData.get("affiliatelink") as string ?? undefined 

    const latitudeStr = formData.get("latitude") as string | null;
    const longitudeStr = formData.get("longitude") as string | null;

    const latitude = latitudeStr ? parseFloat(latitudeStr) : undefined;
    const longitude = longitudeStr ? parseFloat(longitudeStr) : undefined;

       
    if (!id || !pointId || !placeType || !name) {
      throw new Error("Missing required fields: id or notes");
    }

    let input = {
      id,
      pointId,
      placeType,
      name ,
      googleMapsUri,
      latitude,
      longitude,
      affiliatelink 
    };

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
    return places;
  } catch (err) {
    throw new Error(`Ops something went wrong: '${(err as Error).message}'`);
  }
}

export async function deletePlace(pointId: string, placeId:string) {
        const { userId } = await auth(); // 🔐 Auth check

        if (!userId) {
          redirect('/')
        }
        
        const usersRepository: IUsersRepository =
            process.env.NODE_ENV === 'test'
              ? new MockUsersRepository()
              : new UsersRepository();

        try { 
           let existingUser = await usersRepository.getUser(userId);

           if (!existingUser) {
             redirect('/')
           }
         
          const result =  await deletePlaceController(pointId, placeId);

           revalidatePath('/')
         
           return result
        
                  
        } catch (err) {
          throw new Error(`Ops something went wrong:'${(err as Error).message}`)
          
        }
  }

export async function updatePlace(formData: FormData) {
  console.log("🟡 updatePlace action called");
 
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
    const internalId = formData.get("internalId") as string;

    const notes = formData.get("notes") as string;

     if (!internalId ) {
      throw new Error("Missing required fields: internalId");
    }
     
    //optional fields
    const stayFromRaw = formData.get("stayFrom") as string | null;
    const stayUntilRaw = formData.get("stayUntil") as string | null;
    const visitDateRaw = formData.get("visitDate") as string | null;
    const visitTimeRaw = formData.get("visitTime") as string | null;
    const paymentStatus = formData.get("paymentStatus") as string | null;
   
    const input: {
      internalId: string;
      notes?: string | null;
      paymentStatus?: string | null;
      stayFrom?: Date | null;
      stayUntil?: Date | null;
      visitDate?: Date | null;
      visitTime?: Date | null;
    } = {
      internalId,
      notes: notes ?? null,
      paymentStatus: paymentStatus ?? null,
    };
  
    
    if (stayFromRaw) input.stayFrom = new Date(stayFromRaw);
    if (stayUntilRaw) input.stayUntil = new Date(stayUntilRaw);

    // 📍 Place to visit
    if (visitDateRaw) input.visitDate = new Date(visitDateRaw);
    if (visitTimeRaw) input.visitTime = new Date(visitTimeRaw);

    const result = await updatePlaceController(input);

    revalidatePath("/");

    return result
   
  } catch (err) {
    throw new Error(
      `Oops, something went wrong: ${(err as Error).message}`
    );
  }
}


