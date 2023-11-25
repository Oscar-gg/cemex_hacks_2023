import { useState, ChangeEvent } from "react";
import { signOut } from "next-auth/react";

export default function Residuos() {
    const [file, setFile] = useState<string | undefined>();
    const [fileName, setFileName] = useState<string | undefined>();
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            console.log(e.target.files);
            setFile(URL.createObjectURL(e.target.files[0]));
            setFileName(e.target.files[0].name)
        }
    };

    function fakeML() : string {
        if (fileName) {
            let shortened = fileName.split(".", 2);
            if (fileName[0] == "organico") {
                return "ORGÁNICO";
            } else {
                return "INORGÁNICO";
            }
        }
        return "INORGÁNICO";
    };

    const text = fakeML();

    return (
        <>
        <nav className = "flex flex-row justify-between py-5 bg-sky-900">
            <h1 className="text-white font-extrabold px-16 text-2xl">CEMEX</h1>
            <div className="flex flex-row justify-evenly items-center">
                <p className="text-white px-10 text-base font-semibold text-right">
                    User
                </p>
                <p className="text-white hover:text-white/90 pr-16 text-base font-semibold text-right" onClick={() => void signOut()}>
                    Sign Out
                </p>
            </div>
        </nav>
        <div className="container min-w-full min-h-screen flex flex-col items-center justify-center gap-4 bg-gradient-radial from-sky-100/90 to-white">
            
            <input type="file" onChange={handleChange} />
            <img className="my-4 h-[40%] w-[40%]" src={file}></img>
            <h2 className="text-4xl text-sky-950 font-extrabold underline underline-offset-4">Tu residuo es:</h2>
            <div className="border-4 border-dashed text-center justify-center border-sky-300 rounded-lg">
                <h2 className="text-5xl text-sky-900 tracking-tight font-extrabold py-4 px-28">{text}</h2>
            </div>
        </div>
        </>
    );
}