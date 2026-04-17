
import { PlaceRepository } from '../../../infrastructure/repository/place.repository';
import { MockPlaceRepository } from '../../../infrastructure/repository/place.repository.mock';
import { IPlaceRepository } from '../../repositories/place.repository.interface';


export type IgetPlacesUseCase = ReturnType<typeof getPlacesUseCase>;

export const getPlacesUseCase = async (pointId:string) => {
  // Choose repository based on environment
  const placesRepository: IPlaceRepository =
    process.env.NODE_ENV === 'test'
      ? new MockPlaceRepository() 
      : new PlaceRepository();

  try {
    let Places = await placesRepository.getPlacesForPoint(
        pointId
    );
    
    if (!Places) {
    //   console.error('Sign in useCase: User could not be created');
       throw new Error('Could not get trips')
    }
   
     return Places;
  } catch (err) {
   // console.error('Sign in use case:',err);
    throw new Error(`Ops something went wrong:'${(err as Error).message}`)
  }
};
