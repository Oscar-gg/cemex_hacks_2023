import Nav from "~/components/Nav/Nav";
import Title from "~/components/general/title";
import { Toaster, toast } from 'react-hot-toast';
import { Reserve } from "~/components/modal/reserve";
import { api } from "~/utils/api";
import { TRPCError } from "@trpc/server";
import { useState } from "react";
import { Modal } from "~/components/modal/modal";
import { useSession } from "next-auth/react";

const Monitoreo = () => {

    const offices = api.office.getOffices.useQuery().data;
    const session = useSession();

    // const admin = session.data?.user.role == "admin";
    const admin = true;

    const [isOpen, setOpen] = useState(false);
    const [isOpenAdd, setOpenAdd] = useState(false);
    const [id, setId] = useState("");
    const [status, setStatus] = useState("Desocupado")
    const [luces, setLuces] = useState("Apagadas")
    const [temperatura, setTemperatura] = useState("20")
    const [time, setTime] = useState("0:00")
    const [num, setNum] = useState(-1)

    const handleOpen = (key: number, officeId: string, num: number) => {
        setId(officeId)
        setNum(num)
        // setStatus(Data[key]?.status ?? "Desocupado")
        setOpen(!isOpen);
    }



    return (
        <>
            <Toaster />
            <Modal isOpen={isOpen}>
                <Reserve id={id} num={num} />
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
                                <th className="text-start">Temperatura °C</th>
                                <th className="text-start">Timestamp</th>
                            </tr>
                        </thead>
                        <tbody>
                            {offices ? (
                                offices.map((office, key) => (
                                    <tr key={key} className="hover:bg-zinc-200" onClick={() => handleOpen(key, office.id, office.officeNum)}>
                                        <td>{office.officeNum}</td>
                                        <td>{status ?? "ocupado"}</td>
                                        <td>{luces}</td>
                                        <td>{temperatura}</td>
                                        <td>{time}</td>
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
                    <div>
                        <button onClick={() => setOpenAdd(!isOpenAdd)} className="mt-4 bg-sky-400 py-1 px-3 rounded-full text-white">
                            Add office
                        </button>

                    </div>
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
                toast.success("Oficina agregada")
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
                }} />
            </div>
            <button onClick={handleAdd} className="mt-4 bg-sky-400 py-1 px-3 rounded-full text-white">
                Add office
            </button>

        </div>
    )
}





export default Monitoreo;