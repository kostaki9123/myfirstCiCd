

import { PointsRepository } from '../../../infrastructure/repository/points.repository';
import { MockPointsRepository } from '../../../infrastructure/repository/points.repository.mock';
import { IPointsRepository } from '../../repositories/points.repository.interface';
import { ITripsRepository } from '../../repositories/trips.repository.interface';
import { IUsersRepository } from '../../repositories/users.repository.interface';

type props = {
  tripId: string;
  role: "POINT" | "MOVING_BOX";
  index: number;

  place?: {
    name: string;
    address: string;
    placeId: string;
    location: {
      lat: number;
      lng: number;
    };
  };

  startDate? : Date
  endDate? : Date

  from?: {
    name: string;
    address: string;
    placeId: string;
    location: {
      lat: number;
      lng: number;
    };
  };

  to?: {
    name: string;
    address: string;
    placeId: string;
    location: {
      lat: number;
      lng: number;
    };
  };

  transportType?: string;
  departureDate?: Date;
  departureTime?: Date;
};


export type IcreatePointUseCase = ReturnType<typeof createPointUseCase>;

export const createPointUseCase = async (input: props) => {
  // Choose repository based on environment
   const tripsRepository: IPointsRepository =
     process.env.NODE_ENV === 'test'
       ? new MockPointsRepository() 
       : new PointsRepository();

    console.log('useCase')

  try {

    let createPoint = await tripsRepository.createPoint({
          tripId: input.tripId ,
          role: input.role  ,
          index: input.index  ,
           
          place:  input.place
          ? {
              ...input.place,
              address: input.place.address ?? "",
              placeId: input.place.placeId ?? "",
            }
          : undefined,
         
          startDate: input.startDate ,
          endDate: input.endDate ,     

          from:  input.from
          ? {
              ...input.from,
              address: input.from.address ?? "",
              placeId: input.from.placeId ?? "",
            }
          : undefined,


           to:  input.to
          ? {
              ...input.to,
              address: input.to.address ?? "",
              placeId: input.to.placeId ?? "",
            }
          : undefined,
         
          departureDate: input.departureDate ,
          departureTime: input.departureTime ,
          transportType: input.transportType ,
    });

    
    if (!createPoint) {
       console.error('Sign in useCase: User could not be created');
       throw new Error(' Point could not be created')
      }
   
      return createPoint;
  } catch (err) {
   // console.error('Sign in use case:',err);
    throw new Error(`Ops something went wrong:'${(err as Error).message}`)
  }
};
