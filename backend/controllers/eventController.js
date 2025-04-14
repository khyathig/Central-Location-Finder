const Event = require("../models/Event");
const RSVP = require("../models/RSVP");


// Create an event
const createEvent = async (req, res) => {
    try {
        const { name, date, location, maxAttendees, description } = req.body;
        const event = new Event({ name, date, location, maxAttendees, description, attendees: [] });
        await event.save();
        res.status(201).json({ message: "Event created successfully", event });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all events
const getEvents = async (req, res) => {
    try {
        const events = await Event.find();
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// RSVP to an event
const rsvpToEvent = async (req, res) => {
    try {
        console.log("🔐 Auth Header:", req.headers['authorization']);
        console.log("👤 Decoded User:", req.user);

        const userId = req.user.id; // ✅ Securely extracted from token
        const { eventId } = req.body;

        console.log("📨 RSVP attempt by user:", userId, "for event:", eventId);

        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ error: "Event not found" });
        }

        // Check if the event is full
        if (event.attendees.length >= event.maxAttendees) {
            return res.status(400).json({ error: "Event is already full" });
        }

        // Check if user has already RSVP'd
        const existingRSVP = await RSVP.findOne({ userId, eventId });
        if (existingRSVP) {
            return res.status(400).json({ error: "You have already RSVP'd for this event" });
        }

        // Save RSVP
        const rsvp = new RSVP({ userId, eventId });
        await rsvp.save();

        // Add user to event attendees
        event.attendees.push(userId);
        await event.save();

        res.status(200).json({ message: "RSVP successful", event });
    } catch (error) {
        console.error("🔥 RSVP Error:", error);
        res.status(500).json({ error: error.message });
    }
};


module.exports = { createEvent, getEvents, rsvpToEvent };

