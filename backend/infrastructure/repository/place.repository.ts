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
       throw new DatabaseOperationError(`Place not created`);
    }

      return place;
    } catch (err) {
      throw new DatabaseOperationError("Place could not be created");
    }
  }
 

  async getPlacesForUser(pointId: string): Promise<Place[]> {
    return prisma.place.findMany({
      where: { pointId },
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
        where: { internalId : placeId },
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
          internalId : placeId,
          pointId, // ensures ownership
        },
      });
    } catch {
      throw new DatabaseOperationError(`Place with ID ${placeId} not found`);
    }
  }

 
}
