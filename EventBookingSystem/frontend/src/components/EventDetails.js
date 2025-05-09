import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

const EventDetails = ({ event, fetchEvents }) => {
    const { user } = useAuthContext();
    const [isExpanded, setIsExpanded] = useState(false);
    const isAdmin = user?.role === "admin"; // Check if the user is an admin
    const hasBooked = user?.bookedEvents?.includes(event._id); // Check if the user has already booked the event
    const isSoldOut = event.availableTickets <= 0;

        const handleBookNow = async () => {
        if (!user) return;

        console.log("Booking event:", event._id);
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/user/book/${event._id}`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        });

        const json = await response.json();
        if (response.ok) {
            console.log("Booking successful:", json);
            fetchEvents(); // Refresh events
        } else {
            console.log("Error booking event:", json.error);
        }
    };

        const handleCancelBooking = async () => {
        if (!user) return;

        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/user/cancel/${event._id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        });

        const json = await response.json();
        if (response.ok) {
            console.log("Booking canceled:", json);
            fetchEvents(); // Refresh events
        } else {
            console.log("Error canceling booking:", json.error);
        }
    };

    const handleDeleteEvent = async () => {
        if (!user) return;

        const URL = process.env.REACT_APP_BACKEND_URL;
        const response = await fetch(`${URL}/admin/event/${event._id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        });

        const json = await response.json();
        if (response.ok) {
            console.log(json);
            fetchEvents();
        } else {
            console.log("Error deleting event");
        }
    };

    return (
        <div className="event-details card" style={{ cursor: "default" }}>
                <div
        className="btn-group-vertical"
        style={{
            position: "absolute",
            top: "10px", // Padding from the top
            right: "10px", // Padding from the right
            zIndex: 1, // Ensure buttons are above other content
        }}
    >
        <button
            type="button"
            className="btn btn-success"
            onClick={() => setIsExpanded((prev) => !prev)}
        >
            {isExpanded ? "Hide Details" : "View Details"}
        </button>
       {isAdmin && (
                        <>
                            <button className="btn btn-secondary">Edit</button>
                            <button className="btn btn-danger" onClick={handleDeleteEvent}>Delete</button>
                        </>
                    )}
        {!isAdmin && (
                        <>
                            <button
                                className="btn btn-success"
                                onClick={handleBookNow}
                                disabled={hasBooked || isSoldOut}
                            >
                                {isSoldOut ? "Sold Out" : hasBooked ? "Already Booked" : "Book Now"}
                            </button>
                            <button
                                className="btn btn-warning"
                                onClick={handleCancelBooking}
                                disabled={!hasBooked}
                            >
                                {hasBooked ? "Cancel Booking" : "Not Booked"}
                            </button>
                        </>
                    )}
    </div>
            <div className="card-body d-flex">
                {/* Event Image */}
                {event.eventImage && (
                    <img
                        src={event.eventImage}
                        alt={event.title}
                        style={{
                            width: "300px",
                            height: "200px",
                            objectFit: "cover",
                            marginRight: "15px",
                        }}
                    />
                )}
                {/* Event Details */}
                <div>
                    <h2 className="card-title">{event.title}</h2>
                    <p>
                        <strong>Date: </strong>
                        {new Date(event.date).toLocaleDateString()}
                    </p>
                    <p>
                        <strong>Available Tickets: </strong>
                        {event.availableTickets}
                    </p>
                    <p>
                        <strong>Price: </strong>
                        {event.price} <strong>EGP</strong>
                    </p>
                    {/* <button
                        className="btn btn-primary mt-2"
                        onClick={() => setIsExpanded((prev) => !prev)}
                    >
                        {isExpanded ? "Hide Details" : "View Details"}
                    </button> */}
                </div>
            </div>

            {/* Expanded Details */}
            {isExpanded && (
                <div className="card-body">
                    <div className="row">
                        <div className="col">
                            <p style={{ textAlign: "left" }}>
                                <strong>Description: </strong>
                                <br />
                                {event.description}
                            </p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-4">
                            <p style={{ textAlign: "left" }}>
                                <strong>Location: </strong>
                                {event.location}
                            </p>
                        </div>
                        <div className="col-sm-8">
                            <p style={{ textAlign: "left" }}>
                                <strong>Time: </strong>
                                {event.time}
                            </p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-4">
                            <p style={{ textAlign: "left" }}>
                                <strong>Venue: </strong>
                                {event.venue}
                            </p>
                        </div>
                        <div className="col-sm-8">
                            <p style={{ textAlign: "left" }}>
                                <strong>Tag: </strong>
                                {event.tag}
                            </p>
                        </div>
                    </div>

                    {/* Carousel for extraImages */}
                    {event.extraImages && event.extraImages.length > 0 && (
                        <div id={`carousel-${event._id}`} className="carousel slide" data-bs-ride="carousel">
                            {/* Indicators */}
                            <div className="carousel-indicators">
                                {event.extraImages.map((_, index) => (
                                    <button
                                        key={index}
                                        type="button"
                                        data-bs-target={`#carousel-${event._id}`}
                                        data-bs-slide-to={index}
                                        className={index === 0 ? "active" : ""}
                                        aria-current={index === 0 ? "true" : undefined}
                                        aria-label={`Slide ${index + 1}`}
                                    ></button>
                                ))}
                            </div>

                            {/* Carousel Items */}
                            <div className="carousel-inner">
                                {event.extraImages.map((image, index) => (
                                    <div
                                        key={index}
                                        className={`carousel-item ${index === 0 ? "active" : ""}`}
                                    >
                                        <img
                                            src={image}
                                            alt={`Slide ${index + 1}`}
                                            className="d-block w-100"
                                            style={{ maxHeight: "400px", objectFit: "cover" }}
                                        />
                                    </div>
                                ))}
                            </div>

                            {/* Controls */}
                            <button
                                className="carousel-control-prev"
                                type="button"
                                data-bs-target={`#carousel-${event._id}`}
                                data-bs-slide="prev"
                            >
                                <span className="carousel-control-prev-icon"></span>
                            </button>
                            <button
                                className="carousel-control-next"
                                type="button"
                                data-bs-target={`#carousel-${event._id}`}
                                data-bs-slide="next"
                            >
                                <span className="carousel-control-next-icon"></span>
                            </button>
                        </div>
                    )}
                </div>
            )}

            {/* Delete Button */}
            {/* <span
                className="material-symbols-outlined"
                
                style={{ cursor: "pointer", color: "red", padding: "10px" }}
            >
                delete
            </span> */}
            {/* <div class="btn-group-vertical">
            <button type="button" class="btn btn-success" onClick={() => setIsExpanded((prev) => !prev)}
                    >
                        {isExpanded ? "Hide Details" : "View Details"}
                    </button>
            <button type="button" class="btn btn-secondary">Edit Details</button>
            <button type="button" class="btn btn-danger" onClick={handleClick}>Delete</button>
            </div> */}
        </div>
    );
};

export default EventDetails;