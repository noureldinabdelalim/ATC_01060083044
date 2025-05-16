import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useDarkMode } from "../context/DarkModeContext"; // Import the custom hook for dark mode

const EditEvent = () => {
  const { id } = useParams(); // Get the event ID from the URL
  const navigate = useNavigate();
  const { user } = useAuthContext();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [venue, setVenue] = useState("");
  const [tag, setTag] = useState("");
  const [totalTickets, setTotalTickets] = useState("");
  const [eventImage, setEventImage] = useState("");
  const [extraImages, setExtraImages] = useState([]);
  const [error, setError] = useState(null);
  const { isDarkMode } = useDarkMode();

  useEffect(() => {
    // Fetch the event details to pre-fill the form
    const fetchEventDetails = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/event/${id}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      const event = await response.json();
      if (response.ok) {
        setTitle(event.title);
        setDescription(event.description);
        const formattedDate = new Date(event.date).toISOString().split("T")[0];
        setDate(formattedDate);
        setTime(event.time);
        setLocation(event.location);
        setPrice(event.price);
        setVenue(event.venue);
        setTag(event.tag);
        setTotalTickets(event.totalTickets);
        setEventImage(event.eventImage);
        setExtraImages(event.extraImages);
      } else {
        setError("Failed to fetch event details.");
      }
    };

    fetchEventDetails();
  }, [id, user.token]);

  const handleUpdateEvent = async (e) => {
    e.preventDefault();

    const updatedEvent = {
      title,
      description,
      date,
      time,
      location,
      price,
      venue,
      tag,
      totalTickets,
    };

    // Handle image uploads (if new images are selected)
    let eventImageUrl = eventImage;
    if (eventImage instanceof File) {
      const formData = new FormData();
      formData.append("file", eventImage);
      formData.append("upload_preset", "EventSystem1");

      const response = await fetch(
        "https://api.cloudinary.com/v1_1/do4wkv0zn/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();
      eventImageUrl = data.secure_url;
    }

    let extraImageUrls = extraImages;
    if (extraImages.length > 0 && extraImages[0] instanceof File) {
      const uploadedImages = await Promise.all(
        extraImages.map(async (image) => {
          const formData = new FormData();
          formData.append("file", image);
          formData.append("upload_preset", "EventSystem1");

          const response = await fetch(
            "https://api.cloudinary.com/v1_1/do4wkv0zn/image/upload",
            {
              method: "POST",
              body: formData,
            }
          );
          const data = await response.json();
          return data.secure_url;
        })
      );
      extraImageUrls = uploadedImages;
    }

    updatedEvent.eventImage = eventImageUrl;
    updatedEvent.extraImages = extraImageUrls;

    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/admin/event/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(updatedEvent),
      }
    );

    const json = await response.json();
    if (response.ok) {
      console.log("Event updated successfully:", json);
      navigate("/home"); // Redirect back to the home page or event list
    } else {
      setError(json.error || "Failed to update event.");
    }
  };

  return (
    <div
      className={`${isDarkMode ? "bg-dark text-light" : ""}`}
      style={{ width: "50%", margin: "50px auto", textAlign: "left" }}
    >
      <div
        className="edit-event"
        style={{ width: "100%", margin: "0 auto", textAlign: "left" }}
      >
        <form
          className="needs-validation"
          onSubmit={handleUpdateEvent}
          noValidate
          style={{
                    backgroundColor: isDarkMode ? "#333" : "#f0f0f0", // Dark mode background
                    color: isDarkMode ? "#fff" : "#000", // Light grey background
                    padding: "20px", // Add padding for spacing
                    borderRadius: isDarkMode ? "8px" : "8px", // Rounded corners
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Subtle shadow for better appearance
                }}
        >
          <h3 style={{ textAlign: "center" }}>Edit Event</h3>

          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Event Title:
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              placeholder="Enter event title"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={{
  background: "var(--main-bg)",
  color: "var(--text-main)",
  border: "1px solid var(--surface-border)",
  borderRadius: "8px",
}}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description:
            </label>
            <textarea
              className="form-control"
              id="description"
              placeholder="Enter event description"
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={{
  background: "var(--main-bg)",
  color: "var(--text-main)",
  border: "1px solid var(--surface-border)",
  borderRadius: "8px",
}}
            ></textarea>
          </div>

          <div className="mb-3">
            <label htmlFor="date" className="form-label">
              Date:
            </label>
            <input
              type="date"
              className="form-control"
              id="date"
              required
              value={date}
              onChange={(e) => setDate(e.target.value)}
              style={{
  background: "var(--main-bg)",
  color: "var(--text-main)",
  border: "1px solid var(--surface-border)",
  borderRadius: "8px",
}}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="time" className="form-label">
              Time:
            </label>
            <input
              type="time"
              className="form-control"
              id="time"
              required
              value={time}
              onChange={(e) => setTime(e.target.value)}
              style={{
  background: "var(--main-bg)",
  color: "var(--text-main)",
  border: "1px solid var(--surface-border)",
  borderRadius: "8px",
}}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="location" className="form-label">
              Location:
            </label>
            <input
              type="text"
              className="form-control"
              id="location"
              placeholder="Enter location"
              required
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              style={{
  background: "var(--main-bg)",
  color: "var(--text-main)",
  border: "1px solid var(--surface-border)",
  borderRadius: "8px",
}}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="price" className="form-label">
              Price:
            </label>
            <input
              type="number"
              className="form-control"
              id="price"
              placeholder="Enter price"
              required
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              style={{
  background: "var(--main-bg)",
  color: "var(--text-main)",
  border: "1px solid var(--surface-border)",
  borderRadius: "8px",
}}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="venue" className="form-label">
              Venue:
            </label>
            <input
              type="text"
              className="form-control"
              id="venue"
              placeholder="Enter venue"
              required
              value={venue}
              onChange={(e) => setVenue(e.target.value)}
              style={{
  background: "var(--main-bg)",
  color: "var(--text-main)",
  border: "1px solid var(--surface-border)",
  borderRadius: "8px",
}}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="tag" className="form-label">
              Tag:
            </label>
            <input
              type="text"
              className="form-control"
              id="tag"
              placeholder="Enter tag"
              required
              value={tag}
              onChange={(e) => setTag(e.target.value)}
              style={{
  background: "var(--main-bg)",
  color: "var(--text-main)",
  border: "1px solid var(--surface-border)",
  borderRadius: "8px",
}}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="totalTickets" className="form-label">
              Total Tickets:
            </label>
            <input
              type="number"
              className="form-control"
              id="totalTickets"
              placeholder="Enter total tickets"
              required
              value={totalTickets}
              onChange={(e) => setTotalTickets(e.target.value)}
              style={{
  background: "var(--main-bg)",
  color: "var(--text-main)",
  border: "1px solid var(--surface-border)",
  borderRadius: "8px",
}}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="eventImage" className="form-label">
              Event Image:
            </label>
            <input
              type="file"
              className="form-control"
              id="eventImage"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                setEventImage(file);
              }}
              style={{
  background: "var(--main-bg)",
  color: "var(--text-main)",
  border: "1px solid var(--surface-border)",
  borderRadius: "8px",
}}
            />
            {/* Preview existing or uploaded event image */}
            {eventImage && (
              <img
                src={
                  eventImage instanceof File
                    ? URL.createObjectURL(eventImage)
                    : eventImage
                }
                alt="Event Preview"
                style={{ width: "100px", height: "100px", marginTop: "10px" }}
              />
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="extraImages" className="form-label">
              Extra Images:
            </label>
            <input
              type="file"
              className="form-control"
              id="extraImages"
              accept="image/*"
              multiple
              onChange={(e) => {
                const files = Array.from(e.target.files);
                setExtraImages((prevImages) => [...prevImages, ...files]);
              }}
              style={{
  background: "var(--main-bg)",
  color: "var(--text-main)",
  border: "1px solid var(--surface-border)",
  borderRadius: "8px",
}}
            />
            {/* Preview existing and uploaded extra images */}
            <div
              style={{
                display: "flex",
                gap: "10px",
                marginTop: "10px",
                flexWrap: "wrap",
              }}
            >
              {extraImages.map((image, index) => (
                <img
                  key={index}
                  src={
                    image instanceof File ? URL.createObjectURL(image) : image
                  }
                  alt={`Extra ${index + 1}`}
                  style={{ width: "100px", height: "100px" }}
                />
              ))}
            </div>
          </div>
          <button
            type="submit"
            className={isDarkMode? "btn btn-outline-primary": "btn btn-primary"}
            style={{margin: "10px auto", display: "block", width: "100%", marginBottom: "20px"}}
          >
            Update Event
          </button>
          {error && <div className="error mt-3">{error}</div>}
        </form>
      </div>
    </div>
  );
};

export default EditEvent;
