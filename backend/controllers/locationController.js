const axios = require("axios");

const geocode = async (address) => {
  const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json`;
  const res = await axios.get(url);
  const data = res.data;
  if (!data.length) throw new Error("No result for address");
  return { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) };
};

exports.calculateCentralLocation = async (req, res) => {
  try {
    const { addresses } = req.body;

    const coords = await Promise.all(addresses.map((addr) => geocode(addr)));

    const avgLat = coords.reduce((sum, loc) => sum + loc.lat, 0) / coords.length;
    const avgLng = coords.reduce((sum, loc) => sum + loc.lng, 0) / coords.length;

    res.json({
      resolvedLocations: coords,
      central: { lat: avgLat, lng: avgLng },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Geocoding failed" });
  }
};
