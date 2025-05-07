import { useState } from "react"
import { useEventsContext } from '../hooks/useEventsContext'

const EventForm = ({ fetchEvents}) => {
    const [title, setTitle] = useState("")
    const [date, setDate] = useState("")
    const [location, setLocation] = useState("")
    const [description, setDescription] = useState("")
    const [eventImage, setEventImage] = useState(null)
    const [tag, setTag] = useState("")
    const [availableTickets, setAvailableTickets] = useState(0)
    const [time, setTime] = useState("")
    const [error, setError] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()

        let imageUrl = "";

        if (eventImage) {
            const imageData = new FormData();
            imageData.append("file", eventImage);
            imageData.append("upload_preset", "EventSystem1"); 
    
            const cloudRes = await fetch("https://api.cloudinary.com/v1_1/do4wkv0zn/image/upload", {
                method: "POST",
                body: imageData
            });
    
            const cloudJson = await cloudRes.json();
            imageUrl = cloudJson.secure_url; 
        }
        const event = { title, date, location, description, eventImage: imageUrl, tag, availableTickets, time }
        console.log(event)
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/admin/event`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(event),
        })
        const json = await response.json()
        if (response.ok) {
            console.log("Event created:", json)
            setTitle("")
            setDate("")
            setLocation("")
            setDescription("")
            setEventImage(null)
            setTag("")
            setAvailableTickets(0)
            setTime("")
            fetchEvents()

        } else {
            console.log("Error creating event:", json)
            setError(json.mssg)
        }
    }

    return (
        <form className="create" onSubmit={handleSubmit}>
            <h2>Create a new event</h2>
            <label>Event Title:</label>
            <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <label>Date:</label>
            <input
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
            />
            <label>Time:</label>
            <input 
                type="time"
                required
                value={time}
                onChange={(e) => setTime(e.target.value)}
            />
            <label>Location:</label>
            <input
                type="text"
                required
                value={location}
                onChange={(e) => setLocation(e.target.value)}
            />
            <label>Description:</label>
            <textarea
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            <label>Tag:</label>
            <input
                type="text"
                value={tag}
                onChange={(e) => setTag(e.target.value)}
            />
            <label>Available Tickets:</label>
            <input
                type="number"
                required
                value={availableTickets}
                onChange={(e) => setAvailableTickets(e.target.value)}
            />
            <label>Event Image:</label>
            <input
                type="file"
                accept="image/*"
                onChange={(e) => setEventImage(e.target.files[0])}
            />
            <button className="btn">Create Event</button>
            {error && <div className="error">{error}</div>}
        </form>
        
    )
}
export default EventForm