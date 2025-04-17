import { useState } from "react";
import axios from "axios";
import LeafletMapComponent from "../components/LeafletMapComponent";

const FeedPage = () => {
  const [locations, setLocations] = useState([{ address: "" }]);
  const [category, setCategory] = useState("cafe");
  const [centralPoint, setCentralPoint] = useState(null);
  const [places, setPlaces] = useState([]);

  const handleLocationChange = (index, value) => {
    const updated = [...locations];
    updated[index].address = value;
    setLocations(updated);
  };

  const addLocation = () => {
    setLocations([...locations, { address: "" }]);
  };

  const findPlaces = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/locations/central", {
        addresses: locations.map((loc) => loc.address),
      });

      const { central } = response.data;
      setCentralPoint(central);

      const placesResponse = await axios.post("http://localhost:5000/api/places/nearby-places", {
        lat: central.lat,
        lng: central.lng,
        type: category,
      });

      setPlaces(placesResponse.data);
    } catch (err) {
      console.error("Error:", err.message);
    }
  };

  return (
    <div className="feed-page">
      <div className="feed-container">
        <div className="form-section">
          <h2>Find a Central Location</h2>

          {locations.map((loc, idx) => (
            <input
              key={idx}
              type="text"
              placeholder={`Location ${idx + 1}`}
              value={loc.address}
              onChange={(e) => handleLocationChange(idx, e.target.value)}
            />
          ))}

          <button className="add-btn" onClick={addLocation}>+ Add Location</button>

          <div className="dropdown-group">
            <label>Category:</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="cafe">Café</option>
              <option value="restaurant">Restaurant</option>
              <option value="library">Library</option>
              <option value="bar">Bar</option>
              <option value="cinema">Cinema</option>
              <option value="fast_food">Fast Food</option>
              <option value="pub">Pub</option>
              <option value="pharmacy">Pharmacy</option>
              <option value="bank">Bank</option>
            </select>
          </div>

          <button className="submit-btn" onClick={findPlaces}>Find Central Places</button>
        </div>

        <div className="map-section">
          {centralPoint && <LeafletMapComponent centralPoint={centralPoint} places={places} />}
        </div>
      </div>
    </div>
  );
};

export default FeedPage;
