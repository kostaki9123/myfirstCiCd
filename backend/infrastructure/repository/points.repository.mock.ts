import { IPointsRepository } from "../../application/repositories/points.repository.interface";
import { PointInsert, Point } from "../../entities/models/point";
import { DatabaseOperationError } from "../../entities/errors/common";

export class MockPointsRepository implements IPointsRepository {
  private points: Point[] = [];

  async createPoint(input: PointInsert): Promise<Point> {
    const newPoint: Point = {
      id: (Math.random() * 1000000).toFixed(0),
      tripId: input.tripId,
      role: input.role,
      index: input.index,
      place: input.place ,
      from: input.from ,
      to: input.to ,
      startDate: input.startDate ,
      endDate: input.endDate ,
      departureDate: input.departureDate ,
      notes: input.notes ,
      transportType: input.transportType ,
    };
    this.points.push(newPoint);
    return Promise.resolve(newPoint);
  }

  async updatePoint(pointId: string, input: Partial<PointInsert>): Promise<Point> {
    const index = this.points.findIndex((p) => p.id === pointId);
    if (index === -1) throw new DatabaseOperationError(`Point with ID ${pointId} not found`);

    const existing = this.points[index];
    const updated: Point = {
      ...existing,
      ...input,
      place: input.place ?? existing.place,
      from: input.from ?? existing.from,
      to: input.to ?? existing.to,
      startDate: input.startDate ?? existing.startDate,
      endDate: input.endDate ?? existing.endDate,
      departureDate: input.departureDate ?? existing.departureDate,
      notes: input.notes ?? existing.notes,
      transportType: input.transportType ?? existing.transportType,
    };

    this.points[index] = updated;
    return Promise.resolve(updated);
  }

  async deletePoint(pointId: string): Promise<void> {
  // 1. Find the point to delete
  const idx = this.points.findIndex((p) => p.id === pointId);
  if (idx === -1) {
    throw new DatabaseOperationError(`Point with ID ${pointId} not found`);
  }

  // 2. Remove the point from the array
  const deletedPoint = this.points.splice(idx, 1)[0];

  // 3. Only reassign indexes for points of the same trip (if you have tripId)
  const tripId = deletedPoint.tripId;

  const sameTripPoints = this.points
    .filter((p) => p.tripId === tripId)
    .sort((a, b) => a.index - b.index);

  for (let i = 0; i < sameTripPoints.length; i++) {
    // Update the index in the main array
    const p = sameTripPoints[i];
    const realIndex = this.points.findIndex((x) => x.id === p.id);
    if (realIndex !== -1) {
      this.points[realIndex].index = i;
    }
  }

  return;
}


  async getPoint(pointId: string): Promise<Point | undefined> {
    const point = this.points.find((p) => p.id === pointId);
    if (!point) throw new DatabaseOperationError(`Point with ID ${pointId} not found`);
    return Promise.resolve(point);
  }

  async getPointsForUser(tripId: string): Promise<Point[]> {
    const points = this.points.filter((p) => p.tripId === tripId);
    return Promise.resolve(points);
  }

  async updateMany(points: Point[]): Promise<void> {
    try {
      for (const updated of points) {
        const index = this.points.findIndex((p) => p.id === updated.id);
        if (index === -1) {
          throw new DatabaseOperationError(`Point with ID ${updated.id} not found`);
        }

        // only update the index (same behavior as Prisma version)
        this.points[index].index = updated.index;
      }

      return Promise.resolve();
    } catch (err) {
      throw err;
    }
   }
}
