import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Alert,
  Box,
} from "@mui/material";
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
  const [isLoading, setIsLoading] = useState(false);

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
    setIsLoading(true);

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
      setIsLoading(false);
      console.log("Event updated successfully:", json);
      navigate("/home");
    } else {
      setError(json.error || "Failed to update event.");
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 8, mb: 8 }}>
      <Paper
        elevation={4}
        sx={{
          p: 4,
          borderRadius: 4,
          background: "var(--surface-bg)",
          color: isDarkMode ? "#fff" : "var(--text-main)",
        }}
      >
        <Typography
          variant="h5"
          align="center"
          sx={{
            mb: 3,
            color: "var(--primary)",
            fontWeight: 800,
            letterSpacing: 1,
          }}
        >
          Edit Event
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleUpdateEvent} autoComplete="off">
          <TextField
            label="Event Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
            required
            margin="normal"
            sx={{
              input: { color: isDarkMode ? "#fff" : "var(--text-main)" },
              label: { color: isDarkMode ? "#fff" : "var(--text-main)" },
            }}
            InputLabelProps={{
              style: { color: isDarkMode ? "#fff" : "var(--text-main)" },
            }}
          />
          <TextField
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
            required
            margin="normal"
            multiline
            rows={3}
            sx={{
              textarea: { color: isDarkMode ? "#fff" : "var(--text-main)" },
              label: { color: isDarkMode ? "#fff" : "var(--text-main)" },
            }}
            InputLabelProps={{
              style: { color: isDarkMode ? "#fff" : "var(--text-main)" },
            }}
          />
          <TextField
            label="Date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            fullWidth
            required
            margin="normal"
            InputLabelProps={{
              shrink: true,
              style: { color: isDarkMode ? "#fff" : "var(--text-main)" },
            }}
            sx={{
              input: { color: isDarkMode ? "#fff" : "var(--text-main)" },
              label: { color: isDarkMode ? "#fff" : "var(--text-main)" },
            }}
          />
          <TextField
            label="Time"
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            fullWidth
            required
            margin="normal"
            InputLabelProps={{
              shrink: true,
              style: { color: isDarkMode ? "#fff" : "var(--text-main)" },
            }}
            sx={{
              input: { color: isDarkMode ? "#fff" : "var(--text-main)" },
              label: { color: isDarkMode ? "#fff" : "var(--text-main)" },
            }}
          />
          <TextField
            label="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            fullWidth
            required
            margin="normal"
            sx={{
              input: { color: isDarkMode ? "#fff" : "var(--text-main)" },
              label: { color: isDarkMode ? "#fff" : "var(--text-main)" },
            }}
            InputLabelProps={{
              style: { color: isDarkMode ? "#fff" : "var(--text-main)" },
            }}
          />
          <TextField
            label="Price"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            fullWidth
            required
            margin="normal"
            sx={{
              input: { color: isDarkMode ? "#fff" : "var(--text-main)" },
              label: { color: isDarkMode ? "#fff" : "var(--text-main)" },
            }}
            InputLabelProps={{
              style: { color: isDarkMode ? "#fff" : "var(--text-main)" },
            }}
          />
          <TextField
            label="Venue"
            value={venue}
            onChange={(e) => setVenue(e.target.value)}
            fullWidth
            required
            margin="normal"
            sx={{
              input: { color: isDarkMode ? "#fff" : "var(--text-main)" },
              label: { color: isDarkMode ? "#fff" : "var(--text-main)" },
            }}
            InputLabelProps={{
              style: { color: isDarkMode ? "#fff" : "var(--text-main)" },
            }}
          />
          <TextField
            label="Tag"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            fullWidth
            required
            margin="normal"
            sx={{
              input: { color: isDarkMode ? "#fff" : "var(--text-main)" },
              label: { color: isDarkMode ? "#fff" : "var(--text-main)" },
            }}
            InputLabelProps={{
              style: { color: isDarkMode ? "#fff" : "var(--text-main)" },
            }}
          />
          <TextField
            label="Total Tickets"
            type="number"
            value={totalTickets}
            onChange={(e) => setTotalTickets(e.target.value)}
            fullWidth
            required
            margin="normal"
            sx={{
              input: { color: isDarkMode ? "#fff" : "var(--text-main)" },
              label: { color: isDarkMode ? "#fff" : "var(--text-main)" },
            }}
            InputLabelProps={{
              style: { color: isDarkMode ? "#fff" : "var(--text-main)" },
            }}
          />

          <Box sx={{ mt: 2 }}>
            <Button
              variant="contained"
              component="label"
              fullWidth
              sx={{ mb: 1, borderRadius: 2, fontWeight: 600 }}
            >
              Upload Event Image
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={(e) => {
                  const file = e.target.files[0];
                  setEventImage(file);
                }}
              />
            </Button>
            {eventImage && (
              <Box sx={{ mt: 1, mb: 2, textAlign: "center" }}>
                <img
                  src={
                    eventImage instanceof File
                      ? URL.createObjectURL(eventImage)
                      : eventImage
                  }
                  alt="Event Preview"
                  style={{ width: "100px", height: "100px", borderRadius: 8 }}
                />
              </Box>
            )}
          </Box>

          <Box sx={{ mt: 2 }}>
            <Button
              variant="outlined"
              component="label"
              fullWidth
              sx={{ mb: 1, borderRadius: 2, fontWeight: 600 }}
            >
              Upload Extra Images
              <input
                type="file"
                accept="image/*"
                hidden
                multiple
                onChange={(e) => {
                  const files = Array.from(e.target.files);
                  setExtraImages((prevImages) => [...prevImages, ...files]);
                }}
              />
            </Button>
            <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mt: 1 }}>
              {extraImages.map((image, index) => (
                <img
                  key={index}
                  src={
                    image instanceof File ? URL.createObjectURL(image) : image
                  }
                  alt={`Extra ${index + 1}`}
                  style={{ width: "100px", height: "100px", borderRadius: 8 }}
                />
              ))}
            </Box>
          </Box>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={isLoading}
            sx={{ mt: 3, borderRadius: 2, fontWeight: 600 }}
          >
            Update Event
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default EditEvent;