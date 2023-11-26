import { signIn, useSession, signOut } from "next-auth/react";
import Head from "next/head";
import NavBar from "~/components/NavBar";

import { api } from "~/utils/api";
import Image from "../images/energy-11.png";
import Arrow from "../images/arrow-white.png";
import { useRouter } from "next/router";
import { LoadingScreen } from "~/components/general/LoadingScreen";

export default function Home() {
  const { data: sessionData, status } = useSession();
  const hello = api.post.hello.useQuery({ text: "from tRPC" });
  const router = useRouter();

  if (status === "loading") return <LoadingScreen />;

  // Check if user is logged in redirect to dashboard

  if (sessionData) {
    void router.push("/dashboard");
  }

  return (
    <>
      <Head>
        <title>CEMEX Hack</title>
        <meta name="description" content="no se que va aqui sos" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* <NavBar /> */}
      <main className="px-50 bg-gradient-radial relative flex min-h-screen flex-col items-center justify-center">
        <div className="absolute inset-0 z-[-1] bg-cover bg-center">
          <img
            src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimage.freepik.com%2Ffree-vector%2Fblue-pink-halftone-background_53876-99004.jpg&f=1&nofb=1&ipt=7f63a6a474411a04136290329f568a99c5ed3e2b0e6358792310beb6750e9009&ipo=images"
            alt="Background"
            className="h-full w-full object-cover"
          />
        </div>
        <img className="h-16 w-16" src={Image.src} />
        <h1 className="self-center py-2 pt-12 text-center text-4xl font-bold tracking-wide text-sky-950 underline decoration-sky-300 decoration-4 underline-offset-8 sm:text-7xl">
          SMART RESOURCE <br /> MANAGER
        </h1>
        <p className="py-4 text-xl text-stone-900">
          Mantén un ambiente eficiente
        </p>
        <div className="container flex flex-col items-center justify-center px-4 py-8 ">
          {sessionData ? <LogoutButton /> : <LoginButton />}
        </div>
      </main>
    </>
  );
}
function LoginButton() {

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
