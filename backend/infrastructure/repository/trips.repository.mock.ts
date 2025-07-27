import { ITripsRepository } from '../../application/repositories/trips.repository.interface';
import { Trip, TripInsert } from '../../entities/models/trip';
import { CreateUser, User } from '../../entities/models/user';



export class MockTripsRepository implements ITripsRepository {
  private _trips: Trip[];

  constructor() {
    this._trips =  [
  {
    id: "1",
    tripName: "Summer in Greece",
    userId: "user_123",
    tripBudget: "2500",
    travelingWith: "friends",
    tripTypes: ["beach", "culture", "food"]
  },
  {
    id: "2",
    tripName: "Snowy Alps Adventure",
    userId: "user_456",
    tripBudget: "1800",
    travelingWith: "family",
    tripTypes: ["skiing", "nature"]
  },
  {
    id: "3",
    tripName: "Tokyo Solo Travel",
    userId: "user_2zB4zA1PWJ3DmsP5INT5D8lp5HN",
    tripBudget: "3000",
    travelingWith: "solo",
    tripTypes: ["tech", "food", "city"]
  },
  {
    id: "4",
    tripName: "Safari in Kenya",
    userId: "user_2zB4zA1PWJ3DmsP5INT5D8lp5HN",
    tripBudget: "3500",
    travelingWith: "partner",
    tripTypes: ["wildlife", "adventure"]
  },
  {
    id: "5",
    tripName: "Road Trip USA",
    userId: "user_2zB4zA1PWJ3DmsP5INT5D8lp5HN",
    tripBudget: "2000",
    travelingWith: "friends",
    tripTypes: ["roadtrip", "nature", "culture"]
  }
];
  }

  async getTrip(id: string): Promise<Trip | undefined> {
      const trip = this._trips.find((u) => u.id === id);
      return trip
  }

   async getTripsForUser(userId: string): Promise<Trip[]> {
    const trips = this._trips.filter((u) => u.userId === userId);
    return trips;
  }


  async updateTrip(id: string, input: Partial<TripInsert>, tx?: any): Promise<Trip> {
    const index = this._trips.findIndex((trip) => trip.id === id);

    if (index === -1) {
      throw new Error(`Trip with ID ${id} not found`);
    }

    // Merge existing trip with new input
    this._trips[index] = {
      ...this._trips[index],
      ...input
    };

     return this._trips[index];
  }
 
    async createTrip(trip: TripInsert, tx?: any): Promise<Trip> {
    const newTrip: Trip = {
      id: `trip_${Math.random().toString(36).substr(2, 9)}`,
      ...trip,
    };

    this._trips.push(newTrip);
    return newTrip;
   }

    async deleteTrip(id: string, tx?: any): Promise<void> {
      const index = this._trips.findIndex(trip => trip.id === id);
      if (index === -1) {
        throw new Error(`Trip with ID ${id} not found`);
      }
  
      this._trips.splice(index, 1); // Remove the trip
    }
}