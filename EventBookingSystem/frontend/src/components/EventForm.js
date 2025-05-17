import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useDarkMode } from "../context/DarkModeContext"; 
import {
  Container,
  Paper,
  Typography,
  TextField,
  Select,
  MenuItem,
  Button,
  Alert,
  InputLabel,
  FormControl,
  Box,
  CircularProgress,
  Chip,
} from "@mui/material";

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

    const tagOptions = [
  "Sports",
  "Music",
  "Gaming",
  "Theatre",
  "Opera",
  "Festival",
  "Ceremony",
];

    return (
    <Container maxWidth="md" sx={{ mt: 8, mb: 8 }}>
      <Paper
        elevation={4}
        sx={{
          p: 4,
          borderRadius: 4,
          background: "var(--surface-bg)",
          color: isDarkMode ? "#fff" : "var(--text-main)",
          position: "relative",
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
          Create A New Event
        </Typography>

        {isLoading && (
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              bgcolor: "rgba(0,0,0,0.3)",
              zIndex: 10,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 4,
            }}
          >
            <CircularProgress color="primary" />
          </Box>
        )}

        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            Event created successfully!
          </Alert>
        )}
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit} autoComplete="off">
          <TextField
            label="Event Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
            required
            margin="normal"
            error={emptyFields.includes("title")}
            sx={{ input: { color: isDarkMode ? "#fff" : "var(--text-main)" } ,
    label: { color: isDarkMode ? "#fff" : "var(--text-main)" }
  }}
  InputLabelProps={{
    style: { color: isDarkMode ? "#fff" : "var(--text-main)" }
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
            InputLabelProps={{ shrink: true }}
            error={emptyFields.includes("date")}
            sx={{ input: { color: isDarkMode ? "#fff" : "var(--text-main)" } ,
    label: { color: isDarkMode ? "#fff" : "var(--text-main)" }
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
            InputLabelProps={{ shrink: true }}
            error={emptyFields.includes("time")}
            sx={{ input: { color: isDarkMode ? "#fff" : "var(--text-main)" } ,
    label: { color: isDarkMode ? "#fff" : "var(--text-main)" }
  }}/>

          <TextField
            label="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            fullWidth
            required
            margin="normal"
            error={emptyFields.includes("location")}
            sx={{ input: { color: isDarkMode ? "#fff" : "var(--text-main)" } ,
    label: { color: isDarkMode ? "#fff" : "var(--text-main)" }
  }}
  InputLabelProps={{
    style: { color: isDarkMode ? "#fff" : "var(--text-main)" }
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
            error={emptyFields.includes("description")}
            sx={{ textarea: { color: isDarkMode ? "#fff" : "var(--text-main)" } ,
    label: { color: isDarkMode ? "#fff" : "var(--text-main)" }
  }}
  InputLabelProps={{
    style: { color: isDarkMode ? "#fff" : "var(--text-main)" }
  }}
/>

          <FormControl fullWidth required margin="normal">
            <InputLabel id="tag-label"
            sx={{ color: isDarkMode ? "#fff" : "var(--text-main)" }}>Tag</InputLabel>
            <Select
              labelId="tag-label"
              value={tag}
              label="Tag"
              onChange={(e) => setTag(e.target.value)}
              error={emptyFields.includes("tag")}
              sx={{
                color: isDarkMode ? "#fff" : "var(--text-main)",
                label: { color: isDarkMode ? "#fff" : "var(--text-main)" },


                ".MuiSelect-icon": { color: isDarkMode ? "#fff" : "var(--text-main)" },
              }}
            >
              <MenuItem value="">
                <em>Select a Tag</em>
              </MenuItem>
              {tagOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            label="Available Tickets"
            type="number"
            value={availableTickets}
            onChange={(e) => setAvailableTickets(e.target.value)}
            fullWidth
            required
            margin="normal"
            error={emptyFields.includes("availableTickets")}
            sx={{ input: { color: isDarkMode ? "#fff" : "var(--text-main)" } ,
    label: { color: isDarkMode ? "#fff" : "var(--text-main)" }
  }}
  InputLabelProps={{
    style: { color: isDarkMode ? "#fff" : "var(--text-main)" }
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
            error={emptyFields.includes("price")}
            sx={{ input: { color: isDarkMode ? "#fff" : "var(--text-main)" } ,
    label: { color: isDarkMode ? "#fff" : "var(--text-main)" }
  }}
  InputLabelProps={{
    style: { color: isDarkMode ? "#fff" : "var(--text-main)" }
  }}
/>

          <TextField
            label="Venue"
            value={venue}
            onChange={(e) => setVenue(e.target.value)}
            fullWidth
            required
            margin="normal"
            error={emptyFields.includes("venue")}
            sx={{ input: { color: isDarkMode ? "#fff" : "var(--text-main)" } ,
    label: { color: isDarkMode ? "#fff" : "var(--text-main)" }
  }}
  InputLabelProps={{
    style: { color: isDarkMode ? "#fff" : "var(--text-main)" }
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
                  src={URL.createObjectURL(eventImage)}
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
                <Chip
                  key={index}
                  label={`Extra ${index + 1}`}
                  onDelete={() =>
                    setExtraImages((prev) =>
                      prev.filter((_, i) => i !== index)
                    )
                  }
                  avatar={
                    <img
                      src={URL.createObjectURL(image)}
                      alt={`Extra ${index + 1}`}
                      style={{ width: 32, height: 32, borderRadius: "50%" }}
                    />
                  }
                  sx={{
                    background: isDarkMode ? "#222" : "#f0f0f0",
                    color: isDarkMode ? "#fff" : "#222",
                  }}
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
            Create Event
          </Button>

        </form>
      </Paper>
    </Container>
  );
};

export default EventForm;