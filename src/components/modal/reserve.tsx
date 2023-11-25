import clsx from "clsx";
import { useState } from "react";
import toast from "react-hot-toast";
import { UseHorarios } from "~/utils/hooks/useHorarios";
import { Horario } from "~/utils/types/types";

interface ReserveProps {
    id: string;
    num: number;
}


export const Reserve: React.FC<ReserveProps> = ({ id, num }) => {
    const horarios = UseHorarios(id);
    const [horario, setHorario] = useState<Horario>();
    const [keyH, setKeyH] = useState(-1);

    const handleSet = (horario:Horario, curKey:number) => {
        setHorario(horario);
        setKeyH(curKey);
    }   

    const handleReserve = () => {
        if (horario?.reserved) {
            toast.error("No disponible")
        } else {
            toast.success("Log deleted successfully");
        }
    }

    return (
        <div>
            <div className='flex flex-col md:flex-row p-2 w-full'>


                <div className='flex flex-col justify-between px-5 w-full'>
                    <div >
                        <div className='mb-2'>
                            Ofice
                            <span> {id} </span>
                        </div>

                        <div>
                            Horarios:
                            <div className="h-40 overflow-y-scroll my-6">
                                {horarios.map((horario, key) => (
                                    <div key={key} onClick={() => handleSet(horario, key)} className={clsx("m-1 p-1 rounded-md px-4", 
                                        horario.reserved ? "bg-red-200" : "bg-emerald-200 hover:bg-emerald-300",
                                        key == keyH ? "bg-emerald-500 hover:bg-emerald-500" : "bg-emerald-200"
                                    )}>
                                        <div className="flex flex-row justify-between">
                                            <div>
                                                {horario.hour}
                                            </div>
                                            {horario.reserved && (
                                                <div>
                                                    horario.email
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>

                    <div className="flex flex-row gap-4">
                        <button onClick={handleReserve} className='bg-sky-300 py-2 px-5 rounded-full text-white hover:bg-sky-200'>
                            Reservar
                        </button>

                    </div>
                </div>

            </div>
        </div>
    )
}