"use server";
import { LoginSchema } from '@/schemas';
import {z} from 'zod';

export const login = async (values:z.infer<typeof LoginSchema>) =>{
// console.log("Login action", values);

const valid = LoginSchema.safeParse(values);
if(!valid.success){
    return {error: "Invalid data"};

}
return {success: "Logged in successfully"};


}