import { deletePointUseCase } from "../../../application/use-cases/points/delete-point.use-case";

export const deletePointController =
    async (pointId : string,tripId: string) : Promise<void> => { 
          
          return await deletePointUseCase(pointId,tripId);

    }
      