import { getTripUseCase } from "../../../application/use-cases/trip/get-trip.use-case";


export const getTripController =
    async (tripId : string) : Promise<ReturnType<typeof getTripUseCase >> => { 
    
          return await getTripUseCase(tripId);

    }
      