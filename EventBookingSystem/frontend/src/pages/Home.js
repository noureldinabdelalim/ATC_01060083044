import { useEffect, useState } from "react";
import EventDetails from "../components/EventDetails"
const URL = process.env.REACT_APP_BACKEND_URL;
const Home = () => {
    const [events, setEvents] = useState([])
useEffect(() => {
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
    fetchEvents()

},[])

    return (
        <div className="Home">
            <h1>Welcome to the Home Page</h1>
            <div className="events">
            {events && events.map((event) => (
                <EventDetails key={event._id} event={event}/>
            ))}
            </div>

        </div>
    );
}

export default Home