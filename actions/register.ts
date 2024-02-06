"use server";
import { RegisterSchema } from '@/schemas';
import {z} from 'zod';
import bcrypt from 'bcrypt';
import { db } from '@/lib/db';



export const register = async (values:z.infer<typeof RegisterSchema>) =>{
// console.log("Login action", values);

const valid = RegisterSchema.safeParse(values);
if(!valid.success){
    return {error: "Invalid data"};

}

const {email, password,name} = valid.data;
const hashedPassword = await bcrypt.hash(password, 10);

const existingUser = await db.user.findUnique({
    where: {
        email,
    }
});

if(existingUser){
    return {error: "User already exists"};
}
await db.user.create({

    data: {
        email,
        password: hashedPassword,
        name,
    }
});

return {success: "User registered successfully"};


}