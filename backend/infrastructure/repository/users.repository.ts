
import { DatabaseOperationError } from '../../entities/errors/common';
import { IUsersRepository } from '../../application/repositories/users.repository.interface';
import { User , CreateUser } from '../../entities/models/user';
import prisma from '../../../prisma/client';


export class UsersRepository implements IUsersRepository {

  async getUser(id: string): Promise<User | undefined> {
   
    try {     
      const user = await prisma.user.findFirst({
          where:{
              id : id
          }
      }) 
      
      if(user){
         return user
      }
          
     }catch(err){
      //capture error sentry
      throw err
    }}
          
  async getUserByUsername(username: string): Promise<User | undefined> {
    try {  
      const user = await prisma.user.findFirst({
          where:{
              username : username
          }
      }) 
              

      if(user){
         return user
      }
          
     }catch(err){
      //capture error sentry
      throw err
    }};

          
  async createUser(input: CreateUser): Promise<User> {
   
    try{
      const newUser = await prisma.user.create({
          data:{
              id : input.id,
              username : input.username,
              email: input.email
          }
      })
      
      if(newUser){
         return newUser
      }else{
          throw new DatabaseOperationError("Cannot create user.");
      }
    }catch(err){
      //capture error sentry
      throw err
    }}
}