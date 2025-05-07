const EventDetails = ({ event }) => {
return (
    <div className="event-details">
        <h2>{event.title}</h2>
        <p><strong>Description: </strong>{event.description}</p>
        <p><strong>Date: </strong>{new Date(event.date).toLocaleDateString()}</p>
        <p><strong>Time: </strong> {event.time}</p>
        <p><strong>Location: </strong> {event.location}</p>
        {event.eventImage && <img src={event.eventImage} alt={event.title} />}
    </div>
)

}
export default EventDetails