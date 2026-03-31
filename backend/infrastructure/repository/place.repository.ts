import prisma from "../../../prisma/client";
import { IPlaceRepository } from "../../application/repositories/place.repository.interface";
import { Place, PlaceInsert } from "../../entities/models/place";
import { DatabaseOperationError } from "../../entities/errors/common";

export class PlaceRepository implements IPlaceRepository {

  async createPlace(insert: PlaceInsert): Promise<Place> {
    try {
      console.log( insert.id,insert.pointId, insert.placeType,insert.name)
      return await prisma.place.create({  
        data: {
          id: insert.id,         // Google place id
          pointId: insert.pointId,
          placeType: insert.placeType,
          googleMapLink:insert.googleMapLink,
          name: insert.name,
          latitude : insert.latitude,
          longitude : insert.longitude,
          affiliatelink: insert.affiliatelink
                 
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
    internalId: string,
    input: Partial<PlaceInsert>,
    tx?: any
  ): Promise<Place> {
    const client = tx ?? prisma;

    try {
      return await client.place.update({
        where: {
         internalId : internalId
        },
       data: {
            ...(input.stayFrom != null && { stayFrom: input.stayFrom }),
            ...(input.stayUntil != null && { stayUntil: input.stayUntil }),
            ...(input.visitDate != null && { visitDate: input.visitDate }),
            ...(input.visitTime != null && { visitTime: input.visitTime }),
            ...(input.googleMapLink != null && { googleMapLink: input.googleMapLink }),
            ...(input.cost != null && { cost: input.cost }),
            ...(input.notes != null && { notes: input.notes }),
            ...(input.paymentStatus != null && { paymentStatus: input.paymentStatus }),
          }
      });
    } catch {
      throw new DatabaseOperationError(
        `Place not found for with internalId: ${internalId}`
      );
    }
  }

   async deletePlace(
  pointId: string,
  placeId: string,
  tx?: any
): Promise<void> {
  const client = tx ?? prisma;

  const result = await client.place.deleteMany({
    where: {
      id: placeId,
      pointId: pointId,
    },
  });

  if (result.count === 0) {
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
