"use client";
import { FaUserAlt } from "react-icons/fa";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  

  import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useCurrentUser } from "@/hooks/use-current-user";
import { LogoutButton } from "./logout-button";

  export const UserButton = () => {

    const user = useCurrentUser();
return(
    <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar>
            <AvatarImage src={user?.image || ""}/>
            <AvatarFallback>
              <FaUserAlt />
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="center">
          <DropdownMenuItem>
          <LogoutButton>
            Logout
          </LogoutButton>
          </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
)

  }
