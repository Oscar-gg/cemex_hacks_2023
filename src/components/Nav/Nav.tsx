import NavDesktop from "./NavDesktop"


const Nav = () => {
    const routes = [
        { title: "Main", route: "main", path: "/main" },
        { title: "Monitoreo", route: "monitoreo", path: "/monitoreo" },
        { title: "Movilidad", route: "movilidad", path: "/movilidad" },
        { title: "Residuos", route: "residuos", path: "/residuos" },
    ]
    return (
        <div className="z-50 fixed h-min top-0 w-full font-sans">
            <NavDesktop routes={routes} />
            {/* <NavMobile routes={routes} /> */}
        </div>
    )
}

export default Nav;