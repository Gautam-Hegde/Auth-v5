import { UserRole } from '@prisma/client';
import path from 'path';
import * as z from 'zod';

export const SettingsSchema = z.object({
    name : z.optional(z.string()),
    isTwoFactorEnabled: z.optional(z.boolean()),
    role: z.enum([UserRole.ADMIN,UserRole.USER]),
    email: z.optional(z.string().email()),
    password: z.optional(z.string().min(8)),
    newPassword: z.optional(z.string().min(8)),
}).refine((data)=>{
    if(data.password && !data.newPassword){
        return false;
    }
    if(!data.password && data.newPassword){
        return false;
    }
    return true;
},{message: 'New Password required',path:['newPassword']})


export const NewPasswordSchema = z.object({
    password: z.string().min(8,{
        message: 'Minimum 8 characters is required'
    })
});
export const ResetSchema = z.object({
    email: z.string().email({
        message: 'Email is required'
    }),
});
export const LoginSchema = z.object({
    email: z.string().email({
        message: 'Email is required'
    }),
    password: z.string().min(1,{
        message: 'Password is required'
    }),
    code: z.optional(z.string())
});
export const RegisterSchema = z.object({
    email: z.string().email({
        message: 'Email is required'
    }),
    password: z.string().min(8,{
        message: 'Minimum 8 characters required'
    }),
    name: z.string().min(1,{
        message: 'Name is required'
    })
});
