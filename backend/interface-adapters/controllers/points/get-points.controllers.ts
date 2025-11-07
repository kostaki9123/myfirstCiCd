import { getTripUseCase } from "../../../application/use-cases/trip/get-trips.use-case";



export const getPointsController =
    async (tripId : string) : Promise<ReturnType<typeof getTripUseCase >> => { 
    
          return await getTripUseCase(userId);

    }
      