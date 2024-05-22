import { useState } from "react";
import userAxios from "./apis/userApi";

const UserCreate = ({ isEventDataGotten, userId, events, setEvents, logUser }) => {
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [location, setLocation] = useState('');
    const [venue, setVenue] = useState('');
    const [description, setDescription] = useState('');
    const [booking, setBooking] = useState([]);
    const [isCreated, setIsCreated] = useState(null);

    const handleCreateEvent = (e) => {
        // prevent the default action of form submission to server
        e.preventDefault();
        /*
            Also this function cannot be triggered only
            when the form to create event shows, and that
            form cannot be shown only when the events data
            have been gotten, so we have prop drilled the
            events data to this component from the app2
            component.
            so use this event data to now the event with the highest
            id.
        */
        let id = events.length ? events.reduce((accumulator, currentValue) => typeof accumulator === "number" ? accumulator > currentValue.id ? accumulator : currentValue.id : accumulator.id > currentValue.id ? accumulator.id : currentValue.id, 0) : 0;
        id = parseInt(id) + 1;

        // create new event object
        const newEvent = { id: `${id}`, userId, title, date, time, location, venue, description, booking};
        // now add the new event to previous events created
        const allEvents = [...events, newEvent];
        // create a function to post the new event to the events endpoint
        // post new event to the database
        const addEvent = async (newEvent) => {
            try {
                const eventData = await userAxios.post('/events/', newEvent);
                console.log(eventData.data);
            } catch (error) {
                console.error(`An Error with status ${error.response.status} and headers of ${error.response.headers} with data ${error.response.data} occured :(`);     
            }
        }
        addEvent(newEvent);
        setEvents(allEvents);
        setTitle('');
        setDate('');
        setTime('');
        setLocation('');
        setVenue('');
        setDescription('');
        setBooking([]);
        setIsCreated("Event was successfully created !!!");
    }

    return (
        <div>
            {logUser.length !== 0 ? logUser[0].isLoggedin ? isEventDataGotten ?
                (<section>
                    {isCreated ? <p>{isCreated}</p> : null}
                    <form onSubmit={(e) => handleCreateEvent(e)}>
                        <p>
                            <label htmlFor="title">Event Title</label>
                            <input
                                type="text"
                                id="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </p>
                        <p>
                            <label htmlFor="date">Event Date</label>
                            <input
                                type="date"
                                id="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                            />
                        </p>
                        <p>
                            <label htmlFor="time">Event Time</label>
                            <input
                                type="time"
                                id="time"
                                value={time}
                                onChange={(e) => setTime(e.target.value)}
                            />
                        </p>
                        <p>
                            <label htmlFor="location">Event Location</label>
                            <input
                                type="text"
                                id="location"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                            />
                        </p>
                        <p>
                            <label htmlFor="venue">Event Venue</label>
                            <input
                                type="text"
                                id="venue"
                                value={venue}
                                onChange={(e) => setVenue(e.target.value)}
                            />
                        </p>
                        <p>
                            <label htmlFor="description">Event Description</label>
                            <textarea
                                id="description"
                                rows="30"
                                cols="30"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </p>
                        <p>
                            <button type="submit">
                                Create Event
                            </button>
                        </p>
                    </form>
                </section>) : <p>Loading the Events before Events can be created...</p> : null : null}
        </div>
    );
}
export default UserCreate;