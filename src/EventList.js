import { useState } from "react";
import { Link } from "react-router-dom";

const EventList = ({ events, isEventDataGotten }) => {
    const [page, setPage] = useState(0);
    const eventPerPage = 3;
    const charToPrint = 25;
    const slicedEvents = events.slice(page, page + eventPerPage);

    const handleNext = () => {
        setPage(page + eventPerPage);
    };
    const handleBack = () => {
        setPage(page - eventPerPage);
    };

    return (
        <div>
            {isEventDataGotten ? slicedEvents.length > 0 ? slicedEvents.map((slicedEvent) => <div key={`${slicedEvent.id}`}>
                <Link to={`/event/${slicedEvent.id}`}>
                    <div>
                        <h3>{slicedEvent.title}</h3>
                        <p>{slicedEvent.date}</p>
                        <p>{slicedEvent.time}</p>
                        <p>{slicedEvent.location}</p>
                        <p>{slicedEvent.venue}</p>
                    </div>
                </Link>
                <div>{(slicedEvent.description).length > charToPrint ? `${(slicedEvent.description).slice(0, charToPrint)}...` : slicedEvent.description}</div>
            </div>) : <p>No Events currently Available.</p> : <p>Loading up all events...</p>}
            {events[page + eventPerPage] ? (
                <button type="button" onClick={handleNext}>
                    Next Page
                </button>
            ) : null}
            {events[page - eventPerPage] ? (
                <button type="button" onClick={handleBack}>
                    Previous Page
                </button>
            ) : null} 
        </div>
    );
}

export default EventList;