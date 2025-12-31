
export interface IPlaceRepository {
  updatePlace(id: string,notes: string, tx?: any): Promise<any>;
}