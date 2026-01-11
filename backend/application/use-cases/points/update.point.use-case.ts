

import { PlaceRepository } from '../../../infrastructure/repository/place.repository';
import { MockPlaceRepository } from '../../../infrastructure/repository/place.repository.mock';
import { PointsRepository } from '../../../infrastructure/repository/points.repository';
import { MockPointsRepository } from '../../../infrastructure/repository/points.repository.mock';
import { IPlaceRepository } from '../../repositories/place.repository.interface';
import { IPointsRepository } from '../../repositories/points.repository.interface';
import { ITripsRepository } from '../../repositories/trips.repository.interface';
import { IUsersRepository } from '../../repositories/users.repository.interface';

type props = {
  id : string
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
  notes?: string;
};


export type IupdatePointUseCase = ReturnType<typeof updatePointUseCase>;

export const updatePointUseCase = async (input: props) => {
  // Choose repository based on environment
   const pointsRepository: IPointsRepository =
     process.env.NODE_ENV === 'test'
       ? new MockPointsRepository() 
       : new PointsRepository();

    const placeRepository:IPlaceRepository =
      process.env.NODE_ENV === 'test'
        ? new MockPlaceRepository() 
        : new PlaceRepository();

  try {

    //get old point
    let oldPoint = await pointsRepository.getPoint(input.id)

    //compare it to new update point
     //if is different 
    if(oldPoint?.place?.name !== input.place?.name ){
       await placeRepository.deletePlacesByPointId(input.id)
    }
   
    let updatedPoint = await pointsRepository.updatePoint(
         input.id ,
        {
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
          notes: input.notes ,
          transportType: input.transportType ,
    });

  if (!updatedPoint) {
    throw new Error("Point could not be updated");
  }

  return updatedPoint;
    
   
  } catch (err) {
   // console.error('Sign in use case:',err);
    throw new Error(`Ops something went wrong:'${(err as Error).message}`)
  }
};
