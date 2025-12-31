

import { PlaceRepository } from '../../../infrastructure/repository/place.repository';
import { MockPlaceRepository } from '../../../infrastructure/repository/place.repository.mock';
import { INotesRepository, IPlaceRepository } from '../../repositories/place.repository.interface';
import { ITripsRepository } from '../../repositories/trips.repository.interface';
import { IUsersRepository } from '../../repositories/users.repository.interface';

type props = {
  id : string
  notes: string;
};


export type IupdatePlaceUseCase = ReturnType<typeof updatePlaceUseCase>;

export const updatePlaceUseCase = async (input: props) => {
  // Choose repository based on environment
   const placeRepository: IPlaceRepository =
     process.env.NODE_ENV === 'test'
       ? new MockPlaceRepository() 
       : new PlaceRepository();

  try {

    let updatedNotes = await pointsRepository.updatePoint(
         input.id ,
        {
          notes : input.notes
        }
    );

  if (!updatedNotes) {
    throw new Error("Notes could not be updated");
  }

  return updatedNotes;
    
   
  } catch (err) {
   // console.error('Sign in use case:',err);
    throw new Error(`Ops something went wrong:'${(err as Error).message}`)
  }
};
