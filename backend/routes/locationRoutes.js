const express = require("express");
const router = express.Router();
const { calculateCentralLocation } = require("../controllers/locationController");

router.post("/central", calculateCentralLocation);

module.exports = router;
