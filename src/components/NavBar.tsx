import { sign } from "crypto";
import { signIn, useSession, signOut } from "next-auth/react";

export default function NavBar() {
    const { data: sessionData, status } = useSession();

    return (
        <nav className="flex flex-row justify-between bg-sky-900 py-5">
            <img
                src="/Cemex_logo.png"
                className="ml-2 h-12 rounded-md bg-white p-2"
            />
            <div className="flex flex-row items-center justify-evenly">
                <p className="pr-16 text-right text-base font-semibold text-white hover:text-white/90" onClick={() => signIn()}>
                    {sessionData ? `Welcome ${sessionData.user.name}!` : "Sign up"}
                </p>
                {sessionData && <p className="pr-16 text-right text-base font-semibold text-white hover:text-white/90" onClick={() => signOut()}>Sign out</p>}
            </div>
        </nav>
    );
}