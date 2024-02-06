"use server";
import { RegisterSchema } from '@/schemas';
import {z} from 'zod';

export const register = async (values:z.infer<typeof RegisterSchema>) =>{
// console.log("Login action", values);

const valid = RegisterSchema.safeParse(values);
if(!valid.success){
    return {error: "Invalid data"};

}
return {success: "User registered in successfully"};


}