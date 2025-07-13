'use server';


import { redirect } from 'next/navigation';
import { signInController } from '../../../backend/interface-adapters/controllers/auth/sign-in.controller';


export async function signIn(userId:string, email:string, username:string ) {
    //const instrumentationService = getInjection('IInstrumentationService');
    //return await instrumentationService.instrumentServerAction(
    //  'signIn',
    //  { recordResponse: true },
        try {
          return await signInController({
            userId,username,email
          });
         
        } catch (err) {
          throw new Error(`Ops something went wrong:'${(err as Error).message}`)
          
        }
  
   //  );
  }