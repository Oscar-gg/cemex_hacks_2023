import type { RouterOutputs } from "~/utils/api";
import { MapLocation } from "~/zod/types";
import { twMerge } from "tailwind-merge";

export const RouteCard = ({
  routeData,
  points,
  className,
}: {
  routeData: RouterOutputs["api"]["sendPoints"] | undefined | null;
  points: MapLocation[] | undefined | null;
  className?: string;
}) => {
  if (!routeData) {
    return (
      <div
        className={twMerge(
          "max-w-sm rounded-lg border border-gray-200 bg-white p-6 shadow dark:border-gray-700 dark:bg-gray-800",
          className,
        )}
      >
        <div>No hay datos por desplegar</div>
      </div>
    );
  } else if (typeof routeData === "string") {
    return (
      <div
        className={twMerge(
          "max-w-sm rounded-lg border border-gray-200 bg-white p-6 shadow dark:border-gray-700 dark:bg-gray-800",
          className,
        )}
      >
        <div>{routeData}</div>
      </div>
    );
  }

  return (
    <div
      className={twMerge(
        "max-w-sm rounded-lg border border-gray-200 bg-white p-6 shadow dark:border-gray-700 dark:bg-gray-800",
        className,
      )}
    >
      <h3 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
        Ruta calculada:
      </h3>

      <h5 className="mb-2 text-xl tracking-tight text-gray-900 dark:text-white">
        Detalles generales:
      </h5>

      <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">
        Costo total (MXN): {Math.round(routeData.costo_total * 100) / 100}
      </p>
      <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">
        Litros totales: {Math.round(routeData.litros_total * 100) / 100}
      </p>

      <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">
        Máxima distancia de la ruta (km):
        {Math.round(routeData.max_route_distance * 100) / 100}
      </p>
      <h5 className="mb-2 text-xl tracking-tight text-gray-900 dark:text-white">
        Rutas:
      </h5>
      {routeData.solution_array.map((item, index) => (
        <div>
          <h6>Ruta {index + 1}:</h6>
          {item.map((pos, index) => {
            console.log("pos:", pos);
            console.log(pos[0]);
            console.log(pos[1]);
            return (
              <div>
                {index + 1}.{" "}
                {getLocName({
                  pos: { lat: pos[0] ?? -1, lng: pos[1] ?? -1 },
                  points: points ?? [],
                })}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

const icontw = "text-gray-500 h-10 w-10";

const getLocName = ({
  pos,
  points,
}: {
  pos: { lat: number; lng: number };
  points: MapLocation[];
}) => {
  console.log(points);
  for (const point of points) {
    if (pos.lat === point.lat && pos.lng === point.lng) return point.name;
  }

  return "Cargando...";
};
