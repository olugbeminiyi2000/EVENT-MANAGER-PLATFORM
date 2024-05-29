import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const UserBookedEventList = ({ userId, events, logUser }) => {
    const [userEvents, setUserEvents] = useState([]);
    const [page, setPage] = useState(0);
    const eventPerPage = 3;
    const charToPrint = 25;

    useEffect(() => {
        const getUserEvents = events.filter((event) => event.userId === userId && event.booking.length > 0);
        setUserEvents(getUserEvents);
    }, [events, userId]);

    const slicedUserEvents = userEvents.slice(page, page + eventPerPage);

    const handleNext = () => {
        setPage(page + eventPerPage);
    };
    const handleBack = () => {
        setPage(page - eventPerPage);
    };

    return (
        <div>
            {logUser.length !== 0 ? logUser[0].isLoggedin ? slicedUserEvents.length > 0 ? slicedUserEvents.map((slicedUserEvent) => <div key={`${slicedUserEvent.id}`}>
                <div>
                    <h3>{slicedUserEvent.title}</h3>
                    <p>{slicedUserEvent.date}</p>
                    <p>{slicedUserEvent.time}</p>
                    <p>{slicedUserEvent.location}</p>
                    <p>{slicedUserEvent.venue}</p>
                    <p>booking(s): {slicedUserEvent.booking.length}</p>
                    <div>{(slicedUserEvent.description).length > charToPrint ? `${(slicedUserEvent.description).slice(0, charToPrint)}...` : slicedUserEvent.description}</div>
                </div>
                <Link to={`/user/${userId}/event/${slicedUserEvent.id}`}>
                    <button
                    >
                        Read More
                    </button>
                </Link>
            </div>) : <p>Users has no Booked Events currently Available.</p> : null : null}
            {userEvents[page + eventPerPage] ? (
                <button type="button" onClick={handleNext}>
                    Next Page
                </button>
            ) : null}
            {userEvents[page - eventPerPage] ? (
                <button type="button" onClick={handleBack}>
                    Previous Page
                </button>
            ) : null}
        </div>
    );
}

export default UserBookedEventList;