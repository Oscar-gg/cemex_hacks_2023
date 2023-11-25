// Map.tsx
import React, { useEffect } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

interface MapProps {
  onLocate: () => void;
}

const Map: React.FC<MapProps> = ({ onLocate }) => {
  let map: google.maps.Map;
  let marker: google.maps.Marker;

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
        title: 'Marker Title',
      });
    });
  }, []);

  const handleLocateMe = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const userLocation = { lat: latitude, lng: longitude };

          map.setCenter(userLocation);
          marker.setPosition(userLocation);

          onLocate();
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
    <div style={{ height: '80vh', width: '100%' }}>
      <div id="map" style={{ height: '100%', width: '100%' }}></div>
    </div>
  );
};

export default Map;
