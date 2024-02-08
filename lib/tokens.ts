import { v4 as uuid } from "uuid"
import { getVerificationTokenByEmail } from "../data/verification-token";

import { db } from "@/lib/db";
import { getPasswordResetTokenByEmail } from "@/data/password-reset-token";

export const generatePasswordResetToken = async (email: string) => {
    const token = uuid();
    const expires = new Date(new Date().getTime() +  60 * 60 * 1000); //expires in 1 hour

    const existingToken = await getPasswordResetTokenByEmail(email);

    if(existingToken){
            await db.passwordResetToken.delete({
                where: {
                    id: existingToken.id,
                },
            })
        }

        const passwordResetToken = await db.passwordResetToken.create({
            data: {
              email,
              token,    
              expires,
            },
        })
        return passwordResetToken;
}



export const generateVerificationToken = async (email: string) => {
    const token = uuid();
    const expires = new Date(new Date().getTime() +  60 * 60 * 1000); //expires in 1 hour

    const existingToken = await getVerificationTokenByEmail(email);

    if(existingToken){
            await db.verificationToken.delete({
                where: {
                    id: existingToken.id,
                },
            })
        }

        const verificationToken = await db.verificationToken.create({
            data: {
                token,
                expires,
                email,
            },
        })
        return verificationToken;
    
    }

   