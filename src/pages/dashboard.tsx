import NavBar from "~/components/NavBar";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Nav from "~/components/Nav/Nav";
import Title from "~/components/general/title";

export default function Dashboard() {
    const { data: sessionData, status } = useSession();
    const router = useRouter();

    // if (!sessionData) {
    //     void router.push("/");
    // }

    return (
        <>
        <Nav />
        <div className="container min-w-full min-h-screen flex flex-col bg-gradient-radial from-sky-100/90 to-white pt-16">
            <div className="pl-10 pt-8">
            <Title title="Dashboard" />
            </div>
            <div className="flex flex-row pt-14 px-20">
                <div className="w-2 bg-stone-700 rounded-sm"></div>
                <p className="text-lg font-semibold text-slate-700 px-6 text-left">
                Smart Resource Manager  es un Building Management System (BMS) que ofrece una revolución en la forma en que las empresas gestionan sus recursos.
                </p>
            </div>
            <div className="flex flex-col md:flex-row items-center justify-center min-w-full gap-10 px-10 py-20">
                <Card text="Monitoreo de Energía" route="/monitoreo"/>
                <Card text="Rutas Inteligentes" route="/movilidad" />
                <Card text="Identificación de Residuos" route="/residuos" />
            </div>
        </div>
        </>
    );
}

interface cardprops {
    text: string,
    route: string
}

function Card({ text, route }: cardprops) {
    const router = useRouter();
    const onClick = () => {
        router.push(route)
        // router.replace("","/monitoreo")
        console.log("refresh")
    }
    return (
        <>
        <div onClick={onClick} className="bg-sky-600/70 px-4 py-4 h-40 w-80 flex flex-row items-center justify-center rounded-xl shadow-lg hover:shadow-xl hover:bg-sky-700/70">
            <h2 className="text-white font-bold px-2 py-2 text-xl">{text}</h2>
        </div>
        </>
    );
}