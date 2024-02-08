import { db } from "@/lib/db";

export const getPasswordResetTokenByEmail = async (email: string) => {  
    try{
        const passResetToken = await db.passwordResetToken.findFirst({
            where:{
                email
            }
        })

        return passResetToken;
    }catch{
        return null;
    }
}
  
export const getPasswordResetTokenByToken = async (token: string) => {  
    try{
        const passResetToken = await db.passwordResetToken.findUnique({
            where:{
                token
            }
        })

        return passResetToken;
    }catch{
        return null;
    }


}
  