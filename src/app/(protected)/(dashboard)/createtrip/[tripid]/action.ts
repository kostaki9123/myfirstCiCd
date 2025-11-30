'use server';

import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

import { IUsersRepository } from "../../../../../../backend/application/repositories/users.repository.interface";
import { MockUsersRepository } from "../../../../../../backend/infrastructure/repository/users.repository.mock";
import { UsersRepository } from "../../../../../../backend/infrastructure/repository/users.repository";
import { createPointController } from "../../../../../../backend/interface-adapters/controllers/points/create-point.controller";
import { getPointsController } from "../../../../../../backend/interface-adapters/controllers/points/get-points.controllers";
import { deleteTripController } from "../../../../../../backend/interface-adapters/controllers/trips/delete-trip.controller";
import { deletePointController } from "../../../../../../backend/interface-adapters/controllers/points/delete-point.controller";
import { movePointController } from "../../../../../../backend/interface-adapters/controllers/points/move-point.controller";
import { updatePointUseCase } from "../../../../../../backend/application/use-cases/points/update.point.use-case";
import { updatePointController } from "../../../../../../backend/interface-adapters/controllers/points/update-point.controller";

export async function createPoint(formData: FormData) {
  console.log("🟡 createPoint action called");
  console.log("FormData:", formData);

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
    const tripId = formData.get("tripId") as string;
    const role = formData.get("role") as "POINT" | "MOVING_BOX";
    const index = Number(formData.get("index"));

    if (!tripId || !role) {
      throw new Error("Missing required fields: tripId or role");
    }

    // 4️⃣ Create input object based on role
    let input: any = {
      tripId,
      role,
      index,
    };

    if (role === "POINT") {
      input.place = {
        name: formData.get("PlaceName") as string,
        address: (formData.get("PlaceAddress") as string) ?? "",
        placeId: (formData.get("PlaceId") as string) ?? "",
        location: {
          lat: Number(formData.get("PlaceLat")),
          lng: Number(formData.get("PlaceLng")),
        },
      };
      input.dates = [
        new Date(formData.get("startDate") as string),
        new Date(formData.get("endDate") as string),
      ];
    } else if (role === "MOVING_BOX") {
      input.from = {
        name: formData.get("fromName") as string,
        address: (formData.get("fromAddress") as string) ?? "",
        placeId: (formData.get("fromId") as string) ?? "",
        location: {
          lat: Number(formData.get("fromLat")),
          lng: Number(formData.get("fromLng")),
        },
      };
      input.to = {
        name: formData.get("toName") as string,
        address: (formData.get("toAddress") as string) ?? "",
        placeId: (formData.get("toId") as string) ?? "",
        location: {
          lat: Number(formData.get("toLat")),
          lng: Number(formData.get("toLng")),
        },
      };
      input.transportType = formData.get("transportType") as string;
      input.departureDate = new Date(formData.get("departureDate") as string);
      input.departureTime = new Date(formData.get("departureTime") as string);
    }

    // 5️⃣ Call controller
    const result = await createPointController(input);

    console.log("✅ Point created successfully:", result);
 
    revalidatePath('/')
    return result;
   
  } catch (err) {
    console.error("❌ Error creating point:", err);
    throw new Error(
      `Oops, something went wrong: ${(err as Error).message}`
    );
  }
}


export async function getPoints(tripId : string) {
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
    const points = await getPointsController(tripId);
    return points;
  } catch (err) {
    console.error(err);
    throw new Error(`Ops something went wrong: '${(err as Error).message}'`);
  }
}



export async function deletePoint(pointId:string) {
    //const instrumentationService = getInjection('IInstrumentationService');
    //return await instrumentationService.instrumentServerAction(
    //  'signIn',
    //  { recordResponse: true },
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
           console.log('run action')
          const result =  await deletePointController(pointId);

           revalidatePath('/')
         
           return result
        
                  
        } catch (err) {
          console.log(err)
          throw new Error(`Ops something went wrong:'${(err as Error).message}`)
          
        }
  
   //  );
  }


export async function MovePoint(formData: FormData) {
    //const instrumentationService = getInjection('IInstrumentationService');
    //return await instrumentationService.instrumentServerAction(
    //  'signIn',
    //  { recordResponse: true },
        const { userId } = await auth(); // 🔐 Auth check

        if (!userId) {
          redirect('/')
        }
        
        const usersRepository: IUsersRepository =
            process.env.NODE_ENV === 'test'
              ? new MockUsersRepository()
              : new UsersRepository();
        
        const tripId = formData.get("tripId") as string;
        const pointId = formData.get("pointId") as string;    
        const newIndex = Number(formData.get("newIndex"));

        try { 
           let existingUser = await usersRepository.getUser(userId);

           if (!existingUser) {
             redirect('/')
           }

          const result =  await movePointController({
             tripId : tripId ,
             pointId : pointId,
             newIndex : newIndex - 1
          })

          console.log('conre')

          revalidatePath(`/createtrip/${tripId}`);
         
          return result
        
                  
        } catch (err) {
          console.log(err)
          throw new Error(`Ops something went wrong:'${(err as Error).message}`)
          
        }
  
   //  );
  }

 export async function updatePoint(formData: FormData) {
  console.log("🟡 updatePoint action called");
 
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
    const id = formData.get("id") as string;
    const tripId = formData.get("tripId") as string;
    const role = formData.get("role") as "POINT" | "MOVING_BOX";
    const index = Number(formData.get("index"));

    if (!tripId || !role) {
      throw new Error("Missing required fields: tripId or role");
    }

    // 4️⃣ Create input object based on role
    let input: any = {
      id,
      tripId,
      role,
      index,
    };

    if (role === "POINT") {
      input.place = {
        name: formData.get("placeName") as string,
        address: (formData.get("placeAddress") as string) ?? "",
        placeId: (formData.get("placeId") as string) ?? "",
        location: {
          lat: Number(formData.get("placeLat")),
          lng: Number(formData.get("placeLng")),
        },
      };
      input.dates = [
        new Date(formData.get("startDate") as string),
        new Date(formData.get("endDate") as string),
      ];
    } else if (role === "MOVING_BOX") {
      input.from = {
        name: formData.get("fromName") as string,
        address: (formData.get("fromAddress") as string) ?? "",
        placeId: (formData.get("fromId") as string) ?? "",
        location: {
          lat: Number(formData.get("fromLat")),
          lng: Number(formData.get("fromLng")),
        },
      };
      input.to = {
        name: formData.get("toName") as string,
        address: (formData.get("toAddress") as string) ?? "",
        placeId: (formData.get("toId") as string) ?? "",
        location: {
          lat: Number(formData.get("toLat")),
          lng: Number(formData.get("toLng")),
        },
      };
      input.transportType = formData.get("transportType") as string;
      input.departureDate = new Date(formData.get("departureDate") as string);
      input.departureTime = new Date(formData.get("departureTime") as string);
    }

    const result = await updatePointController(input);

    console.log("✅ Point created successfully:", result);
 
    revalidatePath('/')
    return result;
   
  } catch (err) {
    console.error("❌ Error creating point:", err);
    throw new Error(
      `Oops, something went wrong: ${(err as Error).message}`
    );
  }
}
