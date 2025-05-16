import React, {useRef} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";


const BookingConfirmation = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const confirmationRef = useRef(); // Reference to the confirmation content


    // Assuming the user's data and event details are passed via `location.state`
    const { user, event } = location.state || {};
    

    if (!user || !event) {
        return (
            <div className="container text-center mt-5">
                <h2>Invalid Booking</h2>
                <p>It seems like there was an issue with your booking. Please try again.</p>
                <button className="btn btn-primary" onClick={() => navigate("/home")}>
                    Go Back to Home
                </button>
            </div>
        );
    }
    const handleDownloadAsPDF = () => {
    const element = confirmationRef.current;
    html2canvas(element, { useCORS: true })
        .then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4");
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
        pdf.save("BookingConfirmation.pdf");
    });
};

        

    return (
        <div className="container mt-5">
            <div className="card shadow-lg" ref={confirmationRef}>
                <div className="card-header bg-primary text-white text-center">
                    <h2>Booking Confirmation</h2>
                    <p>Congratulations! Thank you for booking with us, {user.name}!</p>
                </div>
                <div className="card-body">
                    <div className="row">
                        {/* User Details */}
                        <div className="col-md-6">
                            <h4 className="text-primary">Your Details</h4>
                            <ul className="list-group">
                                <li className="list-group-item">
                                    <strong>Name:</strong> {user.name}
                                </li>
                                <li className="list-group-item">
                                    <strong>Email:</strong> {user.email}
                                </li>
                                <li className="list-group-item">
                                    <strong>Phone:</strong> {user.phone || "N/A"}
                                </li>
                                <li className="list-group-item">
                                    <strong>Date of Birth:</strong> {user.dob ? new Date(user.dob).toLocaleDateString("en-GB") : "N/A"}
                                </li>
                                <li className="list-group-item">
                                    <strong>Address:</strong> {user.address || "N/A"}
                                </li>
                                <li className="list-group-item">
                                    <strong>National ID:</strong> {user.nationalId || "N/A"}
                                </li>
                            </ul>
                        </div>

                        {/* Event Details */}
                        <div className="col-md-6">
                            <h4 className="text-primary">Event Details</h4>
                            <ul className="list-group">
                                <li className="list-group-item">
                                    <strong>Title:</strong> {event.title}
                                </li>
                                <li className="list-group-item">
                                    <strong>Date:</strong> {new Date(event.date).toLocaleDateString()}
                                </li>
                                <li className="list-group-item">
                                    <strong>Time:</strong> {event.time}
                                </li>
                                <li className="list-group-item">
                                    <strong>Location:</strong> {event.location}
                                </li>
                                <li className="list-group-item">
                                    <strong>Price:</strong> {event.price} EGP
                                </li>
                                 <li className="list-group-item">
                                    <strong>Description:</strong> <br/>{event.description}
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Event Images */}
                    <div className="mt-4">
                        <h4 className="text-primary text-center">Event Images</h4>
                        <div className="d-flex justify-content-center flex-wrap gap-3">
                            {event.eventImage && (
                                <img
                                    src={event.eventImage}
                                    alt="Event"
                                    className="img-thumbnail"
                                    style={{ width: "300px", height: "200px", objectFit: "cover" }}
                                />
                            )}
                            {event.extraImages &&
                                event.extraImages.map((image, index) => (
                                    <img
                                        key={index}
                                        src={image}
                                        alt={`Extra ${index + 1}`}
                                        className="img-thumbnail"
                                        style={{ width: "300px", height: "200px", objectFit: "cover" }}
                                    />
                                ))}
                        </div>
                    </div>
                </div>
                <div className="card-footer text-center">
                    <button className="btn btn-success me-3" onClick={() => navigate("/home")}>
                        Go to Home
                    </button>
                    <button className="btn btn-secondary me-3" onClick={() => navigate("/my-bookings")}>
                        View My Bookings
                    </button>
<button className="btn btn-info" onClick={handleDownloadAsPDF}>
    Download as PDF
</button>
                </div>
            </div>
        </div>
    );
};

export default BookingConfirmation;