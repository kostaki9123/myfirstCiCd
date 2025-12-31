import { IPlaceRepository } from "../../application/repositories/place.repository.interface";

export class MockPlaceRepository implements IPlaceRepository {
  private notes: string[] = [];

   updateNote(id: string, notes: string, tx?: any): Promise<any> {
     
      return  
  }

}