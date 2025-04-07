const axios = require("axios");

exports.findNearbyPlaces = async (req, res) => {
  const { lat, lng, type = "cafe" } = req.body;
  const radius = 5000;

  const query = `
    [out:json];
    node["amenity"="${type}"](around:${radius},${lat},${lng});
    out;
  `;

  try {
    const response = await axios.post(
      "https://overpass-api.de/api/interpreter",
      query,
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    );

    const places = response.data.elements.map((place) => ({
      id: place.id,
      lat: place.lat,
      lng: place.lon,
      name: place.tags?.name || "Unnamed",
    }));

    res.json(places);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch from OSM" });
  }
};
