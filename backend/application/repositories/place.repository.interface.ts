import { Place, PlaceInsert } from "../../entities/models/place";

export interface IPlaceRepository {
  createPlace(insert : PlaceInsert): Promise<any>;
  getPlace(placeId: string): Promise<Place | undefined>;
  getPlacesForUser(pointId: string): Promise<Place[]>;
  updatePlace(placeid: string, input: Partial<PlaceInsert>, tx?: any): Promise<Place>;
  deletePlace(placeid: string ,tx?: any): Promise<void>;
  updateMany(points: Place[]): Promise<void>;
}