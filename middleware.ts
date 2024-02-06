import authConfig from "./auth.config";
import NextAuth from "next-auth";



import {
   DEFAULT_REDIRECT,
    apiAuthPrefix,
    authRoutes,
    publicRoutes,
} from "./routes"

const {auth} = NextAuth(authConfig);

export default auth((req) => {
    const isLoggedIn = !!req.auth;
    const {nextUrl} = req;

    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
    const isAuthRoute = authRoutes.includes(nextUrl.pathname);
    const isPublicRoute = publicRoutes.includes(nextUrl.pathname);

    if(isApiAuthRoute){
        return null;
    }

    if(isAuthRoute){
       if(isLoggedIn){
           return Response.redirect(new URL(DEFAULT_REDIRECT,nextUrl));
       }
       return null;
    }
    if(!isPublicRoute && !isLoggedIn){
        return Response.redirect(new URL("/auth/login",nextUrl));
    }
    return null;
});


export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"], //clerk auth docs
}
// export const config = {
//   matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
// }