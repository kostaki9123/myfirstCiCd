import { deletePlaceUseCase } from "../../../application/use-cases/place/delete-place.use-case";

export const deletePlaceController =
    async (pointId: string, placeId:string) : Promise<void> => { 
          
          return await deletePlaceUseCase(pointId,placeId);

    }
      