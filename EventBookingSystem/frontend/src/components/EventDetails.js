const EventDetails = ({ event , fetchEvents }) => {

const handleClick = async () => {
    const URL = process.env.REACT_APP_BACKEND_URL;
    const response = await fetch(`${URL}/admin/event/${event._id}`, {
        method: 'DELETE',
    })
    const json = await response.json()
    if (response.ok) {
        console.log(json)
        fetchEvents()
    } else {
        console.log("Error deleting event")
    }
}
return (
    <div className="event-details">
        <h2>{event.title}</h2>
        <p><strong>Description: </strong>{event.description}</p>
        <p><strong>Date: </strong>{new Date(event.date).toLocaleDateString()}</p>
        <p><strong>Time: </strong> {event.time}</p>
        <p><strong>Location: </strong> {event.location}</p>
        <p><strong>Available Tickets: </strong> {event.availableTickets}</p>
        {event.eventImage && <img src={event.eventImage} alt={event.title} />}
        <span onClick={handleClick}>Delete</span>
    </div>
)

}
export default EventDetails