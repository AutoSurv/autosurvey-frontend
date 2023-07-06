import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { NextAuthOptions } from "next-auth";
//import * as bcrypt from "bcrypt";
import { AuthenticatedUser, User } from "@/pages/type/type";

const BASE_PATH: string = 'http://localhost:8080/authenticate'; //db and controller must be created

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                //email: { label: "Email", type: "email", placeholder: "userExample@domainExample.com" },
                username: { label: "User name", type: "text", placeholder: "userExample@domainExample.com" },

                password: { label: "Password", type:"password" }
            },
            async authorize(credentials) {

                const response = await fetch(BASE_PATH, {
                    method: 'POST',
                    body: JSON.stringify(credentials),
                    headers: { "Content-Type": "application/json" }
                });
                const userResponse = await response.json();
                const authUser: AuthenticatedUser = JSON.parse(JSON.stringify(userResponse))
                console.log("authUSer: ", authUser);
        
                if(response.ok) {
                    console.log("userResponse: ", JSON.parse(JSON.stringify(userResponse)));
                    return userResponse;
                }
                return null;
            }
        }),
         GoogleProvider({
            clientId: process.env.GOOGLE_ID as string,
            clientSecret: process.env.GOOGLE_SECRET as string
        }) 
    ],

    secret: process.env.NEXT_PUBLIC_SECRET,
    session: {
        strategy: "jwt",
    },
     callbacks: {
        async session({session, token}) {
            session.user.accessToken = token as any;
            return session;
        }
      }, 
}

export default NextAuth(authOptions)

// const handler = NextAuth(authOptions);

// export { handler as GET, handler as POST}