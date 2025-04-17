const express = require("express");
const { createEvent, getEvents, rsvpToEvent } = require("../controllers/eventController");
const { unrsvpFromEvent } = require("../controllers/eventController");
const authenticateToken = require("../middleware/authMiddleware");

const router = express.Router();



// Route to create an event
router.post("/create", createEvent);

// Route to fetch all events
router.get("/all", getEvents);

// Route to RSVP to an event
router.post("/rsvp", authenticateToken, rsvpToEvent);

router.post("/unrsvp", authenticateToken, unrsvpFromEvent);

module.exports = router;
