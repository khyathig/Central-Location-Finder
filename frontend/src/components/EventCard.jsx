import { useState, useEffect } from 'react';
import { rsvpToEvent, unrsvpFromEvent } from '../api/eventApi';
import { useAuth } from '../AuthContext';

const EventCard = ({ event, onRSVPSuccess }) => {
    const { user } = useAuth();
    const userId = user?.id;

    const [attendees, setAttendees] = useState(event.attendees);
    const [hasRSVPed, setHasRSVPed] = useState(false);

    const eventDate = new Date(event.date);
    const now = new Date();
    const timeDiff = eventDate.getTime() - now.getTime();
    const canUnrsvp = timeDiff >= 24 * 60 * 60 * 1000;

    useEffect(() => {
        setHasRSVPed(userId && attendees.some(id => id === userId || id.toString() === userId));
    }, [attendees, userId]);

    const handleRSVP = async () => {
        if (!userId) {
            alert("You must be logged in to RSVP.");
            return;
        }

        try {
            await rsvpToEvent(event._id, userId);
            setAttendees(prev => [...prev, userId]);
            setHasRSVPed(true);
            onRSVPSuccess?.(event._id);
        } catch (err) {
            console.error("RSVP error:", err);
            alert("Could not RSVP. Try again.");
        }
    };

    const handleUnrsvp = async () => {
        try {
            await unrsvpFromEvent(event._id);
            setAttendees(prev => prev.filter(id => id !== userId && id.toString() !== userId));
            setHasRSVPed(false);
            onRSVPSuccess?.(event._id);
        } catch (err) {
            console.error("Un-RSVP error:", err);
            alert(err.message || "Could not un-RSVP.");
        }
    };

    return (
        <div className="event-card border p-4 rounded shadow mb-4 bg-white">
            <h3 className="text-xl font-bold">{event.name}</h3>
            <p>{event.description}</p>
            <p>📍 {event.location} | 📅 {eventDate.toDateString()}</p>
            <p>🎟 {attendees.length}/{event.maxAttendees} Attendees</p>

            {hasRSVPed ? (
                <button
                    onClick={handleUnrsvp}
                    disabled={!canUnrsvp}
                    className={`mt-2 px-4 py-2 rounded text-white ${
                        canUnrsvp ? 'bg-red-600 hover:bg-red-700' : 'bg-gray-400 cursor-not-allowed'
                    }`}
                >
                    {canUnrsvp ? "Un-RSVP" : "Un-RSVP Disabled (less than 1 day)"}
                </button>
            ) : (
                <button
                    onClick={handleRSVP}
                    disabled={attendees.length >= event.maxAttendees}
                    className={`mt-2 px-4 py-2 rounded text-white ${
                        attendees.length >= event.maxAttendees
                            ? 'bg-gray-500 cursor-not-allowed'
                            : 'bg-purple-600 hover:bg-purple-700'
                    }`}
                >
                    RSVP
                </button>
            )}
        </div>
    );
};

export default EventCard;
