import NextAuth from "next-auth"
import authConfig from "./auth.config"
import {PrismaAdapter} from "@auth/prisma-adapter"
import { getUserById } from "./data/user"
import { JWT } from "next-auth/jwt"
import { db } from "./lib/db"


declare module "next-auth" {
  interface Session {
    /** The user's postal address. */
  user:{
    role: "ADMIN" | "USER";
    // customField: string;
  }
  }
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `auth`, when using JWT sessions */
  interface JWT {
    role?: "ADMIN" | "USER";
  }
}



export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  callbacks: {
    async session({session, token}){
      // console.log("session callback", token);
      
      if(token.sub && session.user) {
        session.user.id = token.sub;
      }


      if(token.role && session.user){
        session.user.role = token.role;
      }
      // session.user.customField="custom"
      return session;
    },
    async jwt({token}){
      // console.log("jwt callback", token);
      if(!token.sub) return token;

      const existingUser = await getUserById(token.sub);
      if(existingUser){
      token.role = existingUser.role
      }else{
        return token;
      }
     return token;
    }
    },
    adapter: PrismaAdapter(db),
    session: {strategy: "jwt"},
  ...authConfig,
})