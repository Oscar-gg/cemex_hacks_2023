import { useEffect, useState } from "react";
import Title from "~/components/general/title";
import MapContainer from "~/components/movilidad/mapContainer";
import { Trash2 } from "react-feather";
import GooglePlacesAutocomplete from "~/components/movilidad/autocomplete";
import { LoadScript } from "@react-google-maps/api";
import { MapLocation } from "~/zod/types";
import Card from "~/components/card/metrics";
import Nav from "~/components/Nav/Nav";
import Description from "~/components/general/description";
import { api } from "~/utils/api";
import { RouteCard } from "~/components/card/RouteCard";

const Movilidad = () => {
  const [autocompleteCount, setAutocompleteCount] = useState(1);
  const [locations, setLocations] = useState<MapLocation[]>();

  const { data: pathData, refetch } = api.api.sendPoints.useQuery(
    {
      points: locations,
    },
    { enabled: false },
  );

  const handleAddAutocomplete = () => {
    setAutocompleteCount((prevCount) => prevCount + 1);
  };

  const handleRemoveAutocomplete = (_index: number) => {
    setAutocompleteCount((prevCount) => Math.max(1, prevCount - 1));
  };

  return (
    <>
      <LoadScript googleMapsApiKey="AIzaSyApYvTkH-7FbW4paDE7mUXqNxT56srw6ec">
        <Nav />
        <div className="bg-gradient-radial z-20 w-full bg-slate-50 from-sky-100/90 to-white p-8 pt-24">
          <div className="mb-8">
            <Title title="Rutas Inteligentes" />
            <Description description="Selecciona los puntos de interés para generar la ruta más eficiente" />
          </div>
          <div className="z-50 flex w-full flex-col p-4 md:flex-row">
            <div className="flex-1 overflow-hidden rounded-lg">
              <MapContainer locations={locations} />
            </div>

            <div className="flex-1 overflow-auto md:ml-10">
              {[...Array(autocompleteCount)].map((_, index: number) => (
                <div
                  key={index}
                  className="relative mx-2 my-2 flex items-center rounded border p-4 shadow-md"
                >
                  <GooglePlacesAutocomplete
                    setPlaces={setLocations}
                    places={locations}
                  />
                  <button
                    onClick={() => handleRemoveAutocomplete(index)}
                    className="ml-auto cursor-pointer text-red-500"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
              <button
                onClick={handleAddAutocomplete}
                className="mx-2 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
              >
                Add Marker
              </button>
              <button
                onClick={() => {
                  void refetch();
                }}
                className="mx-2 rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700"
              >
                Compute Route
              </button>
              {pathData && (
                <RouteCard
                  className="mt-4"
                  routeData={pathData}
                  points={locations}
                />
              )}
            </div>
          </div>

          <div className="z-20 flex flex-col p-8 md:flex-row">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Card
                imageUrl="data:image/jpeg;base64,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"
                title="Costo total"
                description="$525.25"
              />
              <Card
                imageUrl="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftrackermaster.com%2Fwp-content%2Fuploads%2F2019%2F09%2Fplanificador-de-rutas-de-reparto.jpg&f=1&nofb=1&ipt=9309fe7e67c66ae2377979e82489666c1e7436993ed20e0cc4234690b9fab2d3&ipo=images"
                title="Maxima distancia entre rutas"
                description="15 km"
              />
              <Card
                imageUrl="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.elmira.es%2Fwp-content%2Fuploads%2F2020%2F12%2Fgasolina-gasolinera-combustible.jpg&f=1&nofb=1&ipt=4e835daa87d4666f5d9bbf9c3762ebc32787779ee8d0ad0c0221a27b54a75fdc&ipo=images"
                title="Cantidad de litros"
                description="680 L"
              />
              <Card
                imageUrl="https://www.beetrack.com/hubfs/calcular%20ruta%20google%20maps.jpg"
                title="Ruta optima"
                description="1 > 0 > 3 > 0"
              />
            </div>

            {/* Second Column (Red Container named Recomendaciones) */}
            <div className="mt-4 rounded-lg border border-gray-200 bg-white p-4 shadow-md hover:bg-gray-100 md:ml-4 md:mt-0 md:max-w-xl md:flex-row">
              <h2 className="text-xl font-bold text-neutral-900">
                Recomendaciones
              </h2>
              {/* Add your recommendation content here */}
            </div>
          </div>
        </div>
      </LoadScript>
    </>
  );
};

export default Movilidad;
