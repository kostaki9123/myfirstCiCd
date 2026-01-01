import prisma from "../../../prisma/client";
import { IPlaceRepository } from "../../application/repositories/place.repository.interface";
import { Place, PlaceInsert } from "../../entities/models/place";
import { DatabaseOperationError } from "../../entities/errors/common";

export class PlaceRepository implements IPlaceRepository {

  async createPlace(insert: PlaceInsert): Promise<Place> {
    try {
      const place = await prisma.place.create({
        data: {
          id: insert.id,
          pointId: insert.pointId,
          placeType: insert.placeType,
          name: insert.name,
        },
      });

    if (!place) {
       throw new DatabaseOperationError(`Place with ID  not found`);
     }

      return place;
    } catch (err) {
      throw new DatabaseOperationError("Place could not be created");
    }
  }

  async getPlace(placeId: string): Promise<Place | undefined> {
    const place = await prisma.place.findUnique({
      where: { id: placeId },
    });

    if (!place) {
      throw new DatabaseOperationError(`Place with ID ${placeId} not found`);
    }

    return place;
  }

  async getPlacesForUser(pointId: string): Promise<Place[]> {
     console.log('pointId repo' , pointId)
    return prisma.place.findMany({
      where: { pointId : pointId },
      orderBy: { id: "asc" },
    });
  }

  async updatePlace(
    placeId: string,
    input: Partial<PlaceInsert>,
    tx?: any
  ): Promise<Place> {
    const client = tx ?? prisma;

    try {
      return await client.place.update({
        where: { id: placeId },
        data: {
          pointId: input.pointId,
          placeType: input.placeType,
          name: input.name,
        },
      });
    } catch {
      throw new DatabaseOperationError(`Place with ID ${placeId} not found`);
    }
  }

  async deletePlace(
    placeId: string,
    pointId: string,
    tx?: any
  ): Promise<void> {
    const client = tx ?? prisma;

    try {
      await client.place.delete({
        where: {
          id: placeId,
          pointId, // ensures ownership
        },
      });
    } catch {
      throw new DatabaseOperationError(`Place with ID ${placeId} not found`);
    }
  }

  async updateMany(places: Place[]): Promise<void> {
    try {
      await prisma.$transaction(
        places.map((place) =>
          prisma.place.update({
            where: { id: place.id },
            data: {
              pointId: place.pointId,
              placeType: place.placeType,
              name: place.name,
            },
          })
        )
      );
    } catch {
      throw new DatabaseOperationError("Failed to update places");
    }
  }
}
