import { rsvpToEvent } from '../api/eventApi';
import { useAuth } from '../AuthContext'; // use context to get user info

const EventCard = ({ event, onRSVPSuccess }) => {
    const { user } = useAuth();
    const userId = user?.id;

    const hasRSVPed = userId && event.attendees.some(id => id === userId || id.toString() === userId);


    const handleRSVP = async () => {
        if (!userId) {
            alert("You must be logged in to RSVP.");
            return;
        }

        try {
            await rsvpToEvent(event._id, userId);
            onRSVPSuccess?.(event._id);
        } catch (err) {
            console.error("RSVP error:", err);
            alert("Could not RSVP. Try again.");
        }
    };

    return (
        <div className="event-card border p-4 rounded shadow mb-4 bg-white">
            <h3 className="text-xl font-bold">{event.name}</h3>
            <p>{event.description}</p>
            <p>📍 {event.location} | 📅 {new Date(event.date).toDateString()}</p>
            <p>🎟 {event.attendees.length}/{event.maxAttendees} Attendees</p>
            <button
                onClick={handleRSVP}
                disabled={hasRSVPed || event.attendees.length >= event.maxAttendees}
                className={`mt-2 px-4 py-2 rounded text-white ${
                    hasRSVPed
                        ? 'bg-gray-500 cursor-not-allowed'
                        : event.attendees.length >= event.maxAttendees
                        ? 'bg-red-500 cursor-not-allowed'
                        : 'bg-purple-600 hover:bg-purple-700'
                }`}
            >
                {hasRSVPed ? "RSVP'd" : "RSVP"}
            </button>
        </div>
    );
};

export default EventCard;
