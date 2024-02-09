"use client";

// import { auth ,signOut} from "@/auth";
import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { logout } from "@/actions/logout";
import { useCurrentUser } from "@/hooks/use-current-user";


const settingsPage = () => {
  // const session = await auth();
 const user = useCurrentUser();

  const onClick =()=>{
    // signOut();
    logout();
  
  }

  return (
    <div className="bg-white p-10 rounded-lg">
      {/* {JSON.stringify(user)} */}
     
        <Button onClick={onClick} variant={"destructive"}>Logout</Button>
      
    </div>
  );
};
export default settingsPage;
