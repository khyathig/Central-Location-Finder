import { useState } from "react";
import { createEvent } from "../api/eventApi";

const EventForm = () => {
    const [formData, setFormData] = useState({
        name: "",
        date: "",
        location: "",
        maxAttendees: "",
        description: "",
    });
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createEvent(formData);
            alert("Event created!");
            setFormData({
                name: "",
                date: "",
                location: "",
                maxAttendees: "",
                description: "",
            });
        } catch (err) {
            console.error("Error creating event:", err);
            setError("Failed to create event.");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Event Name" required />
            <input type="date" name="date" value={formData.date} onChange={handleChange} required />
            <input type="text" name="location" value={formData.location} onChange={handleChange} placeholder="Location" required />
            <input type="number" name="maxAttendees" value={formData.maxAttendees} onChange={handleChange} placeholder="Max Attendees" required />
            <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Event Description" required />
            <button type="submit">Create Event</button>
        </form>
    );
};

export default EventForm;
