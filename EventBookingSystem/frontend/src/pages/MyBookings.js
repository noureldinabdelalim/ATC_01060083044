import React, {useState,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useDarkMode } from "../context/DarkModeContext";

const MyBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const {user} = useAuthContext()
    const {isDarkMode} = useDarkMode()
    

useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/user/myBookings`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${user.token}`, 
                    },
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch bookings");
                }

                const data = await response.json();
                setBookings(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchBookings();
    }, []);

    if (loading) {
        return (
            <div className="container text-center mt-5">
                <h2>Loading...</h2>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container text-center mt-5">
                <h2>Error</h2>
                <p>{error}</p>
                <button className="btn btn-primary" onClick={() => navigate("/home")}>
                    Go Back to Home
                </button>
            </div>
        );
    }

    if (!bookings || bookings.length === 0) {
        return (
            <div className="container text-center mt-5">
                <h2>No Bookings Found</h2>
                <p>You haven't booked any events yet. Start exploring and book your first event!</p>
                <button className="btn btn-primary" onClick={() => navigate("/home")}>
                    Explore Events
                </button>
            </div>
        );
    }

    return (
        <div className="container mt-5" >
            <h2 className="text-center mb-4">My Bookings</h2>
            <div className="row">
                {bookings.map((booking, index) => (
                    <div className="col-md-4 mb-4" key={index}>
                        <div className="card shadow-sm">
                            <img
                                src={booking.eventImage}
                                className="card-img-top"
                                alt={booking.title}
                                style={{ height: "200px", objectFit: "cover" }}
                            />
                            <div className={`card-body ${isDarkMode ? "bg-dark text-light" : ""}`}>
                                <h5 className="card-title">
    {booking.title.length > 8 ? `${booking.title.substring(0, 8)}...` : booking.title}
</h5>
                                <p className="card-text">
                                    <strong>Price:</strong> {booking.price} EGP
                                </p>
                                <p className="card-text">
                                    <strong>Date:</strong> {new Date(booking.date).toLocaleDateString()}
                                </p>
                                <button
                                    className="btn btn-primary"
                                    onClick={() =>
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
                    title: booking.title,
                    date: booking.date,
                    time: booking.time,
                    location: booking.location,
                    description: booking.description,
                    price: booking.price,
                    eventImage: booking.eventImage,
                    extraImages: booking.extraImages,
                },
            },
        })
                                    }
                                >
                                    Booking Confirmation
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyBookings;