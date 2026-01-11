import prisma from "../../../prisma/client";
import { IPlaceRepository } from "../../application/repositories/place.repository.interface";
import { Place, PlaceInsert } from "../../entities/models/place";
import { DatabaseOperationError } from "../../entities/errors/common";

export class PlaceRepository implements IPlaceRepository {

  async createPlace(insert: PlaceInsert): Promise<Place> {
    try {
      return await prisma.place.create({
        data: {
          id: insert.id,           // Google place id
          pointId: insert.pointId,
          placeType: insert.placeType,
          name: insert.name,
        },
      });
    } catch (err: any) {
      // Prisma unique constraint violation
      if (err.code === "P2002") {
        throw new DatabaseOperationError(
          "This place already exists for this point"
        );
      }
      throw new DatabaseOperationError("Place could not be created");
    }
  }

  async getPlacesForPoint(pointId: string): Promise<Place[]> {
    return prisma.place.findMany({
      where: { pointId },
      orderBy: { internalId : "asc" },
    });
  }

  async updatePlace(
    pointId: string,
    placeId: string,
    input: Partial<PlaceInsert>,
    tx?: any
  ): Promise<Place> {
    const client = tx ?? prisma;

    try {
      return await client.place.update({
        where: {
          pointId_id: {
            pointId,
            id: placeId,
          },
        },
        data: {
           stayFrom: input.stayFrom ?? null,
           stayUntil: input.stayUntil ?? null,
           visitDate: input.visitDate ?? null,
           visitTime: input.visitTime ?? null,
           cost: input.cost ?? null,
           notes: input.notes ?? null,
        },
      });
    } catch {
      throw new DatabaseOperationError(
        `Place ${placeId} not found for point ${pointId}`
      );
    }
  }

  async deletePlace(
    pointId: string,
    placeId: string,
    tx?: any
  ): Promise<void> {
    const client = tx ?? prisma;

    try {
      await client.place.delete({
        where: {
          pointId_id: {
            pointId,
            id: placeId,
          },
        },
      });
    } catch {
      throw new DatabaseOperationError(
        `Place ${placeId} not found for point ${pointId}`
      );
    }
  }

   async deletePlacesByPointId(pointId: string): Promise<void> {
      try {
      await prisma.place.deleteMany({
        where: {
          pointId : pointId,
        },
      });
    } catch {
      throw new DatabaseOperationError(
        `Places not deleted with these pointId: ${pointId}`
      );
    } 
  }

}
