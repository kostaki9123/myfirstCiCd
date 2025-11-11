

import { PointsRepository } from '../../../infrastructure/repository/points.repository';
import { MockPointsRepository } from '../../../infrastructure/repository/points.repository.mock';
import { IPointsRepository } from '../../repositories/points.repository.interface';
import { ITripsRepository } from '../../repositories/trips.repository.interface';
import { IUsersRepository } from '../../repositories/users.repository.interface';



export type IdeletePointUseCase = ReturnType<typeof deletePointUseCase>;

export const deletePointUseCase = async (pointId: string) => {
  // Choose repository based on environment
   const pointRepository: IPointsRepository =
     process.env.NODE_ENV === 'test'
       ? new MockPointsRepository() 
       : new PointsRepository();

    console.log('useCase')

  try {

    let deletePoint = await pointRepository.deletePoint(
        pointId
    );

    return deletePoint;

  } catch (err) {
   // console.error('Sign in use case:',err);
    throw new Error(`Ops something went wrong:'${(err as Error).message}`)
  }
};
