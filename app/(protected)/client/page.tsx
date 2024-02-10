"use client"
import { UserInfo } from "@/components/user-info";
import { useCurrentUser } from "@/hooks/use-current-user";


const ClientPage = () =>{
    const user = useCurrentUser();
    return (
        <div>
            <UserInfo 
            user={user}
            label="Client Component User Info
             "/>
        </div>
    )
}

export default ClientPage;