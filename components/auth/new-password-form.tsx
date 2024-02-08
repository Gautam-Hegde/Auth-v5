"use client";
import { CardWrapper } from "./card-wrapper"

import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"



import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "../ui/button";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
import {reset} from "@/actions/reset";
import { useState } from "react";
import { NewPasswordSchema} from "@/schemas";
import { useSearchParams } from "next/navigation";
import { newPassword } from "@/actions/new-password";



export const NewPasswordForm = ()=>{

    const search = useSearchParams();
    const token = search.get("token");


    const [error, setError] = useState<string|undefined>("")
    const [success, setSuccess] = useState<string|undefined>("")

    const form = useForm<z.infer<typeof NewPasswordSchema>>({
        resolver: zodResolver(NewPasswordSchema),
        defaultValues: {
            password: "",
        }
    })

    const onSubmit = (data: z.infer<typeof NewPasswordSchema>)=>{
        setError("");
        setSuccess("");


        // console.log(data);
        newPassword(data,token).then((data)=>{
                setError(data?.error);
                setSuccess(data?.success)
        });
    }


    return(
        <CardWrapper
        headerLabel="Choose a new password"
        backButtonLabel="back to login"
        backButtonHref="/auth/login"
        >
           <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
                >
                    <div className="space-y-4">
                        <FormField
                        control={form.control}
                        name="password"
                        render={({field})=>(
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input {...field} type="password" placeholder="********"/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                        />
                    </div>
                    <FormError message={error}/>
                    <FormSuccess message={success}/>
                <Button type="submit" className="w-full">
                    Confirm Reset
                </Button>
                </form>
           </Form>
        </CardWrapper>
    )
}