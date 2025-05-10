import { useState, useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

const EventDetails = ({ event, fetchEvents }) => {
    const { user, bookings, dispatch } = useAuthContext();
    const [isExpanded, setIsExpanded] = useState(false);
    const hasBooked = bookings?.some((booking) => booking._id === event._id);
    const isAdmin = user?.role === "admin"; 
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
            fetchEvents(); 
            dispatch({ type: "SET_BOOKINGS", payload: [...bookings, event] });
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
        <div className="event-details card" style={{ cursor: "default" }}>
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
                        <button className="btn btn-secondary">Edit</button>
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
        </div>
    );
};

export default EventDetails;