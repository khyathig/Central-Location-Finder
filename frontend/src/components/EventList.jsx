import { useEffect, useState } from 'react';
import { getEvents } from '../api/eventApi';
import EventCard from './EventCard';
import { useAuth } from '../AuthContext';

const EventList = () => {
    const [events, setEvents] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const data = await getEvents();
                setEvents(data);
            } catch (err) {
                console.error('Failed to fetch events:', err);
                setError('Unable to load events. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    const handleRSVPSuccess = (eventId) => {
        if (!user?.id) return;

        setEvents(prevEvents =>
            prevEvents.map(event =>
                event._id === eventId
                    ? { ...event, attendees: [...event.attendees, user.id] }
                    : event
            )
        );
    };

    if (loading) return <p>Loading events...</p>;
    if (error) return <p style={{ color: 'red' }}>{error}</p>;
    if (events.length === 0) return <p>No upcoming events found.</p>;

    return (
        <div className="event-list">
            {events.map(event => (
                <EventCard
                    key={event._id}
                    event={event}
                    onRSVPSuccess={handleRSVPSuccess}
                />
            ))}
        </div>
    );
};

export default EventList;
