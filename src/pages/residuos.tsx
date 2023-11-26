import { useState, ChangeEvent } from "react";
import Nav from "~/components/Nav/Nav";
import NavBar from "~/components/NavBar";
import Description from "~/components/general/description";
import Title from "~/components/general/title";

export default function Residuos() {
  const [file, setFile] = useState<string | undefined>();
  const [fileName, setFileName] = useState<string | undefined>();
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e?.target?.files?.[0]) {
      console.log(e.target.files);
      setFile(URL.createObjectURL(e.target.files[0]));
      setFileName(e.target.files[0].name);
    }
  };

  function fakeML(): string {
    if (fileName) {
      // const shortened = fileName.split(".", 2);
      if (fileName[0]?.startsWith("organico")) {
        return "ORGÁNICO";
      } else {
        return "INORGÁNICO";
      }
    }
    return "INORGÁNICO";
  }

  const text = fakeML();

  return (
    <>
      {/* <NavBar /> */}
      <Nav />
      <div className="pt-24 bg-gradient-radial from-sky-100/90 to-white">
        <div className="pl-10">
          <Title title="Manejo de residuos"/>
          <Description description="Captura una foto de un residuo para clasificarlo"/>
        </div>
        <div className=" container flex min-h-screen min-w-full flex-col items-center justify-center gap-4 ">
          <input type="file" onChange={handleChange} />
          <img className="my-4 h-[40%] w-[40%]" src={file}></img>
          <h2 className="text-4xl font-extrabold text-sky-950 underline underline-offset-4">
            Tu residuo es:
          </h2>
          <div className="justify-center rounded-lg border-4 border-dashed border-sky-300 text-center">
            <h2 className="px-28 py-4 text-5xl font-extrabold tracking-tight text-sky-900">
              {text}
            </h2>
          </div>
        </div>
      </div>
    </>
  );
}
