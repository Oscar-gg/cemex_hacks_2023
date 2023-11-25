import { signIn, useSession } from "next-auth/react";
import Head from "next/head";

import { api } from "~/utils/api";
import Image from "../images/energy-11.png";
import Arrow from "../images/arrow-white.png";

export default function Home() {
  return (
    <>
      <Head>
        <title>CEMEX Hack</title>
        <meta name="description" content="no se que va aqui sos" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <nav className = "flex flex-row justify-between py-5 bg-sky-900">
            <h1 className="text-white font-extrabold px-16 text-2xl">CEMEX</h1>
            <div className="flex flex-row justify-evenly items-center">
                <p className="text-white hover:text-white/90 pr-16 text-base font-semibold text-right">Sign up</p>
            </div>
      </nav>
      <main className="flex min-h-screen flex-col items-center justify-center px-50 bg-gradient-radial from-sky-100/90 to-white">
          <img className="w-16 h-16" src={Image.src}/>
          <h1 className="text-5xl sm:text-8xl font-bold underline underline-offset-8 decoration-4 decoration-sky-300 text-sky-900 tracking-wide py-2 pt-12">
            CEMEX
          </h1>
          <p className="text-stone-900 text-xl py-4">Mantén un ambiente eficiente</p>
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
    { enabled: sessionData?.user !== undefined }
  );

  return (
    <div className="flex flex-row items-center justify-center">
      <button
        className="flex flex-row items-center justify-center gap-4 rounded-full bg-sky-950 pr-8 pl-10 py-2 text-lg text-white font-semibold hover:bg-sky-800"
        onClick={() => signIn()}
      >
        Log in
        <img className="h-4 w-4" src={Arrow.src}></img>
      </button>
    </div>
  );
}
