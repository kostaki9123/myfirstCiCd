import { Trip, TripInsert } from '../../entities/models/trip';

export interface ITodosRepository {
  createTrip(trip: TripInsert, tx?: any): Promise<Trip>;
  getTrip(id: number): Promise<Trip | undefined>;
  getTripsForUser(userId: string): Promise<Trip[]>;
  updateTrip(id: number, input: Partial<TripInsert>, tx?: any): Promise<Trip>;
  deleteTrip(id: number, tx?: any): Promise<void>;
}