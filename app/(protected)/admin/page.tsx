import { RoleGate } from "@/components/auth/role-gate";
import { FormSuccess } from "@/components/form-success";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { UserRole } from "@prisma/client";


const AdminPage = async () => {
 
  return (
    <Card className="w-[400px] ">
      <CardHeader>
        <p className="text-2xl font-semibold text-center">Admin</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <RoleGate allowedRole={UserRole.ADMIN}>
            <FormSuccess message="You have access"/>
        </RoleGate>
      </CardContent>
    </Card>
  );
};

export default AdminPage;
