import { IUsersRepository } from '../../application/repositories/users.repository.interface';
import { CreateUser, User } from '../../entities/models/user';



export class MockUsersRepository implements IUsersRepository {
  private _users: User[];

  constructor() {
    this._users = [
      {
        id: '1',
        username: 'one',
        email: 'one@gmail.com'
      },
      {
        id: '2',
        username: 'two',
        email: 'two@gmail.com'
      },
      {
        id: '3',
        username: 'three',
        email: 'three@gmail.com'
      },
    ];
  }

  async getUser(id: string): Promise<User | undefined> {
    const user = this._users.find((u) => u.id === id);
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const user = this._users.find((u) => u.username === username);
    return user;
  }

  async createUser(input: CreateUser): Promise<User> {
    const newUser: User = {
      id: input.id,
      username: input.username,
      email:input.email
    };
    
    this._users.push(newUser);
    console.log('user:' ,this._users)
    return newUser;
  }
}