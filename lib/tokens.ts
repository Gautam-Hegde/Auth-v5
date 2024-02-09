import crypto from "crypto";
import { v4 as uuid } from "uuid"
import { getVerificationTokenByEmail } from "../data/verification-token";

import { db } from "@/lib/db";
import { getPasswordResetTokenByEmail } from "@/data/password-reset-token";
import { getTwoFactorTokenByEmail } from "@/data/two-factor-token";

export const generateTwoFactorToken = async (email: string) => {
    const token = crypto.randomInt(100000, 1000000).toString()
    const expires = new Date(new Date().getTime() +  10 * 60 * 1000); //expires in 10 min

    const existingToken = await getTwoFactorTokenByEmail(email);

    if(existingToken){
            await db.twoFactorToken.delete({
                where: {
                    id: existingToken.id,
                },
            })
        }

        const twoFactorToken = await db.twoFactorToken.create({
            data: {
                email,
                token,
                expires,
            },
        })
        return twoFactorToken;
}


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

   