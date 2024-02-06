"use client";
import { CardWrapper } from "./card-wrapper"

import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { RegisterSchema } from "@/schemas"

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
import { useState } from "react";
import { register } from "@/actions/register";


export const RegisterForm = ()=>{

    const [error, setError] = useState<string|undefined>("")
    const [success, setSuccess] = useState<string|undefined>("")

    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            email: "",
            password: "",
            name: ""
        }
    })

    const onSubmit = (data: z.infer<typeof RegisterSchema>)=>{
        setError("");
        setSuccess("");

        // console.log(data);
        register(data).then((data)=>{
                setError(data.error);
                setSuccess(data.success)
        });
    }


    return(
        <CardWrapper
        headerLabel="Register Now"
        backButtonLabel="Existing user? Login here."
        backButtonHref="/auth/login"
        showSocial
        >
           <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
                >
                    <div className="space-y-4">
                        <FormField
                        control={form.control}
                        name="name"
                        render={({field})=>(
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input {...field} type="text"
                                    placeholder="Gautam Hegde"
                                    />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                        />
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
                    <FormError message={error}/>
                    <FormSuccess message={success}/>
                <Button type="submit" className="w-full">
                    Register
                </Button>
                </form>
           </Form>
        </CardWrapper>
    )
}