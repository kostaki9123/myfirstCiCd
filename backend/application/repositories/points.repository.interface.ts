import { Point, PointInsert } from '../../entities/models/point';

export interface IPointsRepository {
  createPoint(point: PointInsert, tx?: any): Promise<Point>;
  getPoint(pointId: string): Promise<Point | undefined>;
  getPointsForUser(tripId: string): Promise<Point[]>;
  updatePoint(id: string, input: Partial<PointInsert>, tx?: any): Promise<Point>;
  deletePoint(id: string, tx?: any): Promise<void>;
  //move point
}