import { deletePlaceUseCase } from "../../../application/use-cases/place/delete-place.use-case";
import { deletePointUseCase } from "../../../application/use-cases/points/delete-point.use-case";
import { deleteTripUseCase } from "../../../application/use-cases/trip/delete-trip.use-case";


export const deletePlaceController =
    async (pointId: string, placeId:string) : Promise<void> => { 
          
          return await deletePlaceUseCase(pointId,placeId);

    }
      