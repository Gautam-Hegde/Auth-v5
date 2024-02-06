import { CardWrapper } from "./card-wrapper"

export const LoginForm = ()=>{
    return(
        <CardWrapper
        headerLabel="Welcome Back"
        backButtonLabel="Create an account"
        backButtonHref="/auth/register"
        showSocial
        >
           Login Form
        </CardWrapper>
    )
}