"use server";

import { getUserByEmail } from "@/data/user";
import { getVerificationTokenByToken } from "@/data/verification-token";
import { db } from "@/lib/db";

export const newVerification = async (token: string) => {
    const existingToken = await getVerificationTokenByToken(token);
    
    if(!existingToken) {
       return {error : "token does not exist" }
    }
    const isExpired = new Date(existingToken.expires)< new Date();
    if(isExpired){
        return {error: "token is expired"}
    }
    const existingUser = await getUserByEmail(existingToken.email);

    if(!existingUser){
        return {error: "user does not exist"}
    }
    await db.user.update({
        where: {id: existingUser.id},
        data: {
            emailVerified: new Date(),
            email: existingToken.email // resue if user has changed email later
        },
    });
    await db.verificationToken.delete({
        where: {id: existingToken.id}
    });
    return {success: "email verified successfully"}
}