// /// <reference types="@types/googlemaps" />

// import React, { useEffect } from "react";
// import { Loader } from "@googlemaps/js-api-loader";

// let map: google.maps.Map;

// const MapContainer: React.FC = () => {
//   useEffect(() => {
//     const loader = new Loader({
//       apiKey: "AIzaSyApYvTkH-7FbW4paDE7mUXqNxT56srw6ec",
//       version: "weekly",
//     });

//     loader
//       .load()
//       .then(() => {
//         map = new google.maps.Map(
//           document.getElementById("map") as HTMLElement,
//           {
//             center: { lat: -34.397, lng: 150.644 },
//             zoom: 8,
//           },
//         );

//         const marker = new google.maps.Marker({
//           position: { lat: -34.397, lng: 150.644 },
//           map: map,
//           title: "Marker Title", // Optional: Add a title to the marker
//         });
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }, []);

//   return (
//     <div
//       id="map"
//       style={{ height: "500px", width: "100%", minHeight: "300px" }}
//     ></div>
//   );
// };

// export default MapContainer;
