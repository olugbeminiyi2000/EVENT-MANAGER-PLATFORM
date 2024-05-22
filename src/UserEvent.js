import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import userAxios from "./apis/userApi";

const UserEventList = ({ events, logUser, navigate, setEvents, userId }) => {
    const [theEvent, setTheEvent] = useState([]);
    const [isEventGotten, setIsEventGotten] = useState(null);
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [location, setLocation] = useState('');
    const [venue, setVenue] = useState('');
    const [description, setDescription] = useState('');
    const { id } = useParams();

    useEffect(() => {
        const getEvent = events.filter((event) => event.id === id);
        if (getEvent.length === 0) {
            setTheEvent(getEvent);
            setIsEventGotten("Data is gotten so show form");
        } else {
            setTheEvent(getEvent);
            setTitle(getEvent[0].title);
            setDate(getEvent[0].date);
            setTime(getEvent[0].time);
            setLocation(getEvent[0].location);
            setVenue(getEvent[0].venue);
            setDescription(getEvent[0].description);
            setIsEventGotten("Data is gotten so show form");
        }
    }, [id, events]);

    const handleDelete = () => {
        /*
          try to filter the event being deleted
          from the events array using the id, then
          the filtered array is being set to the setEvents
          state variable function
        */
        const allEvents = events.filter((event) => event.id !== id);
        const deleteEvent = async () => {
            try {
                await userAxios.delete(`/events/${id}`);
            } catch (error) {
                console.error(`An Error with status ${error.response.status} and headers of ${error.response.headers} with data ${error.response.data} occured :(`);
            }
        }
        deleteEvent();
        setEvents(allEvents);
        navigate(`/user/${userId}/events`);
    };


    return (
        <div>
            {logUser.length !== 0 ? logUser[0].isLoggedin ? isEventGotten ? theEvent.length > 0 ? (
                <section>
                    <div>
                        <h3>{title}</h3>
                        <p>{date}</p>
                        <p>{time}</p>
                        <p>{location}</p>
                        <p>{venue}</p>
                        <div>{description}</div>
                    </div>
                    <div>
                        <button
                            type="button"
                        >
                            <Link to={`/user/${userId}/edit/${id}`}>
                                Edit Event
                            </Link>
                        </button>
                        <button
                            type="button"
                            onClick={handleDelete}
                        >
                            Delete Event
                        </button>
                    </div>
                </section>
            ) : <p>No event Found!!!</p> : <p>Loading the events before crud can be done...</p> : null : null}
        </div>
    );
}

export default UserEventList;