
import { PointsRepository } from '../../../infrastructure/repository/points.repository';
import { MockPointsRepository } from '../../../infrastructure/repository/points.repository.mock';
import { TripsRepository } from '../../../infrastructure/repository/trips.repository';
import { MockTripsRepository } from '../../../infrastructure/repository/trips.repository.mock';
import { IPointsRepository } from '../../repositories/points.repository.interface';



export type IgetPointsUseCase = ReturnType<typeof getPointsUseCase>;

export const getPointsUseCase = async (tripId:string) => {
  // Choose repository based on environment
  const pointsRepository: IPointsRepository =
    process.env.NODE_ENV === 'test'
      ? new MockPointsRepository() 
      : new PointsRepository();

  try {

    let Points = await pointsRepository.getPointsForUser(
        tripId 
    );

    
    if (!Points) {
    //   console.error('Sign in useCase: User could not be created');
       throw new Error('Could not get trips')
    }
   
     return Points;
  } catch (err) {
   // console.error('Sign in use case:',err);
    throw new Error(`Ops something went wrong:'${(err as Error).message}`)
  }
};
