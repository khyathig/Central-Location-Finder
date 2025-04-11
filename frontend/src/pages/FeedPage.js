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
    <div className="p-4">
      <h2 className="text-xl font-bold">Enter Multiple Locations</h2>

      {locations.map((loc, idx) => (
        <input
          key={idx}
          type="text"
          placeholder={`Location ${idx + 1}`}
          value={loc.address}
          onChange={(e) => handleLocationChange(idx, e.target.value)}
          className="block my-2 p-2 border w-full"
        />
      ))}

      <button onClick={addLocation} className="my-2 px-4 py-1 bg-gray-300 rounded">
        + Add Location
      </button>

      <div className="my-4">
        <label className="mr-2">Category:</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border p-1"
        >
          <option value="cafe">Café</option>
          <option value="restaurant">Restaurant</option>
          <option value="library">Library</option>
          <option value="bar">Bar</option>
          <option value="cinema">Cinema</option>
        </select>
      </div>

      <button
        onClick={findPlaces}
        className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
      >
        Find Central Places
      </button>

      <div className="my-6">
        {centralPoint && <LeafletMapComponent centralPoint={centralPoint} places={places} />}
      </div>
    </div>
  );
};

export default FeedPage;
