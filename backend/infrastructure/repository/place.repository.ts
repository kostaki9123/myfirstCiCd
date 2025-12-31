import prisma from "../../../prisma/client";
import {  IPlaceRepository } from "../../application/repositories/place.repository.interface";

export class PlaceRepository implements IPlaceRepository {

    async updateNote(id: string, notes: string, tx?: any): Promise<any> {
         try{
                 const updatePlace = await prisma.place.update({
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
}