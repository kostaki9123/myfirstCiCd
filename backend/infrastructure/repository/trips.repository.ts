import prisma from "../../../prisma/client";
import { ITripsRepository } from "../../application/repositories/trips.repository.interface";
import { DatabaseOperationError } from "../../entities/errors/common";
import { TripInsert, Trip } from "../../entities/models/trip";


export class TripsRepository implements ITripsRepository {

    async updateTrip(tripId: string, input: Partial<TripInsert>, tx?: any): Promise<Trip> {
        try{
         const updateTrip = await prisma.trip.update({
            where : {
                id : tripId
            },
            data : {
                userId: input.userId ,
                tripName : input.tripName,             
                tripBudget : input.tripBudget ,
                travelingWith: input.travelingWith,
                tripTypes: input.tripTypes
            }
         })

        if(!updateTrip){
           throw new Error(`Trip with ID ${tripId} not found`);
        } 

        return updateTrip

        }catch(err){
            throw err
        }

    }


    async getTripsForUser(userId: string): Promise<Trip[]> {
        try{
            const trips = await prisma.trip.findMany({
               where:{
                   userId : userId
               }
           }) 

            return trips
  
        }catch(err){
            throw err
        }

     }

     async getTrip(tripId: string): Promise<Trip | undefined> {
        try {     
           const trip = await prisma.trip.findFirst({
               where:{
                   id : tripId
               }
           }) 

            if (!trip) {
                throw new Error(`Trip with ID ${tripId} not found`);
               }

              return trip
           }catch(err){
          //capture error sentry
          throw err
        }
     }

    async deleteTrip(tripId: string, tx?: any): Promise<void> {
        try {     
              const deletedTrip = await prisma.trip.delete({
                  where:{
                      id : tripId
                  }
              }) 
              
               if (!deletedTrip) {
                throw new Error(`Trip with ID ${tripId} not found`);
               }

                return 
            }catch(err){
              //capture error sentry
              throw err
            }
    }
 
    async createTrip(input: TripInsert, tx?: any): Promise<Trip> {
        try{
              const newTrip = await prisma.trip.create({
                  data:{
                      userId: input.userId ,
                      tripName : input.tripName,             
                      tripBudget : input.tripBudget ,
                      travelingWith: input.travelingWith,
                      tripTypes: input.tripTypes
                  }
                  
              })


              const newbudget = await prisma.budget.create({
                  data:{
                      tripId : newTrip.id ,
                      Amount : 0,
                      genCurrency : 'EUR',   
                      budgetAmount : 0,  
                      budgetCurrency : 'EUR'           
                }
                  
              })
              
              if(newTrip && newbudget){
                 return newTrip
              }else{
                  throw new DatabaseOperationError("Cannot create user.");
              }
            }catch(err){
              //capture error sentry
              throw err
            }}
    }

    


