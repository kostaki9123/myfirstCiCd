
import { TripsRepository } from '../../../infrastructure/repository/trips.repository';
import { MockTripsRepository } from '../../../infrastructure/repository/trips.repository.mock';
import { ITripsRepository } from '../../repositories/trips.repository.interface';



export type IdeleteTripUseCase = ReturnType<typeof deleteTripUseCase>;

export const deleteTripUseCase = async (tripId : string) => {
  // Choose repository based on environment
  const tripsRepository: ITripsRepository =
    process.env.NODE_ENV === 'test'
      ? new MockTripsRepository() 
      : new TripsRepository();

  try {

    let deleteTrip = await tripsRepository.deleteTrip(tripId)
   
    return deleteTrip;
  } catch (err) {
   // console.error('Sign in use case:',err);
    throw new Error(`Ops something went wrong:'${(err as Error).message}`)
  }
};
