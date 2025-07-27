import { getTripUseCase } from "../../../application/use-cases/trip/get-trips.use-case";



export const getTripsController =
    async (userId : string) : Promise<ReturnType<typeof getTripUseCase >> => { 
    
          return await getTripUseCase(userId);

    }
      