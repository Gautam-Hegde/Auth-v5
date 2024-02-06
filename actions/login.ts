"use server";
import { LoginSchema } from '@/schemas';
import {z} from 'zod';
import { signIn } from '@/auth';
import { DEFAULT_REDIRECT } from '@/routes';
import { AuthError } from 'next-auth';
import { CredentialsSignin } from '@auth/core/errors';
export const login = async (values:z.infer<typeof LoginSchema>) =>

{
// console.log("Login action", values);

const valid = LoginSchema.safeParse(values);
if(!valid.success){
    return {error: "Invalid data"};

}
const {email,password}=valid.data;

try {
    await signIn("credentials", {
        email,
        password,
        redirectTo: DEFAULT_REDIRECT,
    });
    } 
    
    
 catch (error) {
    if(error instanceof AuthError){
        switch(error.type){
            case "CredentialsSignin":
                return {error: "Invalid credentials"};
            default:
                return {error: "An error occurred"};
        }

    }
    throw error;    
}

};