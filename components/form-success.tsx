import { CheckCircledIcon } from "@radix-ui/react-icons";

interface FormSuccessProps {
    message?: string;
    }

    export const FormSuccess = ({message}:FormSuccessProps) =>{
        if(!message) return null;

        return(
            <div className="bg-emerald-600/15 p-4 rounded-lg flex items-center gap-x-2 text-sm text-emerald-500">

                    <CheckCircledIcon className="w-5 h-5" />
                    <p>{message}</p>
            </div>
        )
    }