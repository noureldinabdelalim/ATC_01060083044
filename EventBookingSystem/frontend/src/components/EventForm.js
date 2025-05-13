import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useDarkMode } from "../context/DarkModeContext"; 

const EventForm = ({ fetchEvents }) => {
    const { user } = useAuthContext();
    const [title, setTitle] = useState("");
    const [date, setDate] = useState("");
    const [location, setLocation] = useState("");
    const [description, setDescription] = useState("");
    const [eventImage, setEventImage] = useState(null);
    const [tag, setTag] = useState("");
    const [availableTickets, setAvailableTickets] = useState(0);
    const [time, setTime] = useState("");
    const [error, setError] = useState(null);
    const [emptyFields, setEmptyFields] = useState([]);
    const [venue, setVenue] = useState("");
    const [price, setPrice] = useState(0);
    const [extraImages, setExtraImages] = useState([]);
    const { isDarkMode } = useDarkMode()
    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        if (!user) {
            setError("Log in first");
            return;
        }

        let imageUrl = "";

        if (eventImage) {
            const imageData = new FormData();
            imageData.append("file", eventImage);
            imageData.append("upload_preset", "EventSystem1");

            const cloudRes = await fetch("https://api.cloudinary.com/v1_1/do4wkv0zn/image/upload", {
                method: "POST",
                body: imageData,
            });

            const cloudJson = await cloudRes.json();
            imageUrl = cloudJson.secure_url;
        }

        let extraImageUrls = [];
        if (extraImages.length > 0) {
            const extraImagePromises = extraImages.map(async (image) => {
                const imageData = new FormData();
                imageData.append("file", image);
                imageData.append("upload_preset", "EventSystem1");

                const cloudRes = await fetch("https://api.cloudinary.com/v1_1/do4wkv0zn/image/upload", {
                    method: "POST",
                    body: imageData,
                });
                const cloudJson = await cloudRes.json();
                extraImageUrls.push(cloudJson.secure_url);
            });
            await Promise.all(extraImagePromises);
        }

        const event = {
            title,
            date,
            location,
            description,
            eventImage: imageUrl,
            tag,
            totalTickets: availableTickets,
            time,
            price,
            venue,
            extraImages: extraImageUrls,
        };

        try{
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/admin/event`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${user.token}`,
            },
            body: JSON.stringify(event),
        });

        const json = await response.json();
        if (response.ok) {
            console.log("Event created:", json);
            setTitle("");
            setDate("");
            setLocation("");
            setDescription("");
            setEventImage(null);
            setTag("");
            setAvailableTickets(0);
            setTime("");
            setPrice(0);
            setVenue("");
            setExtraImages([]);
            fetchEvents();
            setError(null);
            setEmptyFields([]);
            setIsLoading(false);
            setSuccess(true);

            setTimeout(() => {
                setSuccess(false);
            }
            , 4000)
        } else {
            console.log("Error creating event:", json);
            setEmptyFields(json.emptyFields);
            setError(json.error);
            setIsLoading(false);
        }
    }
    catch (err) {
        console.error("Error:", err);
        setError("An error occurred while creating the event.");
        setIsLoading(false);
    }
    };

    return (
        
               <div className={`${isDarkMode ? "bg-dark text-light" : ""}`} style={{ width: "50%", margin: "50px auto", textAlign: "left" }}> 
               {isLoading && (
                <div
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        backgroundColor: "rgba(0, 0, 0, 0.5)", // Fade background
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        zIndex: 1000,
                    }}
                >
                    <div
                        className="spinner-border text-light"
                        role="status"
                        style={{ width: "3rem", height: "3rem" }}
                    >
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            )}
            <form className="needs-validation" style={{
                    backgroundColor: isDarkMode ? "#333" : "#f0f0f0", // Dark mode background
                    color: isDarkMode ? "#fff" : "#000", // Light grey background
                    padding: "20px", // Add padding for spacing
                    borderRadius: isDarkMode ? "8px" : "8px", // Rounded corners
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Subtle shadow for better appearance
                }}
                onSubmit={handleSubmit} noValidate>
                <h2 style={{ textAlign: "center" }}>Create a new event</h2>
                {success && (
                    <div className="alert alert-success" role="alert">
                        Event created successfully!
                    </div>
                )}
                {error && (
                    <div className="alert alert-danger" role="alert">
                        {error}
                    </div>
                )}
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Event Title:</label>
                    <input
                        type="text"
                        className={`form-control ${emptyFields.includes("title") ? "is-invalid" : ""}`}
                        id="title"
                        placeholder="Enter event title"
                        required
                        value={title}
                        style={{
                            backgroundColor: isDarkMode ? "#555" : "#fff", // Input background for dark mode
                            color: isDarkMode ? "#fff" : "#000", // Input text color for dark mode
                        }}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <div className="valid-feedback">Valid.</div>
                    <div className="invalid-feedback">Please fill out this field.</div>
                </div>

                <div className="mb-3">
                    <label htmlFor="date" className="form-label">Date:</label>
                    <input
                        type="date"
                        className={`form-control ${emptyFields.includes("date") ? "is-invalid" : ""}`}
                        id="date"
                        required
                        value={date}
                        style={{
                            backgroundColor: isDarkMode ? "#555" : "#fff", // Input background for dark mode
                            color: isDarkMode ? "#fff" : "#000", // Input text color for dark mode
                        }}
                        onChange={(e) => setDate(e.target.value)}
                    />
                    <div className="valid-feedback">Valid.</div>
                    <div className="invalid-feedback">Please select a date.</div>
                </div>

                <div className="mb-3">
                    <label htmlFor="time" className="form-label">Time:</label>
                    <input
                        type="time"
                        className={`form-control ${emptyFields.includes("time") ? "is-invalid" : ""}`}
                        id="time"
                        required
                        value={time}
                        style={{
                            backgroundColor: isDarkMode ? "#555" : "#fff", // Input background for dark mode
                            color: isDarkMode ? "#fff" : "#000", // Input text color for dark mode
                        }}
                        onChange={(e) => setTime(e.target.value)}
                    />
                    <div className="valid-feedback">Valid.</div>
                    <div className="invalid-feedback">Please select a time.</div>
                </div>

                <div className="mb-3">
                    <label htmlFor="location" className="form-label">Location:</label>
                    <input
                        type="text"
                        className={`form-control ${emptyFields.includes("location") ? "is-invalid" : ""}`}
                        id="location"
                        placeholder="Enter location"
                        required
                        style={{
                            backgroundColor: isDarkMode ? "#555" : "#fff", // Input background for dark mode
                            color: isDarkMode ? "#fff" : "#000", // Input text color for dark mode
                        }}
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                    />
                    <div className="valid-feedback">Valid.</div>
                    <div className="invalid-feedback">Please fill out this field.</div>
                </div>

                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description:</label>
                    <textarea
                        className={`form-control ${emptyFields.includes("description") ? "is-invalid" : ""}`}
                        id="description"
                        placeholder="Enter event description"
                        required
                        style={{
                            backgroundColor: isDarkMode ? "#555" : "#fff", // Input background for dark mode
                            color: isDarkMode ? "#fff" : "#000", // Input text color for dark mode
                        }}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                    <div className="valid-feedback">Valid.</div>
                    <div className="invalid-feedback">Please fill out this field.</div>
                </div>
                <label htmlFor="tag" className="form-label">Tag:</label>
    <select
        id="tag"
        className="form-select"
        value={tag}
        onChange={(e) => setTag(e.target.value)}
        required
        style={{
                            backgroundColor: isDarkMode ? "#555" : "#fff", // Input background for dark mode
                            color: isDarkMode ? "#fff" : "#000", // Input text color for dark mode
                        }}
    >
        <option value="">Select a Tag</option>
        <option value="Sports">Sports</option>
        <option value="Music">Music</option>
        <option value="Gaming">Gaming</option>
        <option value="Theatre">Theatre</option>
        <option value="Opera">Opera</option>
        <option value="Festival">Festival</option>
        <option value="Ceremony">Ceremony</option>
    </select>
    <div className="invalid-feedback">Please select a tag.</div>

                <label>Available Tickets:</label>
                <input
                    type="number"
                    className={`form-control ${emptyFields.includes("availableTickets") ? "error" : ""}`}
                    required
                    min="0"
                    value={availableTickets}
                    style={{
                            backgroundColor: isDarkMode ? "#555" : "#fff", // Input background for dark mode
                            color: isDarkMode ? "#fff" : "#000", // Input text color for dark mode
                        }}
                    onChange={(e) => setAvailableTickets(e.target.value)}
                />
                <label>Price:</label>
                <input
                    type="number"
                    className={`form-control ${emptyFields.includes("price") ? "error" : ""}`}
                    required
                    min="0"
                    value={price}
                    style={{
                            backgroundColor: isDarkMode ? "#555" : "#fff", // Input background for dark mode
                            color: isDarkMode ? "#fff" : "#000", // Input text color for dark mode
                        }}
                    onChange={(e) => setPrice(e.target.value)}
                />
                <label>Venue:</label>
                <input
                    type="text"
                    className={`form-control ${emptyFields.includes("venue") ? "error" : ""}`}
                    required
                    value={venue}
                    style={{
                            backgroundColor: isDarkMode ? "#555" : "#fff", // Input background for dark mode
                            color: isDarkMode ? "#fff" : "#000", // Input text color for dark mode
                        }}
                    onChange={(e) => setVenue(e.target.value)}
                />
               <div className="mb-3">
                <label htmlFor="eventImage" className="form-label">Event Image:</label>
                <input
                    type="file"
                    className="form-control"
                    id="eventImage"
                    accept="image/*"
                    style={{
                            backgroundColor: isDarkMode ? "#555" : "#fff", // Input background for dark mode
                            color: isDarkMode ? "#fff" : "#000", // Input text color for dark mode
                        }}
                    required
                    onChange={(e) => {
                        const file = e.target.files[0];
                        setEventImage(file);
                    }}
                />
                {eventImage && (
                    <img
                        src={URL.createObjectURL(eventImage)}
                        alt="Event Preview"
                        style={{ width: "100px", height: "100px", marginTop: "10px" }}
                    />
                )}
            </div>

            <div className="mb-3">
                <label htmlFor="extraImages" className="form-label">Extra Images:</label>
                <input
                    type="file"
                    className="form-control"
                    id="extraImages"
                    accept="image/*"
                    style={{
                            backgroundColor: isDarkMode ? "#555" : "#fff", // Input background for dark mode
                            color: isDarkMode ? "#fff" : "#000", // Input text color for dark mode
                        }}
                    multiple
                    onChange={(e) => {
                        const files = Array.from(e.target.files);
                        setExtraImages((prevImages) => [...prevImages, ...files]);
                    }}
                />
                <div style={{ display: "flex", gap: "10px", marginTop: "10px", flexWrap: "wrap" }}>
                    {extraImages.map((image, index) => (
                        <img
                            key={index}
                            src={URL.createObjectURL(image)}
                            alt={`Extra ${index + 1}`}
                            style={{ width: "100px", height: "100px" }}
                        />
                    ))}
                </div>
            </div>
                <button className="btn btn-primary" disabled={isLoading} style={{margin: "10px auto", display: "block", width: "100%"}}>Create Event</button>
                {error && <div className="error">{error}</div>}
            </form>
        </div>
    );
};

export default EventForm;