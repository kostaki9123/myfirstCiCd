
import { TripsRepository } from '../../../infrastructure/repository/trips.repository';
import { MockTripsRepository } from '../../../infrastructure/repository/trips.repository.mock';
import { ITripsRepository } from '../../repositories/trips.repository.interface';



export type IgetTripUseCase = ReturnType<typeof getTripUseCase>;

export const getTripUseCase = async (userId:string) => {
  // Choose repository based on environment
  const tripsRepository: ITripsRepository =
    process.env.NODE_ENV === 'test'
      ? new MockTripsRepository() 
      : new TripsRepository();

  try {

    let getTrips = await tripsRepository.getTripsForUser(
        userId 
    );

    
    if (!getTrips) {
    //   console.error('Sign in useCase: User could not be created');
       throw new Error('Could not get trips')
    }
   
     return getTrips;
  } catch (err) {
   // console.error('Sign in use case:',err);
    throw new Error(`Ops something went wrong:'${(err as Error).message}`)
  }
};
