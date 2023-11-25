import React, { useEffect, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

let map: google.maps.Map;
let marker: google.maps.Marker;

const MapContainer: React.FC = () => {
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);

  useEffect(() => {
    const loader = new Loader({
      apiKey: "AIzaSyApYvTkH-7FbW4paDE7mUXqNxT56srw6ec",
      version: "weekly",
    });

    loader.load().then(() => {
      map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 8,
      });

      marker = new google.maps.Marker({
        position: { lat: -34.397, lng: 150.644 },
        map: map,
        title: 'Marker Title', // Optional: Add a title to the marker
      });
    });
  }, []);

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
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  };

  return (
    <div>
      <div id="map" style={{ height: '500px', width: '100%', minHeight: '300px' }}></div>
      <button onClick={handleLocateMe} className="mx-2 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700">Locate Me</button>
    </div>
    
   
  );
};

export default MapContainer;
