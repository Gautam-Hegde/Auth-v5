import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

interface FormErrorProps {
    message?: string;
    }

    export const FormError = ({message}:FormErrorProps) =>{
        if(!message) return null;

        return(
            <div className="bg-destructive/15 p-4 rounded-lg flex items-center gap-x-2 text-sm text-destructive">

                    <ExclamationTriangleIcon className="w-5 h-5" />
                    <p>{message}</p>
            </div>
        )
    }