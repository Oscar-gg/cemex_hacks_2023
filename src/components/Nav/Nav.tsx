import NavDesktop from "./NavDesktop"
import NavMobile from "./NavMobile";


const Nav = () => {
    const routes = [
        { title: "Dashboard", route: "dashboard", path: "/dashboard" },
        { title: "Monitoreo", route: "monitoreo", path: "/monitoreo" },
        { title: "Movilidad", route: "movilidad", path: "/movilidad" },
        { title: "Residuos", route: "residuos", path: "/residuos" },
    ]
    return (
        <div className="z-50 fixed h-min top-0 w-full font-sans">
            <NavDesktop routes={routes} />
            <NavMobile routes={routes} />
        </div>
    )
}

export default Nav;