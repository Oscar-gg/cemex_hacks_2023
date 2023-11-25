import React, { useEffect, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";

let map: google.maps.Map;
let marker: google.maps.Marker;

import { MapLocation } from "~/zod/types";

const MapContainer = ({
  locations,
}: {
  locations: MapLocation[] | undefined | null;
}) => {
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  useEffect(() => {
    if (!document.getElementById("map")) {
      const loader = new Loader({
        apiKey: "AIzaSyApYvTkH-7FbW4paDE7mUXqNxT56srw6ec",
        version: "weekly",
      });

      loader.load().catch((error) => {
        console.log(error)
      });
    }
  }, []);

  useEffect(() => {
    const lastPos = locations?.[locations?.length - 1];
    if (lastPos) {
      map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
        center: { lat: lastPos.lat, lng: lastPos.lng },
        zoom: 8,
      });
    } else {
      map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 8,
      });
    }

    if (locations) {
      for (const loc of locations) {
        marker = new google.maps.Marker({
          position: { lat: loc.lat, lng: loc.lng },
          map: map,
          title: loc.name, // Optional: Add a title to the marker
        });
        marker.setPosition({ lat: loc.lat, lng: loc.lng });
      }
    }
  }, [locations]);

  const handleLocateMe = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const userLocation = { lat: latitude, lng: longitude };
          setUserLocation(userLocation);

          // Set map center and marker position to user's location
          map.setCenter(userLocation);
          marker.setPosition(userLocation);

          // Print latitude and longitude
          console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
        },
        (error) => {
          console.error(error.message);
        },
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  const addLocs = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const userLocation = { lat: latitude, lng: longitude };
          setUserLocation(userLocation);

          // Set map center and marker position to user's location
          map.setCenter(userLocation);
          marker.setPosition(userLocation);

          // Print latitude and longitude
          console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
        },
        (error) => {
          console.error(error.message);
        },
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  return (
   
      <div
        id="map"
        style={{ height: "500px", width: "100%", minHeight: "300px" }}
      ></div>
      
   
  );
};

export default MapContainer;
