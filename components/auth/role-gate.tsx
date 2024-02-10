"use client";

import { useCurrentRole } from "@/hooks/use-current-role";
import { UserRole } from "@prisma/client";
import { FormError } from "../form-error";

interface RolegateProps{
    children: React.ReactNode;
    allowedRole:UserRole;
};

export const RoleGate = (

    {children,
    allowedRole}:RolegateProps
)=>{
    const role = useCurrentRole();
    if(role!==allowedRole)
    return(
            <FormError message="Perms required"/>
    )

    return(
        <>
        {children}
        </>
    )
}
