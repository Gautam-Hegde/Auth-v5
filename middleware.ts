import authConfig from "./auth.config";
import NextAuth from "next-auth";

const {auth} = NextAuth(authConfig);

export default auth((req) => {
  // req.auth
  const isLogged = !!req.auth  // !! to make it boolean
  console.log("Route : ",req.nextUrl.pathname);
  
  console.log("isLogged:  ", isLogged)
})


export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"], //clerk auth docs
}
// export const config = {
//   matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
// }