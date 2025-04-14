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

export const rsvpToEvent = async (eventId) => {
    const token = localStorage.getItem("token"); // ✅ Get the token from localStorage

    const response = await fetch(`${API_URL}/rsvp`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` // ✅ Send token in header
        },
        body: JSON.stringify({ eventId })
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to RSVP');
    }

    return await response.json();
};


