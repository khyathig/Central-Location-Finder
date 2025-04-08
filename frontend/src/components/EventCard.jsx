import { rsvpToEvent } from '../api/eventApi';

const dummyUserId = "661e9c20f1e68a0c4cbf55a2"; // Replace with real user logic later

const EventCard = ({ event }) => {
    const hasRSVPed = event.attendees.includes(dummyUserId);

    const handleRSVP = async () => {
        try {
            await rsvpToEvent(event._id, dummyUserId);
            window.location.reload(); // Or update state to re-render without reload
        } catch (err) {
            console.error("RSVP error:", err);
        }
    };

    return (
        <div className="event-card">
            <h3>{event.name}</h3>
            <p>{event.description}</p>
            <p>📍 {event.location} | 📅 {new Date(event.date).toDateString()}</p>
            <p>🎟 {event.attendees.length}/{event.maxAttendees} Attendees</p>
            <button
                onClick={handleRSVP}
                disabled={hasRSVPed || event.attendees.length >= event.maxAttendees}
            >
                {hasRSVPed ? "RSVP'd" : "RSVP"}
            </button>
        </div>
    );
};

export default EventCard;
