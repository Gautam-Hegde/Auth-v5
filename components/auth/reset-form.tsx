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
import { ResetSchema } from "@/schemas";



export const ResetForm = ()=>{


    const [error, setError] = useState<string|undefined>("")
    const [success, setSuccess] = useState<string|undefined>("")

    const form = useForm<z.infer<typeof ResetSchema>>({
        resolver: zodResolver(ResetSchema),
        defaultValues: {
            email: "",
        }
    })

    const onSubmit = (data: z.infer<typeof ResetSchema>)=>{
        setError("");
        setSuccess("");


        // console.log(data);
        reset(data).then((data)=>{
                setError(data?.error);
                setSuccess(data?.success)
        });
    }


    return(
        <CardWrapper
        headerLabel="Forgot Password?"
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
                        name="email"
                        render={({field})=>(
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input {...field} type="email"
                                    placeholder="gautam@example.com"
                                    />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                        />
                    </div>
                    <FormError message={error}/>
                    <FormSuccess message={success}/>
                <Button type="submit" className="w-full">
                    Reset Password
                </Button>
                </form>
           </Form>
        </CardWrapper>
    )
}