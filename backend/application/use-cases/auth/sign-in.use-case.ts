import { error } from 'console';
import { AuthenticationError } from '../../../entities/errors/auth';
import { UsersRepository } from '../../../infrastructure/repository/users.repository';
import { MockUsersRepository } from '../../../infrastructure/repository/users.repository.mock';
import { IUsersRepository } from '../../repositories/users.repository.interface';

export type ISignInUseCase = ReturnType<typeof signInUseCase>;

export const signInUseCase = async (input: {
  userId: string;
  username: string;
  email: string;
}) => {
  // Choose repository based on environment
  const usersRepository: IUsersRepository =
    process.env.NODE_ENV === 'test'
      ? new MockUsersRepository()
      : new UsersRepository();

  try {

    let existingUser = await usersRepository.getUser(input.userId);

    if (!existingUser) {
      existingUser = await usersRepository.createUser({
        id: input.userId,
        username: input.username,
        email: input.email,
      });
    }

    if (!existingUser) {
    //   console.error('Sign in useCase: User could not be created');
       throw new Error(' User could not be created')
    }
   
     return existingUser;
  } catch (err) {
   // console.error('Sign in use case:',err);
    throw new Error(`Ops something went wrong:'${(err as Error).message}`)
  }
};
