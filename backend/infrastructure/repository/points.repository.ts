import prisma from "../../../prisma/client";
import { IPointsRepository } from "../../application/repositories/points.repository.interface";
import { ITripsRepository } from "../../application/repositories/trips.repository.interface";
import { DatabaseOperationError } from "../../entities/errors/common";
import { PointInsert, Point } from "../../entities/models/point";
import { TripInsert, Trip } from "../../entities/models/trip";


export class PointsRepository implements IPointsRepository {

    async updatePoint(pointId: string, input: Partial<PointInsert>, tx?: any): Promise<any> {
         try{
         const updatePoint = await prisma.point.update({
            where : {
                id : pointId
            },
            data : {
                tripId: input.tripId ,
                role: input.role  ,
                index: input.index  ,

                placeName: input.place?.name ,
                placeId: input.place?.placeId ,
                placeAddress: input.place?.address ,
                placeLat: input.place?.location.lat ,
                placeLng: input.place?.location.lng ,
                startDate: input.startDate ,
                endDate: input.endDate ,     

                fromName: input.from?.name ,
                fromPlaceId: input.from?.placeId ,
                fromAddress: input.from?.address ,
                fromLat: input.from?.location.lat ,
                fromLng: input.from?.location.lng , 

                toName: input.to?.name ,
                toPlaceId: input.to?.placeId ,
                toAddress: input.to?.address ,
                toLat: input.to?.location.lat ,
                toLng: input.to?.location.lng , 
               
                departureDate: input.departureDate ,
                departureTime: input.departureTime ,
                transportType: input.transportType ,
 
            }
         })

        if(!updatePoint){
           throw new Error(`Point with ID ${pointId} not found`);
        } 

        return updatePoint

        }catch(err){
            throw err
        }
        
    }

    async getPoint(pointId: string): Promise<any | undefined> {
          try {     
           const point = await prisma.point.findFirst({
               where:{
                   id : pointId
               }
           }) 

            if (!point) {
                throw new Error(`Point with ID ${pointId} not found`);
               }

              return point
           }catch(err){
          //capture error sentry
          throw err
        }
    }

    async createPoint(input: PointInsert, tx?: any): Promise<any> {
         try{

              const newPoint = await prisma.point.create({
                data : {
                tripId: input.tripId ,
                role: input.role  ,
                index: input.index  ,

                placeName: input.place?.name ,
                placeId: input.place?.placeId ,
                placeAddress: input.place?.address ,
                placeLat: input.place?.location.lat ,
                placeLng: input.place?.location.lng ,
                startDate: input.startDate ,
                endDate: input.endDate ,     

                fromName: input.from?.name ,
                fromPlaceId: input.from?.placeId ,
                fromAddress: input.from?.address ,
                fromLat: input.from?.location.lat ,
                fromLng: input.from?.location.lng , 

                toName: input.to?.name ,
                toPlaceId: input.to?.placeId ,
                toAddress: input.to?.address ,
                toLat: input.to?.location.lat ,
                toLng: input.to?.location.lng , 
               
                departureDate: input.departureDate ,
                departureTime: input.departureTime ,
                transportType: input.transportType ,
 
            }
              })
              
              if(newPoint){
                 return newPoint
              }else{
                  throw new DatabaseOperationError("Cannot create user.");
              }
            }catch(err){
              //capture error sentry
              console.log('error', err)
              throw err
            }}

     async deletePoint(pointId: string, tx?: any): Promise<void> {
         try {     
              const deletedPoint = await prisma.point.delete({
                  where:{
                      id : pointId
                  }
              }) 
              
               if (!deletedPoint) {
                throw new Error(`Point with ID ${pointId} not found`);
               }

                return 
            }catch(err){
              //capture error sentry
              throw err
            }
        
    }


    async getPointsForUser(tripId: string): Promise<any[]> {
         try{
            const Points = await prisma.point.findMany({
               where:{
                   tripId : tripId
               },
                orderBy: {
                 index: 'asc', // ✅ sort ascending by index
                 },
           }) 
            return Points
  
        }catch(err){
            throw err
        }
        
    }

     async updateMany(points: Point[]): Promise<void> {
        try {
            const operations = points.map(p =>
                prisma.point.update({
                    where: { id: p.id },
                    data: { index: p.index }
                })
            );

            await prisma.$transaction(operations);
        } catch (err) {
            throw err;
        }
    }
    
}
