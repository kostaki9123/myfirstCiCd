import { Place, PlaceInsert } from "../../entities/models/place";

export interface IPlaceRepository {
  // Create using Google place id + pointId
  createPlace(insert: PlaceInsert): Promise<Place>;

  // Get all places for a point
  getPlacesForPoint(pointId: string): Promise<Place[]>;

  // Update using (pointId + placeId)
  updatePlace(
    pointId: string,
    placeId: string,
    input: Partial<PlaceInsert>,
    tx?: any
  ): Promise<Place>;

  // Delete using (pointId + placeId)
  deletePlace(
    pointId: string,
    placeId: string,
    tx?: any
  ): Promise<void>;
}
