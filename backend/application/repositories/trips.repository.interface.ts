import { Trip, TripInsert } from '../../entities/models/trip';

export interface ITripsRepository {
  createTrip(trip: TripInsert, tx?: any): Promise<Trip>;
  getTrip(id: string): Promise<Trip | undefined>;
  getTripsForUser(userId: string): Promise<Trip[]>;
  updateTrip(id: string, input: Partial<TripInsert>, tx?: any): Promise<Trip>;
  deleteTrip(id: string, tx?: any): Promise<void>;
}