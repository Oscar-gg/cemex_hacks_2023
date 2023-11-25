import Nav from "~/components/Nav/Nav";
import Title from "~/components/general/title";
import { Toaster, toast } from 'react-hot-toast';
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useEffect, useRef, useState } from "react";
import { UseHorarios } from "~/utils/hooks/useHorarios";
import clsx from "clsx";
import { Horario } from "~/utils/types/types";
import { Modal } from "~/components/modal/modal";
import { Reserve } from "~/components/modal/reserve";
import { api } from "~/utils/api";
import { stringify } from "querystring";
import Trpc from "./api/trpc/[trpc]";
import { TRPCError } from "@trpc/server";

const Monitoreo = () => {

    const Data = [
        { id: "1", status: "Ocupado", luces: "encendido", temperatura: "81", time: "eoieo", num: 1 }
    ]

    const admin = true;

    const [isOpen, setOpen] = useState(false);
    const [isOpenAdd, setOpenAdd] = useState(false);
    const [id, setId] = useState("");
    const [status, setStatus] = useState("Desocupado")
    const [num, setNum] = useState(-1)

    const handleOpen = (key: number) => {
        setId(Data[key]?.id ?? "")
        setStatus(Data[key]?.status ?? "Desocupado")
        setOpen(!isOpen);
    }

    return (
        <>
            <Toaster />
            <Modal isOpen={isOpen}>
                <Reserve id={id} num={num} status={status} />
            </Modal>

            <Modal isOpen={isOpenAdd}>
                <AddOffice />
            </Modal>
            <Nav />
            <div className="w-full h-screen bg-slate-50 p-8 z-20 pt-16">
                <Title title="Monitoreo de Sensores" />

                <div className="mt-10">
                    <table className="border-2 w-full self-start">
                        <thead>
                            <tr className="text-start border-2 bg-slate-200">
                                <th className="text-start">Oficina</th>
                                <th className="text-start">Status</th>
                                <th className="text-start">Luces</th>
                                <th className="text-start">Temperatura</th>
                                <th className="text-start">Timestamp</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Data ? (
                                Data.map((log, key) => (
                                    <tr key={key} className="hover:bg-zinc-200" onClick={() => handleOpen(key)}>
                                        <td>{log.id}</td>
                                        <td>{log.status}</td>
                                        <td>{log.luces}</td>
                                        <td>{log.temperatura}</td>
                                        <td>{log.time}</td>
                                    </tr>

                                ))
                            ) : (
                                <tr>
                                    <td>No Data</td>
                                </tr>
                            )}
                        </tbody>

                    </table>
                </div>

                {admin && (
                    <button onClick={() => setOpenAdd(!isOpenAdd)} className="mt-4 bg-sky-400 py-1 px-3 rounded-full text-white">
                        Add office
                    </button>
                )}

            </div>
        </>
    )
}

export const AddOffice = () => {

    const [office, setOffice] = useState(-1);
    const addOffice = api.office.addOffice.useMutation();

    const handleAdd = () => {
        if (office != -1) {
            try {
                addOffice.mutate({ officeNum: office })
            } catch (error) {
                if (error instanceof TRPCError)
                    toast.error(error.message);
            }
        } else {
            toast.error("Agrega el número de la oficina")
        }
    }

    return (
        <div>
            <div className="flex flex-row gap-3 items-center">
                <div>
                    Número de oficina:
                </div>
                <input className="p-1 rounded-md outline-none focus:ring-1" onChange={(e) => {
                    setOffice(parseInt(e.target.value))
                }}/>
            </div>
            <button onClick={handleAdd} className="mt-4 bg-sky-400 py-1 px-3 rounded-full text-white">
                Add office
            </button>
        </div>
    )
}





export default Monitoreo;