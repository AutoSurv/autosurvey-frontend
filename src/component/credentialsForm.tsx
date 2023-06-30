import { signIn } from "next-auth/react";


export function CredentialsForm() {
  return(

    
    <button onClick={() => signIn()}>Sign in</button>
  )
}