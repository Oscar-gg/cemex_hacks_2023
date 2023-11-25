import { signIn, useSession } from "next-auth/react";
import Head from "next/head";

import { api } from "~/utils/api";
import MapContainer from "./mapa";
import Image from "../images/energy-11.png";
import Arrow from "../images/arrow-white.png";

export default function Home() {
  const { data: sessionData } = useSession();
  return (
    <>
      <Head>
        <title>CEMEX Hack</title>
        <meta name="description" content="no se que va aqui sos" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <nav className="flex flex-row justify-between bg-[#0000B3] py-5">
        {/* <h1 className="px-16 text-2xl font-extrabold text-white">CEMEX</h1> */}
        <img src="/Cemex_logo.png" className="bg-white rounded-md p-2 h-12 ml-2"/>
        <div className="flex flex-row items-center justify-evenly">
          <p className="pr-16 text-right text-base font-semibold text-white hover:text-white/90">
            {sessionData ? `Welcome ${sessionData.user.name}!`: "Sign up"}
          </p>
        </div>
      </nav>
      <main className="px-50 bg-gradient-radial flex min-h-screen flex-col items-center justify-center from-sky-100/90 to-white">
        <img className="h-16 w-16" src={Image.src} />
        <h1 className="py-2 pt-12 text-5xl font-bold tracking-wide text-sky-900 underline decoration-sky-300 decoration-4 underline-offset-8 sm:text-8xl">
          CEMEX
        </h1>
        <p className="py-4 text-xl text-stone-900">
          Mantén un ambiente eficiente
        </p>
        <div className="container flex flex-col items-center justify-center px-4 py-8 ">
          <LoginButton />
        </div>
      </main>
    </>
  );
}

function LoginButton() {
  const { data: sessionData } = useSession();

  const { data: secretMessage } = api.post.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined },
  );

  return (
    <div className="flex flex-row items-center justify-center">
      <button
        className="flex flex-row items-center justify-center gap-4 rounded-full bg-sky-950 py-2 pl-10 pr-8 text-lg font-semibold text-white hover:bg-sky-800"
        onClick={() => signIn()}
      >
        Log in
        <img className="h-4 w-4" src={Arrow.src}></img>
      </button>
    </div>
  );
}
