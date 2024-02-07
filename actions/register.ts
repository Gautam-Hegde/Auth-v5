"use server";
import { RegisterSchema } from '@/schemas';
import {z} from 'zod';
import bcrypt from 'bcryptjs';
import { db } from '@/lib/db';
import { getUserByEmail } from '@/data/user';
import { generateVerificationToken } from '@/lib/tokens';


export const register = async (values:z.infer<typeof RegisterSchema>) =>{
// console.log("Login action", values);

const valid = RegisterSchema.safeParse(values);
if(!valid.success){
    return {error: "Invalid data"};

}

const {email, password,name} = valid.data;
const hashedPassword = await bcrypt.hash(password, 10);

const existingUser = await getUserByEmail(email);


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


//send verification token

const verificationToken = await generateVerificationToken(email);

return {success: "Confirm your email!"};


}