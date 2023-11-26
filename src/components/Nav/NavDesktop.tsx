import { useRouter, usePathname } from "next/navigation";
import NavElement from "./NavElement";
import { BiSolidLeaf } from "react-icons/bi";
import { signIn, signOut, useSession } from "next-auth/react";

interface route {
    title: string;
    route: string;
    path: string;
}

const NavDesktop = ({ routes }: { routes: route[] }) => {
    const router = useRouter();
    const path = usePathname();
    const { data: sessionData, status } = useSession();
    
    const hanldeClick = (route: string) => {
        console.log(route)
        router.push(route);
    }
    //bg-sky-900 text-sky-500

    return (
        <div className="fixed right-0 left-0 invisible h-0 md:h-auto md:visible flex items-center justify-between mb-8 p-4 pr-4 bg-sky-900">
            <div className="flex flex-row items-center gap-1">
                <BiSolidLeaf className="text-sky-500"/>
                <h1 className="text-white text-lg font-medium">
                    Smart Resourse Management
                </h1>
            </div>
            <div className="flex flex-row items-center gap-4">
                <div className="flex flex-row gap-4">      
                    {routes.map((route, key) => (
                        <NavElement key={key} title={route.title} route={route.route} onClick={hanldeClick} selected={path === route.path} mobile />
                        ))}
                </div>
                {/* <p className="pr-1 text-right text-base font-semibold text-neutral-600 hover:text-white/90" onClick={() => signIn()}>
                    {sessionData ? `Welcome ${sessionData.user.name}!` : "Sign up"}
                </p> */}
                {sessionData && <p className="text-right text-base font-semibold rounded-full px-4 py-1 bg-sky-400 text-white hover:text-white/90" onClick={() => signOut()}>Sign out</p>}
            </div>

        </div>
    )
}

export default NavDesktop;