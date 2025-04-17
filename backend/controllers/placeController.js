const axios = require("axios");

const haversineDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
    Math.cos((lat2 * Math.PI) / 180) *
    Math.sin(dLon / 2) ** 2;
  return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
};

exports.findNearbyPlaces = async (req, res) => {
  const { lat, lng, type = "cafe" } = req.body;
  const radius = 5000;

  const query = `
    [out:json];
    (
      node["amenity"="${type}"](around:${radius},${lat},${lng});
      way["amenity"="${type}"](around:${radius},${lat},${lng});
      relation["amenity"="${type}"](around:${radius},${lat},${lng});
    );
    out center;
  `;

  try {
    const response = await axios.post(
      "https://overpass-api.de/api/interpreter",
      query,
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    );

    const results = response.data.elements.map((place) => {
      const placeLat = place.lat || place.center?.lat;
      const placeLng = place.lon || place.center?.lon;
      return {
        id: place.id,
        lat: placeLat,
        lng: placeLng,
        name: place.tags?.name || "Unnamed",
        distance: haversineDistance(lat, lng, placeLat, placeLng),
      };
    });

    const topPlaces = results
      .sort((a, b) => a.distance - b.distance)
      .slice(0, 7);

    res.json(topPlaces);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch from OSM" });
  }
};
