const API_URL = 'http://localhost:5000/api/events';
export const createEvent = async (eventData) => {
    const res = await fetch(`${API_URL}/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(eventData),
    });
    if (!res.ok) throw new Error('Failed to create event');
    return res.json();
};

export const getEvents = async () => {
    const res = await fetch(`${API_URL}/all`); // This matches GET /
    if (!res.ok) throw new Error('Failed to load events');
    return res.json();
};

export const rsvpToEvent = async (eventId, userId) => {
    const dummyUserId = "661e9c20f1e68a0c4cbf55a2"; // Replace with a real MongoDB User _id from your Users collection
    const response = await fetch(`${API_URL}/rsvp`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            eventId,
            userId: dummyUserId
        })
    });

    if (!response.ok) {
        throw new Error('Failed to RSVP');
    }

    return await response.json();
};

