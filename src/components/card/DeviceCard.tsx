import { api } from "~/utils/api";
import { BiRfid, BiErrorAlt } from "react-icons/bi";
import { BsLightbulbFill } from "react-icons/bs";
import { FaTemperatureHigh } from "react-icons/fa";
import { RiAlarmWarningFill } from "react-icons/ri";
import { LuAlarmClock } from "react-icons/lu";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { ModalInner } from "../general/Modal";

import { useRef, useState } from "react";

export const DeviceCard = ({ id }: { id: string }) => {
  const { data: deviceData, isLoading } = api.device.getDeviceInfo.useQuery({
    connectionId: id,
  });

  const mutation = api.aws.sendMessage.useMutation({
    onSuccess: (data) => {
      alert(data);
    },
    onError: (error) => {
      alert(error.message);
    },
  });

  const [data, setData] = useState<string>("");

  const dialogRef = useRef<HTMLDialogElement>(null);

  const handleClick = () => {
    if (dialogRef.current) {
      dialogRef.current.showModal();
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-sm rounded-lg border border-gray-200 bg-white p-6 shadow dark:border-gray-700 dark:bg-gray-800">
        <div>aaaaa...</div>
      </div>
    );
  } else if (!deviceData) {
    return (
      <div className="max-w-sm rounded-lg border border-gray-200 bg-white p-6 shadow dark:border-gray-700 dark:bg-gray-800">
        <div>Device not found</div>
      </div>
    );
  }

  return (
    <div className="max-w-sm rounded-lg border border-gray-200 bg-white p-6 shadow dark:border-gray-700 dark:bg-gray-800">
      <dialog className="rounded-md" ref={dialogRef}>
        <ModalInner title="Detalles de dispositivo" modalRef={dialogRef}>
          <div className="flex flex-col">
            <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">
              Domain: {deviceData.domain ?? "Sin connectionId"}
            </p>
            <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">
              Stage: {deviceData.stage ?? "Sin connectionId"}
            </p>
          </div>
        </ModalInner>
      </dialog>
      <div className="mb-2 flex items-center justify-between">
        <IconSwitch type={deviceData.type} />
        <AiOutlineInfoCircle
          onClick={handleClick}
          className="text-gray-500"
          size={25}
        />
      </div>

      <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
        Nombre: {deviceData.name ?? "Sin nombre"}
      </h5>

      <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">
        Tipo: {deviceData.type ?? "Sin tipo"}
      </p>
      <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">
        ConnectionId: {deviceData.connectionId ?? "Sin connectionId"}
      </p>

      <div className="flex h-fit flex-row items-center justify-around gap-x-3 rounded-lg bg-slate-400 p-2">
        <input
          className="h-7 rounded-md p-2"
          value={data}
          onChange={(e) => setData(e.target.value)}
        />
        <button
          className="w-fit rounded-md bg-green-300 p-2"
          onClick={() =>
            mutation.mutate({
              connectionId: deviceData.connectionId,
              message: data,
            })
          }
        >
          Enviar
        </button>
      </div>
    </div>
  );
};

const icontw = "text-gray-500 h-10 w-10";

const IconSwitch = ({ type }: { type: string | null | undefined }) => {
  if (type === "RFID") {
    return <BiRfid className={icontw} />;
  } else if (type === "temperature") {
    return <FaTemperatureHigh className={icontw} />;
  } else if (type === "light") {
    return <BsLightbulbFill className={icontw} />;
  } else if (type === "movement") {
    return <RiAlarmWarningFill className={icontw} />;
  } else if (type === "workTime") {
    return <LuAlarmClock className={icontw} />;
  } else {
    return <BiErrorAlt className={icontw} />;
  }
};
