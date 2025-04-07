const express = require("express");
const router = express.Router();
const { findNearbyPlaces } = require("../controllers/placeController");

router.post("/nearby-places", findNearbyPlaces);

module.exports = router;
