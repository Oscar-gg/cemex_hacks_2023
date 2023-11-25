import { useState } from "react";
import Title from "~/components/general/title";
import MapContainer from "~/components/movilidad/mapContainer";
import { Trash2 } from "react-feather";
import GooglePlacesAutocomplete from "~/components/movilidad/autocomplete";
import { LoadScript } from "@react-google-maps/api";
import Card from "~/components/card/metrics";
import Nav from "~/components/Nav/Nav";

interface location {
  lat: number;
  lng: number;
  name: string;
}

const Movilidad = () => {
  const [autocompleteCount, setAutocompleteCount] = useState(1);
  const [locations, setLocations] = useState<location[]>();

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
        <div className="z-20 h-screen w-full bg-slate-50 p-8 pt-16 flex">
          <div style={{ flex: 1.5, borderRadius: "15px", overflow: "hidden" }}>
            <MapContainer locations={locations} />
          </div>

          <div style={{ flex: 1, overflowY: "auto", marginLeft: "16px" }}>
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
              Add Autocomplete
            </button>
          </div>
        </div>

        <div className="flex justify-around p-8" style={{ marginTop: "-220px" }}>
  {/* First Column (2x2 grid of cards) */}
  <div className="grid grid-cols-2 gap-4">
    <Card
      imageUrl="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.elmira.es%2Fwp-content%2Fuploads%2F2020%2F12%2Fgasolina-gasolinera-combustible.jpg&f=1&nofb=1&ipt=4e835daa87d4666f5d9bbf9c3762ebc32787779ee8d0ad0c0221a27b54a75fdc&ipo=images"
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
      imageUrl="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.elmira.es%2Fwp-content%2Fuploads%2F2020%2F12%2Fgasolina-gasolinera-combustible.jpg&f=1&nofb=1&ipt=4e835daa87d4666f5d9bbf9c3762ebc32787779ee8d0ad0c0221a27b54a75fdc&ipo=images"
      title="Ruta optima"
      description="1 > 0 > 3 > 0"
    />
  </div>

  {/* Second Column (Red Container named Recomendaciones) */}
  <div className="bg-green-500 p-4 rounded">
    <h2 className="text-white font-bold text-xl">Recomendaciones</h2>
    {/* Add your recommendation content here */}
  </div>
</div>


      </LoadScript>
    </>
  );
};

export default Movilidad;
