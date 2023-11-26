import Nav from "~/components/Nav/Nav";
import Title from "~/components/general/title";
import { Toaster, toast } from "react-hot-toast";
import { Reserve } from "~/components/modal/reserve";
import { api } from "~/utils/api";
import { TRPCError } from "@trpc/server";
import { useState } from "react";
import { Modal } from "~/components/modal/modal";
import { useSession } from "next-auth/react";
import Description from "~/components/general/description";
import { useRouter } from "next/navigation";
import { CompareCard } from "~/components/card/Compare";

const Monitoreo = () => {
  const offices = api.office.getOffices.useQuery().data;
  const session = useSession();

  const router = useRouter();
  // const admin = session.data?.user.role == "admin";
  const admin = true;

  const [isOpen, setOpen] = useState(false);
  const [isOpenAdd, setOpenAdd] = useState(false);
  const [id, setId] = useState("");
  const [status, setStatus] = useState("Desocupado");
  const [luces, setLuces] = useState("Apagadas");
  const [temperatura, setTemperatura] = useState("20");
  const [time, setTime] = useState("0:00");
  const [num, setNum] = useState(-1);

  const handleOpen = (key: number, officeId: string, num: number) => {
    setId(officeId);
    setNum(num);
    // setStatus(Data[key]?.status ?? "Desocupado")
    setOpen(!isOpen);
  };

  const handleCompare = () => {
    router.push("/comparativa");
  };

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
      <div className="bg-gradient-radial z-20 h-screen w-full bg-slate-50 from-sky-100/90 to-white p-8 pt-24">
        <Title title="Monitoreo de Sensores" />
        <Description description="Monitorea el estado de las oficinas" />

        <div className="mt-10  overflow-x-scroll">
          <table className="w-full self-start border-2">
            <thead>
              <tr className="border-2 bg-slate-200 text-start ">
                <th className="pr-8 text-start">Oficina</th>
                <th className="pr-8 text-start">Status</th>
                <th className="pr-8 text-start">Luces</th>
                <th className="pr-8 text-start">
                  Temperatura <span className="">°C</span>
                </th>
                <th className="pr-8 text-start">Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {offices ? (
                offices.map((office, key) => (
                  <tr
                    key={key}
                    className="hover:bg-zinc-200"
                    onClick={() =>
                      handleOpen(key, office.office.id, office.office.officeNum)
                    }
                  >
                    <td className="pr-8">{office.office.officeNum}</td>
                    <td className="pr-8">{status ?? "ocupado"}</td>
                    <td className="pr-8">{office.light.toString()}</td>
                    <td className="pr-8">{office.temp.toString()}</td>
                    <td className="pr-8">{office.time.toString()}</td>
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
          <div className="flex gap-3">
            <button
              onClick={() => setOpenAdd(!isOpenAdd)}
              className="mt-4 rounded-full bg-sky-400 px-3 py-1 text-white hover:bg-sky-300"
            >
              Add office
            </button>
            <a target="_blank" href="/comparativa" rel="noopener noreferrer">
              <button className="mt-4 rounded-full bg-sky-400 px-3 py-1 text-white hover:bg-sky-300">
                Ver comparativa
              </button>
            </a>
          </div>
        )}

        {/* <CompareCard
          energyConsumption={20}
          lightOn={true}
          officeName="Oficina B"
          temperature={25}
          time={new Date()}
        /> */}
      </div>
    </>
  );
};

export const AddOffice = () => {
  const [office, setOffice] = useState(-1);
  const addOffice = api.office.addOffice.useMutation();

  const handleAdd = () => {
    if (office != -1) {
      try {
        addOffice.mutate({ officeNum: office });
        toast.success("Oficina agregada");
      } catch (error) {
        if (error instanceof TRPCError) toast.error(error.message);
      }
    } else {
      toast.error("Agrega el número de la oficina");
    }
  };

  return (
    <div>
      <div className="flex flex-row items-center gap-3">
        <div>Número de oficina:</div>
        <input
          className="rounded-md p-1 outline-none focus:ring-1"
          onChange={(e) => {
            setOffice(parseInt(e.target.value));
          }}
        />
      </div>
      <button
        onClick={handleAdd}
        className="mt-4 rounded-full bg-sky-400 px-3 py-1 text-white"
      >
        Add office
      </button>
    </div>
  );
};

export default Monitoreo;
