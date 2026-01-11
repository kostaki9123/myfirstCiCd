'use server';

import { redirect } from 'next/navigation';
import { signInController } from '../../../backend/interface-adapters/controllers/auth/sign-in.controller';
import { createTripController } from '../../../backend/interface-adapters/controllers/trips/create-trip.controller';
import { revalidatePath } from 'next/cache';
import { auth } from "@clerk/nextjs/server";
import { IUsersRepository } from '../../../backend/application/repositories/users.repository.interface';
import { MockUsersRepository } from '../../../backend/infrastructure/repository/users.repository.mock';
import { UsersRepository } from '../../../backend/infrastructure/repository/users.repository';
import { getTripsController } from '../../../backend/interface-adapters/controllers/trips/get-trips.controller';
import { deleteTripController } from '../../../backend/interface-adapters/controllers/trips/delete-trip.controller';
import { getTripController } from '../../../backend/interface-adapters/controllers/trips/get-trip.controllet';


export async function signIn(userId:string, email:string, username:string ) {
    //const instrumentationService = getInjection('IInstrumentationService');
    //return await instrumentationService.instrumentServerAction(
    //  'signIn',
    //  { recordResponse: true },
        try {
         
          return await signInController({
            userId,username,email
          });
         
        } catch (err) {
          throw new Error(`Ops something went wrong:'${(err as Error).message}`)
          
        }
  
   //  );
  }


export async function createTrip(formData:FormData ) {
    //const instrumentationService = getInjection('IInstrumentationService');
    //return await instrumentationService.instrumentServerAction(
    //  'signIn',
    //  { recordResponse: true },
        console.log('run1')
        const { userId } = await auth(); // 🔐 Auth check
        console.log('run')
        if (!userId) {
          redirect('/sign-in')
        }
        
        const usersRepository: IUsersRepository =
            process.env.NODE_ENV === 'test'
              ? new MockUsersRepository()
              : new UsersRepository();
            
             let existingUser = await usersRepository.getUser(userId);

           if (!existingUser) {
             redirect('/sign-in')
           }

        try { 
          

          let tripName = formData.get("tripName") as string 
          console.log("trip name:", formData.get("tripName") as string )

          let tripBudget =  formData.get("tripBudget") as string 
          console.log("trip Budget:", formData.get("tripBudget") as string )

          let travelingWith = formData.get("travelingWith") as string
          console.log("travelingWith:", formData.get("travelingWith") as string )

          let tripTypes = formData.getAll("tripTypes") as string[];
          console.log("Trip Types:", tripTypes);

          
         
           
          const result =  await createTripController({
             userId : userId,
             tripName : tripName,
             tripBudget : tripBudget,
             travelingWith : travelingWith,
             tripTypes : tripTypes,   
           });

           revalidatePath('/')

           return result
         
        } catch (err) {
          throw new Error(`Ops something went wrong:'${(err as Error).message}`)
          
        }
  
    
   //  );
  }

  
export async function getTrips() {
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
    const result = await getTripsController(userId);
    return result;
  } catch (err) {
    console.error(err);
    throw new Error(`Ops something went wrong: '${(err as Error).message}'`);
  }
}

export async function getTrip(tripId : string) {
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
    const result = await getTripController(tripId);
    return result;
  } catch (err) {
    console.error(err);
    throw new Error(`Ops something went wrong: '${(err as Error).message}'`);
  }
}



export async function deleteTrip(tripId:string) {
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
          
           const result =  await deleteTripController(tripId);

           revalidatePath('/')

           return result
        
                  
        } catch (err) {
          console.log(err)
          throw new Error(`Ops something went wrong:'${(err as Error).message}`)
          
        }
  
   //  );
  }