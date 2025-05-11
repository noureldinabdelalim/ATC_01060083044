import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useDarkMode } from "../context/DarkModeContext";


const EventDetails = ({ event, fetchEvents }) => {
    const { user, bookings, dispatch } = useAuthContext();
    const [isExpanded, setIsExpanded] = useState(false);
    const hasBooked = bookings?.some((booking) => booking._id === event._id);
    const isAdmin = user?.role === "admin"; 
    const isSoldOut = event.availableTickets <= 0; 
    const { isDarkMode } = useDarkMode()
    const navigate = useNavigate();



    const handleEditEvent = () => {
        navigate(`/edit-event/${event._id}`); // Redirect to the edit event page
    };
    const handleBookNow = async () => {
        if (!user) return;

        console.log("Booking event:", event._id);
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/user/book/${event._id}`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        });

        const json = await response.json()
        if (response.ok) {
            console.log("Booking successful:", json)
            fetchEvents()
            dispatch({ type: "SET_BOOKINGS", payload: [...bookings, event] })
                    navigate("/booking-confirmation", {
            state: {
                user: {
                    name: user.name,
                    email: user.email,
                    phone: user.phone || "N/A",
                    dob: user.dob || "N/A",
                    address: user.address || "N/A",
                    nationalId: user.nationalId || "N/A",
                },
                event: {
                    title: event.title,
                    date: event.date,
                    time: event.time,
                    location: event.location,
                    description: event.description,
                    price: event.price,
                    eventImage: event.eventImage,
                    extraImages: event.extraImages,
                },
            },
        })
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
            fetchEvents(); 
            const updatedBookings = bookings.filter((booking) => booking._id !== event._id);
            dispatch({ type: "SET_BOOKINGS", payload: updatedBookings });        } else {
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
        <div className={`event-details card ${isDarkMode ? "bg-dark text-light" : ""}`} style={{ cursor: "default" }}>
            <div
                className="btn-group-vertical"
                style={{
                    position: "absolute",
                    top: "10px", 
                    right: "10px", 
                    zIndex: 1, 
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
                        <button className="btn btn-secondary" onClick={handleEditEvent}>Edit</button>
                        <button className="btn btn-danger" onClick={handleDeleteEvent}>
                            Delete
                        </button>
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
                </div>
            </div>
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
        </div>
    );
};

export default EventDetails;