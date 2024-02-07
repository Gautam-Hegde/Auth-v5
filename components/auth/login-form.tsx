"use client";
import { CardWrapper } from "./card-wrapper"

import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { LoginSchema } from "@/schemas"
import { useSearchParams } from "next/navigation";

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "../ui/button";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
import { login } from "@/actions/login";
import { useState } from "react";



export const LoginForm = ()=>{


    const searchParams = useSearchParams();
    const urlError = searchParams.get("error")==="OAuthAccountNotLinked"? "Email is already registered with another account": "";

    const [error, setError] = useState<string|undefined>("")
    const [success, setSuccess] = useState<string|undefined>("")

    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: "",
        }
    })

    const onSubmit = (data: z.infer<typeof LoginSchema>)=>{
        setError("");
        setSuccess("");

        // console.log(data);
        login(data).then((data)=>{
                setError(data?.error);
                // setSuccess(data?.success)
        });
    }


    return(
        <CardWrapper
        headerLabel="Welcome Back"
        backButtonLabel="Create an account"
        backButtonHref="/auth/register"
        showSocial
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
                        <FormField
                        control={form.control}
                        name="password"
                        render={({field})=>(
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input {...field} type="password"
                                    placeholder="********"
                                    />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                        />
                    </div>
                    <FormError message={error || urlError}/>
                    <FormSuccess message={success}/>
                <Button type="submit" className="w-full">
                    Login
                </Button>
                </form>
           </Form>
        </CardWrapper>
    )
}