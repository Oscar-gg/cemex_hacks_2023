import clsx from "clsx";
import { useState } from "react";
import toast from "react-hot-toast";
import { api } from "~/utils/api";
import { UseHorarios } from "~/utils/hooks/useHorarios";
import { Horario } from "~/utils/types/types";

interface ReserveProps {
    id: string;
    num: number;
}


export const Reserve: React.FC<ReserveProps> = ({ id, num }) => {
    // const reserved =  api.reservation.getReservations.useQuery({officeId: id})
    const horarios = api.reservation.getHorarios.useQuery({ officeId: id }).data ?? [];
    const [horario, setHorario] = useState<Horario>();
    const [keyH, setKeyH] = useState(-1);
    const addReservation = api.reservation.addReservation.useMutation();

    const handleSet = (horario: Horario, curKey: number) => {
        setHorario(horario);
        setKeyH(curKey);

    }

    const handleSwitch = () => {
        console.log("switch");
    }

    const handleReserve = () => {
        if (horario?.reserved) {
            toast.error("No disponible")
        } else {
            addReservation.mutate({ officeId: id, time: horario?.hour ?? "" });
            toast.success("Log deleted successfully");
        }
        setKeyH(-1);
    }

    return (
        <div>
            <div className='flex flex-col md:flex-row p-2 w-full'>


                <div className='flex flex-col justify-between px-5 w-full'>
                    <div >
                        <div className='mb-2'>
                            Ofice
                            <span> {num} </span>
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
                                                    {horario.email}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>

                    <div className="flex flex-row gap-4 items-center justify-between">
                        <button onClick={handleReserve} className='bg-sky-300 py-2 px-5 rounded-full text-white hover:bg-sky-200'>
                            Reservar
                        </button>
                        <button onClick={handleSwitch} className="bg-sky-300 py-2 px-5 rounded-full text-white hover:bg-sky-200">
                            Switch lights
                        </button>
                        <div className="text-neutral-800">
                            Light status:
                            <span className="text-gray-500 ml-3">on</span>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    )
}