import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { NextAuthOptions } from "next-auth";
import * as bcrypt from "bcrypt";

const BASE_PATH: string = 'http://localhost:8080/api/login'; //db and controller must be created

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: { label: "Username", type: "text", placeholder: "username" },
                password: { label: "Password", type:"password" }
            },
            async authorize(credentials, req) {
                //const secureCredentials = credentials;
                //secureCredentials.password = await bcrypt.hash(credentials?.password as string, 10);


                const response = await fetch(BASE_PATH, {
                    method: 'POST',
                    //password using bcrypt
                    body: JSON.stringify(credentials),
                    headers: { "Content-Type": "application/json" }
                });
                const user = await response.json();

                if(response.ok) {
                    return user;
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
        async jwt({ token }) {
          token.userRole = "admin"
          return token
        },
      },
}


export default NextAuth(authOptions)