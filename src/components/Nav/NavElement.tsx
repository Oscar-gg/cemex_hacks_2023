import clsx from "clsx";

interface NavElementProps {
    title: string;
    route: string;
    selected: boolean;
    onClick: (route: string) => void;
    mobile?: boolean;
}

const NavElement: React.FC<NavElementProps> = ({ title, route, onClick, selected, mobile }) => {

    return (
        <div className="z-50 flex flex-row gap-2 items-center text-white" onClick={() => onClick(route)}>
            {/* {title} */}



            {mobile ? (
                <h1 className={clsx(selected ? "text-white underline" : "text-white ",
                    "text-lg hover:underline")} >
                    {title}
                </h1>
            ) : (

                <h1 className={clsx(selected && "underline underline-offset-8")} >
                    {title}
                </h1>
            )
            }

        </div>
    )
}

export default NavElement;