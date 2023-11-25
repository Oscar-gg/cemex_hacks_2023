import { signIn, useSession } from "next-auth/react";
import Head from "next/head";

import { api } from "~/utils/api";

export default function Home() {
  return (
    <>
      <Head>
        <title>CEMEX Hack</title>
        <meta name="description" content="no se que va aqui sos" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center px-50 bg-sky-100">
        <div className="container flex flex-col items-center justify-center px-4 py-16 h-full bg-sky-700/60 rounded-xl">
          <h1 className="text-5xl font-extrabold tracking-tight text-sky-50 sm:text-9xl">
            CEMEX
          </h1>
        </div>
        <div className="container flex flex-col items-center justify-center px-4 py-16 ">
          <AuthShowcase />
        </div>
      </main>
    </>
  );
}

function AuthShowcase() {
  const { data: sessionData } = useSession();

  const { data: secretMessage } = api.post.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined }
  );

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <button
        className="rounded-full bg-sky-900/60 px-10 py-3 text-lg text-white font-bold no-underline transition hover:bg-sky-900/40"
        onClick={() => void signIn()}
      >
        Sign in
      </button>
    </div>
  );
}
