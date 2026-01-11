import { IPlaceRepository } from "../../application/repositories/place.repository.interface";
import { DatabaseOperationError } from "../../entities/errors/common";
import { Place, PlaceInsert } from "../../entities/models/place";

export class MockPlaceRepository implements IPlaceRepository {
  private places: Place[] = [];

  async createPlace(input: PlaceInsert): Promise<Place> {
    const exists = this.places.some(
      (p) => p.id === input.id && p.pointId === input.pointId
    );

    if (exists) {
      throw new DatabaseOperationError(
        "Place already exists for this point"
      );
    }

    const newPlace: Place = {
      id: input.id,
      pointId: input.pointId,
      placeType: input.placeType,
      name: input.name,

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

  async getPlacesForPoint(pointId: string): Promise<Place[]> {
    return this.places.filter((p) => p.pointId === pointId);
  }

  async updatePlace(
    pointId: string,
    placeId: string,
    input: Partial<PlaceInsert>,
    tx?: any
  ): Promise<Place> {
    const index = this.places.findIndex(
      (p) => p.id === placeId && p.pointId === pointId
    );

    if (index === -1) {
      throw new DatabaseOperationError(
        `Place ${placeId} not found for point ${pointId}`
      );
    }

    const existing = this.places[index];

    const updated: Place = {
      ...existing,
      placeType: input.placeType ?? existing.placeType,
      name: input.name ?? existing.name,
    };

    this.places[index] = updated;
    return updated;
  }

  async deletePlace(
    pointId: string,
    placeId: string,
    tx?: any
  ): Promise<void> {
    const index = this.places.findIndex(
      (p) => p.id === placeId && p.pointId === pointId
    );

    if (index === -1) {
      throw new DatabaseOperationError(
        `Place ${placeId} not found for point ${pointId}`
      );
    }

    this.places.splice(index, 1);
  }

  async deletePlacesByPointId(pointId: string): Promise<void> {
  const initialLength = this.places.length;

  this.places = this.places.filter(
    (p) => p.pointId !== pointId
  );

  if (this.places.length === initialLength) {
    throw new DatabaseOperationError(
      `No places found for point ${pointId}`
    );
  }
}
}
