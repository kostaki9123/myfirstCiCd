import { deleteTripUseCase } from "../../../application/use-cases/trip/delete-trip.use-case";
import { getTripUseCase } from "../../../application/use-cases/trip/get-trips.use-case";



export const deleteTripController =
    async (tripId : string) : Promise<void> => { 
          
          return await deleteTripUseCase(tripId);

    }
      