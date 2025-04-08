import EventForm from "../components/EventForm";
import EventList from "../components/EventList";

const EventsPage = () => {
    return (
        <div className="events-page">
            <h1>Events</h1>
            <div className="events-container">
                <div className="event-form-section">
                    <h2>Create an Event</h2>
                    <EventForm />
                </div>
                <div className="event-list-section">
                    <h2>Upcoming Events</h2>
                    <EventList />
                </div>
            </div>
        </div>
    );
};

export default EventsPage;
