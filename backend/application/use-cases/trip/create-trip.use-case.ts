
import { TripsRepository } from '../../../infrastructure/repository/trips.repository';
import { MockTripsRepository } from '../../../infrastructure/repository/trips.repository.mock';
import { ITripsRepository } from '../../repositories/trips.repository.interface';
import { IUsersRepository } from '../../repositories/users.repository.interface';

type props =  {
    tripBudget: string;
    travelingWith: string;
    tripTypes: string[];
    tripName: string;
    userId: string;
} 

export type IcreateTripUseCase = ReturnType<typeof createTripUseCase>;

export const createTripUseCase = async (input: props) => {
  // Choose repository based on environment
  const tripsRepository: ITripsRepository =
    process.env.NODE_ENV === 'test'
      ? new MockTripsRepository() 
      : new TripsRepository();

  try {


    let createTrip = await tripsRepository.createTrip({
        tripName : input?.tripName , 
        travelingWith : input?.travelingWith ,
        tripBudget : input.tripBudget ,
        tripTypes : input.tripTypes,
        userId : input.userId ,
    });

    
    if (!createTrip) {
    //   console.error('Sign in useCase: User could not be created');
       throw new Error(' Trip could not be created')
    }
   
     return createTrip;
  } catch (err) {
   // console.error('Sign in use case:',err);
    throw new Error(`Ops something went wrong:'${(err as Error).message}`)
  }
};
