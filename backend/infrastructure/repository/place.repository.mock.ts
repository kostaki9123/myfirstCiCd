import { IPlaceRepository } from "../../application/repositories/place.repository.interface";
import { DatabaseOperationError } from "../../entities/errors/common";
import { Place, PlaceInsert } from "../../entities/models/place";

export class MockPlaceRepository implements IPlaceRepository {
  private places: Place[] = [];

  async createPlace(input: PlaceInsert): Promise<Place> {
    const newPlace: Place = {
      id: input.id ?? (Math.random() * 1_000_000).toFixed(0),
      pointId: input.pointId,
      placeType: input.placeType,
      name: input.name,

      // Prisma-style nullable fields
      stayFrom: null,
      stayUntil: null,
      cost: null,
      notes: null,
      visitDate: null,
      visitTime: null,
    };

    this.places.push(newPlace);
    return newPlace;
  }

  

  async getPlacesForUser(pointId: string): Promise<Place[]> {
    return this.places.filter((p) => p.pointId === pointId);
  }

  async updatePlace(
    placeId: string,
    input: Partial<PlaceInsert>
  ): Promise<Place> {
    const index = this.places.findIndex((p) => p.id === placeId);
    if (index === -1) {
      throw new DatabaseOperationError(`Place with ID ${placeId} not found`);
    }

    const existing = this.places[index];

    const updated: Place = {
      ...existing,
      pointId: input.pointId ?? existing.pointId,
      placeType: input.placeType ?? existing.placeType,
      name: input.name ?? existing.name,
    };

    this.places[index] = updated;
    return updated;
  }

  async deletePlace(
    placeId: string,
    pointId: string
  ): Promise<void> {
    const index = this.places.findIndex(
      (p) => p.id === placeId && p.pointId === pointId
    );

    if (index === -1) {
      throw new DatabaseOperationError(`Place with ID ${placeId} not found`);
    }

    this.places.splice(index, 1);
  }

}
