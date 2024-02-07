import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { CardWrapper } from "./card-wrapper";

export const ErrorCard = () => {
    return(
        <CardWrapper
        headerLabel="Something went wrong 😪"
        backButtonHref="/auth/login"
        backButtonLabel="Back to login?"
        >
            <div className="w-full flex justify-center items-center">
                <ExclamationTriangleIcon className="w-10 h-10 text-destructive"/>
            </div>
        </CardWrapper>
    )
}