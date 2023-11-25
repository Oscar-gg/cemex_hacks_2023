import { signIn, useSession, signOut } from "next-auth/react";
import Head from "next/head";

import { api } from "~/utils/api";
import Image from "../images/energy-11.png";
import Arrow from "../images/arrow-white.png";

export default function Home() {
  const { data: sessionData } = useSession();
  const hello = api.post.hello.useQuery({ text: "from tRPC" });
  const mutation = api.api.sendPoints.useMutation({
    onSuccess: (data) => {
      alert(data);
    },
    onError: (error) => {
      alert(error);
    },
  });

  return (
    <>
      <Head>
        <title>CEMEX Hack</title>
        <meta name="description" content="no se que va aqui sos" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <nav className="flex flex-row justify-between bg-sky-900 py-5">
        <img
          src="/Cemex_logo.png"
          className="ml-2 h-12 rounded-md bg-white p-2"
        />
        <div className="flex flex-row items-center justify-evenly">
          <p className="pr-16 text-right text-base font-semibold text-white hover:text-white/90">
            {sessionData ? `Welcome ${sessionData.user.name}!` : "Sign up"}
          </p>
        </div>
      </nav>
      <main className="px-50 bg-gradient-radial flex min-h-screen flex-col items-center justify-center relative">
        <div className="absolute inset-0 bg-cover bg-center z-[-1]">
          <img
            src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimage.freepik.com%2Ffree-vector%2Fblue-pink-halftone-background_53876-99004.jpg&f=1&nofb=1&ipt=7f63a6a474411a04136290329f568a99c5ed3e2b0e6358792310beb6750e9009&ipo=images"  
            alt="Background"
            className="w-full h-full object-cover"
          />
        </div>
        <img className="h-16 w-16" src={Image.src} />
        <h1 className="py-2 pt-12 text-5xl font-bold tracking-wide text-sky-950 underline decoration-sky-300 decoration-4 underline-offset-8 sm:text-8xl">
          CEMEX
        </h1>
        <p className="py-4 text-xl text-stone-900">
          Mantén un ambiente eficiente
        </p>
        <div className="container flex flex-col items-center justify-center px-4 py-8 ">
          {sessionData ? <LogoutButton /> : <LoginButton />}
        </div>
        <button
          onClick={() => {
            mutation.mutate({
              points: [
                { lat: 1, lng: 2, name: "test" },
                { lat: 1, lng: 2, name: "test2" },
              ],
            });
          }}
          className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
        >
          Test sending endpoints
        </button>
      </main>
    </>
  );
}
function LoginButton() {
  const { data: sessionData } = useSession();

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

function LogoutButton() {

  return (
    <div className="flex flex-row items-center justify-center">
      <button
        className="flex flex-row items-center justify-center gap-4 rounded-full bg-sky-950 py-2 pl-10 pr-8 text-lg font-semibold text-white hover:bg-sky-800"
        onClick={() => signOut()}
      >
        Log out
        <img className="h-4 w-4" src={Arrow.src}></img>
      </button>
    </div>
  );
}
