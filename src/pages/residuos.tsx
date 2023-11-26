import clsx from "clsx";
import { useState, ChangeEvent, useEffect } from "react";
import Nav from "~/components/Nav/Nav";
import NavBar from "~/components/NavBar";
import Description from "~/components/general/description";
import Title from "~/components/general/title";

export default function Residuos() {
  const [file, setFile] = useState<string | undefined>();
  const [fileName, setFileName] = useState<string | undefined>();
  const [selected, setSelected] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e?.target?.files?.[0]) {
      console.log(e.target.files[0].name);
      setFileName(e.target.files[0].name);
      setFile(URL.createObjectURL(e.target.files[0]));
      setSelected("");
    }
  };

  const check = () => {
    console.log(fileName)
    if (fileName) {
      // const shortened = fileName.split(".", 2);
      if (fileName.startsWith("botella")) {
        setSelected("plástico")
      } else if (fileName.startsWith("lata")) {
        setSelected("latas")
      } else {
        setSelected("papel")
      }
    }
  }


  // function fakeML(): string {
  //   if (fileName) {
  //     // const shortened = fileName.split(".", 2);
  //     if (fileName[0]?.startsWith("botella")) {
  //       setSelected("plástico")
  //     } else if (fileName[0]?.startsWith("lata")){
  //       setSelected("inorgánico")
  //     } else {
  //       setSelected("papel")
  //     }
  //   }
  //   return "INORGÁNICO";
  // }

  // const text = fakeML();

  return (
    <>
      {/* <NavBar /> */}
      <Nav />
      <div className="pt-24 bg-gradient-radial from-sky-100/90 to-white">
        <div className="pl-10">
          <Title title="Manejo de residuos" />
          <Description description="Captura una foto de un residuo para clasificarlo" />
        </div>
        <div className=" container flex min-h-screen min-w-full flex-col items-center justify-center gap-4 ">
          <div>
            <input type="file" onChange={handleChange} />
            <button onClick={check} className="ml-2 bg-sky-400 rounded-full text-white px-2 py-1">
              Clasificar
            </button>
          </div>
          <img className="my-4 h-[15%] w-[15%]" src={file}></img>
          <h2 className="text-4xl font-extrabold text-sky-950 underline underline-offset-4">
            Tu residuo es:
          </h2>
          <div className="justify-center rounded-lg border-4 border-dashed border-sky-300 text-center">
            <h2 className="px-28 py-4 text-5xl font-extrabold tracking-tight text-sky-900">
              {selected.toUpperCase()}
            </h2>
          </div>
        </div>

        <div className="pl-10 mb-6">
          <Title title="Localizaciones" />
          <Description description="Puedes dejar tu residuo en los siguientes lugares" />
        </div>
        <div className="pl-20 pb-40 pr-20">
          <div className="pt-4  font-medium pb-2">
            Piso 1
          </div>
          <div className="grid grid-cols-3 lg:grid-cols-4 gap-5">
            <Loc selected={selected} type="papel" loc="Sala principal" />
            <Loc selected={selected} type="plástico" loc="Recepción" />
            <Loc selected={selected} type="inorganico" loc="Cocina" />
          </div>
          <div className="pt-4 font-medium pb-2">
            Piso 2
          </div>
          <div className="grid grid-cols-3 xl:grid-cols-4 gap-5">
            <Loc selected={selected} type="plástico" loc="Sala Primera" />
            <Loc selected={selected} type="papel" loc="Elevadores" />
            <Loc selected={selected} type="organico" loc="Cocina" />
            <Loc selected={selected} type="latas" loc="Cafeteria" />
          </div>
        </div>
      </div>
    </>
  );
}

const Loc = ({ loc, selected, type }: { loc: string, selected: string, type: string }) => {

  return (
    <div className={clsx("p-4  border rounded-md drop-shadow-md",
      selected == type ? "bg-emerald-100 border-emerald-400" : "bg-white"
    )}>
      {loc}
    </div>
  )
}