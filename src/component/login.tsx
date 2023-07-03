import { useSession, signIn, signOut } from "next-auth/react";
import { redirect } from 'next/navigation';
import { Button } from "semantic-ui-react";

export default function Login() {
    const {data: session, status} = useSession();
    console.log("session: ", session);
    const loading = status === "loading";
    if (status === "authenticated" && session.user) {
        return (
            <>
                Signed in as {session.user.email} <br />
                <Button className="home-login-btn" variant='contained' href='/org' color="blue">To Organizations</Button>
                <Button onClick={() => signOut()} color="orange">Sign out</Button>
            </>
        )
    }
    return (
        <>
            Please log in <br />
            <Button onClick={() => signIn()} color="blue">Sign in</Button>
        </>
    )
}