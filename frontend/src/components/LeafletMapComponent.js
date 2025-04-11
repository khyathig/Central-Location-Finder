import { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const LeafletMapComponent = ({ centralPoint, places }) => {
  useEffect(() => {
    const map = L.map("map").setView([centralPoint.lat, centralPoint.lng], 13);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(map);

    L.marker([centralPoint.lat, centralPoint.lng])
      .addTo(map)
      .bindPopup("Meeting Spot")
      .openPopup();

    places.forEach((place) => {
      L.marker([place.lat, place.lng])
        .addTo(map)
        .bindPopup(place.name);
    });

    return () => {
      map.remove();
    };
  }, [centralPoint, places]);

  return <div id="map" style={{ height: "400px", width: "100%" }} />;
};

export default LeafletMapComponent;
