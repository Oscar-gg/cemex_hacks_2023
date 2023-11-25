import { useRouter, usePathname } from "next/navigation";
import NavElement from "./NavElement";
import { BiSolidLeaf } from "react-icons/bi";

interface route {
    title: string;
    route: string;
    path: string;
}

const NavDesktop = ({ routes }: { routes: route[] }) => {
    const router = useRouter();
    const path = usePathname();


    const hanldeClick = (route: string) => {
        router.push(route);
        // setSelected(route);
    }

    return (
        <div className="fixed right-0 left-0 invisible h-0 md:h-auto md:visible flex items-center justify-between mb-8 p-4 pr-4">
            <div className="flex flex-row items-center gap-1">
                <BiSolidLeaf className="text-sky-500"/>
                <h1 className="text-sky-500">
                    Nombre Chido 
                </h1>
            </div>
            <div className="flex flex-row gap-4">      
                {routes.map((route, key) => (
                    // route.title
                    <NavElement key={key} title={route.title} route={route.route} onClick={hanldeClick} selected={path === route.path} mobile />
                ))}
            </div>

        </div>
    )
}

export default NavDesktop;