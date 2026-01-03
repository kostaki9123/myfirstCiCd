import { PlaceRepository } from "../../../infrastructure/repository/place.repository";
import { MockPlaceRepository } from "../../../infrastructure/repository/place.repository.mock";
import { PointsRepository } from "../../../infrastructure/repository/points.repository";
import { MockPointsRepository } from "../../../infrastructure/repository/points.repository.mock";
import { IPlaceRepository } from "../../repositories/place.repository.interface";


export type IdeletePlaceUseCase = ReturnType<typeof deletePlaceUseCase>;

export const deletePlaceUseCase = async (pointId: string, placeId:string) => {
  // Choose repository based on environment
   const placeRepository:IPlaceRepository =
     process.env.NODE_ENV === 'test'
       ? new MockPlaceRepository() 
       : new PlaceRepository();

  try {

    let deletePlace = await placeRepository.deletePlace(
        pointId,placeId
    );

    return deletePlace;

  } catch (err) {
   // console.error('Sign in use case:',err);
    throw new Error(`Ops something went wrong:'${(err as Error).message}`)
  }
};
