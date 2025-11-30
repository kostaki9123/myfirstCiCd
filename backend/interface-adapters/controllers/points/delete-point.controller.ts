import { deletePointUseCase } from "../../../application/use-cases/points/delete-point.use-case";
import { deleteTripUseCase } from "../../../application/use-cases/trip/delete-trip.use-case";


export const deletePointController =
    async (pointId : string,tripId: string) : Promise<void> => { 
          
          return await deletePointUseCase(pointId,tripId);

    }
      