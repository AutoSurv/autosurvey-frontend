import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { NextAuthOptions } from "next-auth";
import * as bcrypt from "bcrypt";
import { User } from "@/pages/type/type";

const BASE_PATH: string = 'http://localhost:8080/api/login'; //db and controller must be created

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "email", placeholder: "userExample@domainExample.com" },
                password: { label: "Password", type:"password" }
            },
            async authorize(credentials, req) {
                const secureCredentials = credentials;
                secureCredentials!.password = await bcrypt.hash(credentials?.password as string, 10);

                const response = await fetch(BASE_PATH, {
                    method: 'POST',
                    //password using bcrypt
                    body: JSON.stringify(secureCredentials),
                    headers: { "Content-Type": "application/json" }
                });
                const userResponse = await response.json(); //user must be defined as a type (same as in the userDb)
                //const userInDb = getUserByEmail(secureCredentials.email)
                /*
                  if (user && (bcrypt.compare(userInDb.encPassword, credentials.password))) {
                    const accessToken = signJwtToken(userInDb);
                    const result = {
                        ...userInDb,
                        accessToken
                    };
                    return result; //or new Response(JSON.stringify(result)) 
                }    
                return null; // or new Response(JSON.stringify(null))   

                */
                if(response.ok) {
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
        async jwt({ token, user }) {
            return {...token, ...user}
        },
        async session({session, token}) {
            session.user = token as any;
            return session;
        }
      },
}

export default NextAuth(authOptions)

// const handler = NextAuth(authOptions);

// export { handler as GET, handler as POST}