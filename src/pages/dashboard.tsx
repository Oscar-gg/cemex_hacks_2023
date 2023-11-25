import NavBar from "~/components/NavBar";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function Dashboard() {
    const { data: sessionData, status } = useSession();
    const router = useRouter();

    if (!sessionData) {
        void router.push("/");
    }

    return (
        <>
        <NavBar />
        <div className="container min-w-full min-h-screen flex flex-col bg-gradient-radial from-sky-100/90 to-white">
            <div className="flex flex-row pt-14 px-20">
                <div className="w-2 bg-stone-700 rounded-sm"></div>
                <p className="text-lg font-semibold text-slate-700 px-6 text-left">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Aliquam esse ducimus, voluptatum omnis illo expedita facilis adipisci
                    dignissimos enim recusandae architecto veritatis commodi quibusdam,
                    nihil delectus, quam reprehenderit. Ea, magni!
                </p>
            </div>
            <div className="flex flex-col md:flex-row items-center justify-center min-w-full gap-10 px-10 py-20">
                <Card text="Monitoreo de Energía"/>
                <Card text="Rutas Inteligentes"/>
                <Card text="Identificación de Residuos"/>
            </div>
        </div>
        </>
    );
}

interface cardprops {
    text: string,
}

function Card({ text }: cardprops) {
    return (
        <>
        <div className="bg-sky-600/70 px-4 py-4 h-40 w-80 flex flex-row items-center justify-center rounded-xl shadow-lg hover:shadow-xl hover:bg-sky-700/70">
            <h2 className="text-white font-bold px-2 py-2 text-xl">{text}</h2>
        </div>
        </>
    );
}