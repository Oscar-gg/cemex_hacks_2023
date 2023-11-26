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
                                imageUrl="https://archive.unews.utah.edu/wp-content/uploads/2021/03/Cash.jpg"
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
                            <p>
                                Tomar la ruta 1
                            </p>
                            {/* Add your recommendation content here */}
                        </div>
                    </div>
                </div>
            </LoadScript>
        </>
    );
};

export default Movilidad;
