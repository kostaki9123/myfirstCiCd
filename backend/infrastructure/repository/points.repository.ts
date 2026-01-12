import prisma from "../../../prisma/client";
import { IPointsRepository } from "../../application/repositories/points.repository.interface";
import { ITripsRepository } from "../../application/repositories/trips.repository.interface";
import { DatabaseOperationError } from "../../entities/errors/common";
import { PointInsert, Point } from "../../entities/models/point";
import { TripInsert, Trip } from "../../entities/models/trip";


  export class PointsRepository implements IPointsRepository {

 async updatePoint(
  pointId: string,
  input: Partial<PointInsert>,
  tx?: any
): Promise<any> {
  const db = tx ?? prisma;

  console.log('Look',input)

  if (input.role === 'POINT') {
    return db.point.update({
      where: { id: pointId },
      data: {
        role: 'POINT',

        startDate: input.startDate,
        endDate: input.endDate,

        placeName: input.place?.name ?? null,
        placeAddress: input.place?.address ?? '',
        placeId: input.place?.placeId ?? '',
        placeLat: input.place?.location?.lat ?? null,
        placeLng: input.place?.location?.lng ?? null,

        // 🔥 clear transport fields
        transportType: null,
        departureDate: null,
        fromName: null,
        fromAddress: '',
        fromPlaceId: '',
        fromLat: null,
        fromLng: null,
        toName: null,
        toAddress: '',
        toPlaceId: '',
        toLat: null,
        toLng: null,
      },
    });
  }

  // MOVING_BOX
  return db.point.update({
    where: { id: pointId },
    data: {
      role: 'MOVING_BOX',

      transportType: input.transportType ?? null,
      departureDate: input.departureDate ?? null,
      notes:input.notes ?? null,
      

      fromName: input.from?.name ?? null,
      fromAddress: input.from?.address ?? '',
      fromPlaceId: input.from?.placeId ?? '',
      fromLat: input.from?.location?.lat ?? null,
      fromLng: input.from?.location?.lng ?? null,

      toName: input.to?.name ?? null,
      toAddress: input.to?.address ?? '',
      toPlaceId: input.to?.placeId ?? '',
      toLat: input.to?.location?.lat ?? null,
      toLng: input.to?.location?.lng ?? null,

      // 🔥 clear place fields
      placeName: null,
      placeAddress: '',
      placeId: '',
      placeLat: null,
      placeLng: null,
      startDate: null,
      endDate: null,
    },
  });
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
               
                notes : input.notes,
                departureDate: input.departureDate ,
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

     async deletePoint(pointId: string,tripId: string , tx?: any): Promise<void> {

            console.log('pointId:' ,pointId)
            console.log('tripId:' ,tripId)

            try {
              // 1. Delete the point
              const deletedPoint = await prisma.point.delete({
                where: { id: pointId }
              });
          
              if (!deletedPoint) {
                throw new Error(`Point with ID ${pointId} not found`);
              }
          
              // 2. Load remaining points for that trip ordered by index
              const points = await prisma.point.findMany({
                where: { tripId },
                orderBy: { index: 'asc' }
              });
          
              // 3. Prepare atomic updates to re-index all points
              const updates = points.map((p: { id: any; }, newIndex: any) =>
                prisma.point.update({
                  where: { id: p.id },
                  data: { index: newIndex }
                })
              );
          
              // 4. Execute all index updates inside a transaction
              await prisma.$transaction(updates);
          
              return;
          
            } catch (err) {
              throw err;
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
