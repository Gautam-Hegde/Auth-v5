"use server";
import { getUserByEmail } from "@/data/user";
import { sendPasswordResetMail } from "@/lib/mail";
import { generatePasswordResetToken } from "@/lib/tokens";
import { ResetSchema } from "@/schemas";
import * as z from "zod";



export const reset = async (data: z.infer<typeof ResetSchema>) => {
    const valid = ResetSchema.safeParse(data);
    if (!valid.success) {
        return { error: "Invalid Email" };
    }
    const {email} = valid.data;

    const existingUser = await getUserByEmail(email);

    if (!existingUser) {
        return { error: "User not found" };
    }

    const passResetToken = await generatePasswordResetToken(email);
    await sendPasswordResetMail(email, passResetToken.token);
    
    return { success: "Reset link sent to your email" };
}