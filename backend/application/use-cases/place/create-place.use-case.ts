

import { PlaceRepository } from '../../../infrastructure/repository/place.repository';
import { MockPlaceRepository } from '../../../infrastructure/repository/place.repository.mock';
import { IPlaceRepository } from '../../repositories/place.repository.interface';

export type IplaceType  = {
 placeType : 'ACCOMMODATION' | 'PLACE_TO_VISIT',
}

type props = {
  id : string
  pointId: string,
  placeType: any ,
  placeName: string ,
  googleMapsUri : string
  latitude : number
  longitude : number
  affiliatelink? : string
};


export type IupdatePlaceUseCase = ReturnType<typeof createPlaceUseCase>;

export const createPlaceUseCase = async (input: props) => {
  // Choose repository based on environment
   const placeRepository: IPlaceRepository =
     process.env.NODE_ENV === 'test'
       ? new MockPlaceRepository() 
       : new PlaceRepository();

  try {
    let createPlace = await placeRepository.createPlace({
           id : input.id ,
           pointId : input.pointId ,
           placeType : input.placeType ,
           name : input.placeName ,  
           googleMapLink : input.googleMapsUri ,
           latitude : input.latitude,
           longitude : input.longitude,
           affiliatelink : input.affiliatelink,
           
  });

  if (!createPlace) {
    throw new Error("Place could not be created");
  }

  return createPlace;
    
   
  } catch (err) {
   // console.error('Sign in use case:',err);
    throw new Error(`Ops something went wrong:'${(err as Error).message}`)
  }
};
