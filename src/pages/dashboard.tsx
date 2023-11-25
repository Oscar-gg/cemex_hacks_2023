import NavBar from "~/components/NavBar";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { router } from "@trpc/server";

export default function Dashboard() {
    const { data: sessionData, status } = useSession();
    const router = useRouter();

    if (!sessionData) {
        void router.push("/");
    }

    return (
        <>
        <NavBar />
        <div className="absolute inset-0 bg-cover bg-center z-[-1]">
          <img
            src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimage.freepik.com%2Ffree-vector%2Fblue-pink-halftone-background_53876-99004.jpg&f=1&nofb=1&ipt=7f63a6a474411a04136290329f568a99c5ed3e2b0e6358792310beb6750e9009&ipo=images"  
            alt="Background"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container min-w-full min-h-screen flex flex-col">
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
                <Card text="Monitoreo de Energía" page="/monitoreo"/>
                <Card text="Rutas Inteligentes" page="/movilidad"/>
                <Card text="Identificación de Residuos" page="/residuos"/>
            </div>
        </div>
        </>
    );
}

interface cardprops {
    text: string;
    page: string;
}

function Card({ text, page }: cardprops) {
    const router2 = useRouter();
    const navigate = () => {
        void router2.push(page);
    };

    return (
        <>
        <div className="bg-sky-600/70 px-4 py-4 h-40 w-80 flex flex-row items-center justify-center rounded-xl shadow-lg hover:shadow-xl hover:bg-sky-700/70" onClick={navigate}>
            <h2 className="text-white font-bold px-2 py-2 text-xl">{text}</h2>
        </div>
        </>
    );
}