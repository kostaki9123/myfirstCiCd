import { deleteTripUseCase } from "../../../application/use-cases/trip/delete-trip.use-case";


export const deletePointController =
    async (pointId : string) : Promise<void> => { 
          
          return await deleteTripUseCase(tripId);

    }
      