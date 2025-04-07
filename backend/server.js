const express = require("express");
const cors = require("cors");
const app = express();

const placeRoutes = require("./routes/placeRoutes");
const locationRoutes = require("./routes/locationRoutes");

app.use(cors());
app.use(express.json());

app.use("/api/places", placeRoutes);
app.use("/api/locations", locationRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
