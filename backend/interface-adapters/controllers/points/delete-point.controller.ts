import { deletePointUseCase } from "../../../application/use-cases/points/delete-point.use-case";
import { deleteTripUseCase } from "../../../application/use-cases/trip/delete-trip.use-case";


export const deletePointController =
    async (pointId : string) : Promise<void> => { 
          console.log('run contro')
          return await deletePointUseCase(pointId);

    }
      