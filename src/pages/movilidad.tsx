import Nav from "~/components/Nav/Nav";
import { useState } from "react";
import Title from "~/components/general/title";
import MapContainer from "~/components/movilidad/mapContainer";
import { Trash2 } from "react-feather";
import GooglePlacesAutocomplete from "~/components/movilidad/autocomplete";
import { LoadScript } from "@react-google-maps/api";
import { MapLocation } from "~/zod/types";

const Movilidad = () => {
  const [autocompleteCount, setAutocompleteCount] = useState(1);
  const [locations, setLocations] = useState<MapLocation[]>();

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
        <div className="z-20 h-screen w-full bg-slate-50 p-8 pt-16">
          <Title title="Movilidad y rutas" />

          <div style={{ display: "flex", flexDirection: "row" }}>
            {/* MapContainer takes the full width of the container */}
            <div style={{ flex: 1.5, borderRadius: "0px", overflow: "hidden" }}>
              {/* MapContainer takes the full width of the container */}
              <MapContainer locations={locations} />
            </div>

            <div style={{ flex: 1, overflowY: "auto" }}>
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
        </div>
      </LoadScript>
    </>
  );
};

export default Movilidad;
