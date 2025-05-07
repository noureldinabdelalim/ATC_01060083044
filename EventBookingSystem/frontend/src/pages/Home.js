import { useEffect, useState } from "react";
import EventDetails from "../components/EventDetails"
import EventForm from "../components/EventForm"
const URL = process.env.REACT_APP_BACKEND_URL;
const Home = () => {
    
    const [events, setEvents] = useState([])
    const fetchEvents = async () => {
        console.log("Fetching from:", `${URL}/admin/events`);

        const response = await fetch(`${URL}/admin/events`)
        const json = await response.json()

        if (response.ok) {
            setEvents(json)
            console.log(json)
        } else {
            console.log("Error fetching events")
        }

    }
useEffect(() => {

    fetchEvents()

},[])

    return (
        <div className="Home">
            <h1>Welcome to the Home Page</h1>
            <div className="events">
            {events && events.map((event) => (
                <EventDetails key={event._id} event={event} fetchEvents={fetchEvents}/>
            ))}
            </div>
            <EventForm fetchEvents={fetchEvents}/>

        </div>
    );
}

export default Home