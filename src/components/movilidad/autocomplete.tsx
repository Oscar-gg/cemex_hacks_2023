import React, { useEffect, useRef } from "react";
import { useLoadScript } from "@react-google-maps/api";

import type { MapLocation } from "~/zod/types";
import { useRouter } from "next/navigation";
import Nav from "../Nav/Nav";
import { LoadingScreen } from "../general/LoadingScreen";

const GooglePlacesAutocomplete = ({
  places,
  setPlaces,
}: {
  setPlaces: React.Dispatch<React.SetStateAction<MapLocation[] | undefined>>;
  places: MapLocation[] | undefined;
}) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "key",
    libraries: ["places"],
  });

  const router = useRouter();
 

  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const initAutocomplete = () => {
      if (!window.google || !containerRef.current) return;

      // Create the input HTML element and append it to the container
      const input = document.createElement("input");
      input.placeholder = "Enter a location";
      input.classList.add(
        "p-2",
        "border",
        "rounded",
        "focus:outline-none",
        "focus:ring",
        "focus:border-blue-300",
      );

      containerRef.current.appendChild(input);

      // Initialize the Places Autocomplete
      const autocomplete = new window.google.maps.places.Autocomplete(input);

      // Add event listener for place_changed
      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        console.log("Selected Place:", place);
        console.log("Test message");
        if (places) {
          console.log("Added place");
          setPlaces([
            ...places,
            {
              lat: place.geometry?.location?.lat() ?? 0,
              lng: place.geometry?.location?.lng() ?? 0,
              name: place.formatted_address ?? "Unnamed",
            },
          ]);
        } else {
          console.log("Added place, places not nul");
          setPlaces([
            {
              lat: place.geometry?.location?.lat() ?? 0,
              lng: place.geometry?.location?.lng() ?? 0,
              name: place.formatted_address ?? "Unnamed",
            },
          ]);
        }
      });
    };

    if (isLoaded && !loadError) {
      initAutocomplete();
    }
  }, [isLoaded, loadError]);

  if (loadError) return <div>Error loading Google Maps</div>;
  if (!isLoaded) return <div>
    <LoadingScreen />
    </div>;


  return <div ref={containerRef} id="google-places-autocomplete" />;
};

export default GooglePlacesAutocomplete;
