"use server";
import { LoginSchema } from '@/schemas';
import {z} from 'zod';
import { signIn } from '@/auth';
import { DEFAULT_REDIRECT } from '@/routes';
import { AuthError } from 'next-auth';
import { CredentialsSignin } from '@auth/core/errors';
import { getUserByEmail } from '@/data/user';
import { generateVerificationToken,generateTwoFactorToken } from '@/lib/tokens';
import { sendVerificationMail,sendTwoFactorMail } from '@/lib/mail';
import { getTwoFactorTokenByEmail } from '@/data/two-factor-token';
import { db } from '@/lib/db';
import { getTwoFactorConfirmationByUserId } from '@/data/two-factor-confirmation';



export const login = async (values:z.infer<typeof LoginSchema>) =>

{
// console.log("Login action", values);

const valid = LoginSchema.safeParse(values);
if(!valid.success){
    return {error: "Invalid data"};

}
const {email,password,code}=valid.data;

const existingUser = await getUserByEmail(email);

if(!existingUser || !existingUser.password || !existingUser.email){
    return {error: "Invalid credentials"};
}

if(!existingUser.emailVerified){
    const verificationToken = await generateVerificationToken(existingUser.email);
    // console.log(existingUser);
    await sendVerificationMail(existingUser.email, verificationToken.token);
    return {success: "Confirm your email!"};
}

if(existingUser.isTwoFactorEnabled && existingUser.email){
    if(code){
        const twoFactorToken = await getTwoFactorTokenByEmail(existingUser.email);
        if(!twoFactorToken || twoFactorToken.token !== code){
            return {error: "Invalid two factor code"};
        }
        const hasExpired = new Date(twoFactorToken.expires)< new Date();

        if(hasExpired){
            return {error: "Two factor code has expired"};
        }

        await db.twoFactorToken.delete({
            where: {id: twoFactorToken.id}
        })

        const existingConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id);

        if(existingConfirmation){
            await db.twoFactorConfirmation.delete({
                where: {id: existingConfirmation.id}
            })
        }

        await db.twoFactorConfirmation.create({
            data: {
                userId: existingUser.id
            }
        })
    }
    else{
        const twoFactorToken = await generateTwoFactorToken(existingUser.email);

        await sendTwoFactorMail(existingUser.email, twoFactorToken.token);

        return {twoFactor : true};
    }

}


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