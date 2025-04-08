const express = require("express");
const { createEvent, getEvents, rsvpToEvent } = require("../controllers/eventController");

const router = express.Router();

// Route to create an event
router.post("/create", createEvent);

// Route to fetch all events
router.get("/all", getEvents);

// Route to RSVP to an event
router.post("/rsvp", rsvpToEvent);

module.exports = router;
