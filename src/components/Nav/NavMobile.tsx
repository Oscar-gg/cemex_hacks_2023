import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";
import NavElement from "./NavElement";

interface route {
    title: string;
    route: string;
    path: string;
}

const NavMobile = ({ routes }: { routes: route[] }) => {
    const router = useRouter();
    const path = usePathname();
    const [open, setOpen] = useState(false);


    const hanldeClick = (route: string) => {
        router.push(route);
    }


    return (
        <div className="md:invisible w-full z-50 bg-secondary border-b fixed top-0 right-0 left-0 text-white text-2xl bg-emerald-400 bg-opacity-95" onClick={() => setOpen(!open)}>
            <div className="z-50 flex flex-row justify-between px-4 pt-3">
                {/* <FiMenu className="pb-3 text-4xl" /> */}

            </div>

            {open && (
                <>
                    <div className="z-50 flex flex-col items-center py-4 px-5 bg-custom-dark-gray w-full">


                        {routes.map((route, key) => (
                            <NavElement key={key} title={route.title} route={route.route} onClick={hanldeClick} selected={path === route.path} mobile />
                        ))}
                        {/* <AuthButton mobile /> */}

                    </div>
                </>
            )}
        </div>

    )
}

export default NavMobile;