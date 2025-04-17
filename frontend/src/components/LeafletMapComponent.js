import { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./MapStyles.css";

const LeafletMapComponent = ({ centralPoint, places }) => {
  useEffect(() => {
    const map = L.map("map").setView([centralPoint.lat, centralPoint.lng], 13);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(map);

    // Custom icon for meeting spot
    /*const meetingIcon = L.icon({
      iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
      iconSize: [40, 40],
      iconAnchor: [20, 40],
      popupAnchor: [0, -40],
    });*/

    L.marker([centralPoint.lat, centralPoint.lng])
      .addTo(map)
      .bindPopup("<b>Meeting Spot</b>")
      .openPopup();

    // Calculate and sort places by distance
    const sortedPlaces = [...places].map((place) => {
      const distance = map.distance(
        [centralPoint.lat, centralPoint.lng],
        [place.lat, place.lng]
      );
      return { ...place, distance };
    }).sort((a, b) => a.distance - b.distance);

    // Add place markers
    sortedPlaces.forEach((place) => {
      L.marker([place.lat, place.lng])
        .addTo(map)
        .bindPopup(`<b>${place.name}</b><br>Distance: ${Math.round(place.distance)}m`);
    });

    // Populate sidebar list
    setTimeout(() => {
      const list = document.getElementById("place-list");
      if (list) {
        list.innerHTML = "";
        sortedPlaces.forEach((place) => {
          const item = document.createElement("div");
          item.className = "place-item";
          item.innerHTML = `<a href="https://www.google.com/search?q=${encodeURIComponent(
            place.name + " reviews"
          )}" target="_blank">${place.name}</a> <span>(${Math.round(
            place.distance
          )} m)</span>`;
          list.appendChild(item);
        });
      }
    }, 100);

    return () => {
      map.remove(); // Keeping your cleanup as requested
    };
  }, [centralPoint, places]);

  return (
    <div className="map-wrapper">
      <div id="map" className="map-view" />
      <div id="place-list" className="sidebar" />
    </div>
  );
};

export default LeafletMapComponent;