import { signOut } from "next-auth/react";

export default function CenterPage() {
  return (
    <>
      <nav className="flex flex-row justify-between py-5 bg-sky-900">
        <h1 className="text-white font-extrabold px-16 text-2xl">CEMEX</h1>
        <div className="flex flex-row justify-evenly items-center">
          <p className="text-white hover:text-white/90 px-10 text-base font-semibold text-right">
            Perfil
          </p>
          <p
            className="text-white hover:text-white/90 pr-16 text-base font-semibold text-right"
            onClick={() => void signOut()}
          >
            Sign Out
          </p>
        </div>
      </nav>
      <div
        className="container min-w-full min-h-screen flex flex-col bg-gradient-radial from-sky-100/90 to-white"
        style={{ backgroundImage: 'url("https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimage.freepik.com%2Ffree-vector%2Fblue-pink-halftone-background_53876-99004.jpg&f=1&nofb=1&ipt=7f63a6a474411a04136290329f568a99c5ed3e2b0e6358792310beb6750e9009&ipo=images")', backgroundSize: 'cover' }}
      >
        <div className="flex flex-row pt-14 px-20">
          <div className="w-2 bg-stone-700 rounded-sm"></div>
          <p className="text-lg font-semibold text-slate-700 px-6 text-left">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam esse ducimus,
            voluptatum omnis illo expedita facilis adipisci dignissimos enim recusandae
            architecto veritatis commodi quibusdam, nihil delectus, quam reprehenderit. Ea,
            magni!
          </p>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-center min-w-full gap-10 px-10 py-20">
          <Card text="Monitoreo de Energía" />
          <Card text="Rutas Inteligentes" />
          <Card text="Identificación de Residuos" />
        </div>
      </div>
    </>
  );
}

interface cardprops {
  text: string;
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
