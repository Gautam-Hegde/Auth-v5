import { auth ,signOut} from "@/auth";
import { Button } from "@/components/ui/button";


const settingsPage = async () => {
  const session = await auth();

  return (
    <div>
      {JSON.stringify(session)}

      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <Button variant={"destructive"}>Logout</Button>
      </form>
    </div>
  );
};
export default settingsPage;
