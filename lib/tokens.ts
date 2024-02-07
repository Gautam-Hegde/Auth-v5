import { v4 as uuid } from "uuid"
import { getVerificationTokenByEmail } from "../data/verification-token";
import { db } from "@/lib/db";


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

   