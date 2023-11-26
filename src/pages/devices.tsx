import { useState } from "react";
import { api } from "~/utils/api";
import { DeviceCard } from "~/components/card/DeviceCard";

const cardWrappertw =
  "m-2 flex flex-row flex-wrap rounded-md bg-slate-300 p-2 gap-x-4 gap-y-4 justify-center lg:justify-normal";

export default function MessageDemo() {
  const [pageView, setPageView] = useState<string>("Devices");

  return (
    <div>
      <div className="flex w-full flex-col flex-wrap justify-center gap-y-4">
        <div className="flex w-full flex-row flex-wrap items-center justify-center gap-x-4 gap-y-2 bg-blue-200 p-3">
          <button
            className="rounded-md bg-slate-300 p-2"
            onClick={() => setPageView("Devices")}
          >
            Devices
          </button>
          <button
            className="rounded-md bg-slate-300 p-2"
            onClick={() => setPageView("Users")}
          >
            Users
          </button>
          {pageView === "Devices" && <RefetchDeviceButton />}
        </div>
        <div className="w-full pl-2 pr-2">
          <PageSwitch page={pageView} />
        </div>
      </div>
    </div>
  );
}

const RefetchDeviceButton = () => {
  const mutation = api.aws.refreshDevices.useMutation({
    onSuccess: (data) => {
      alert(data);
    },
    onError: (error) => {
      alert(error.message);
    },
  });

  return (
    <button
      className="rounded-md bg-red-500 p-2
      text-white hover:bg-red-600"
      onClick={() => mutation.mutate()}
    >
      Refresh Devices
    </button>
  );
};

const PageSwitch = ({ page }: { page: string }) => {
  if (page === "Devices") {
    return <Devices />;
  } else if (page === "Users") {
    return <p>Por implementar</p>;
  } else {
    return <div>Invalid page: {page}</div>;
  }
};

const Devices = () => {
  const { data: deviceIds, isLoading } = api.device.getDeviceIds.useQuery();
  return (
    <div className={cardWrappertw}>
      {isLoading ? (
        <p>sss...</p>
      ) : deviceIds && deviceIds.length > 0 ? (
        deviceIds.map((deviceId) => (
          <DeviceCard key={deviceId.connectionId} id={deviceId.connectionId} />
        ))
      ) : (
        <p>No devices found</p>
      )}
    </div>
  );
};
