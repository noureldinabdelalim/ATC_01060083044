import { useEffect, useState } from "react";
import EventDetails from "../components/EventDetails"
import EventForm from "../components/EventForm"
import { useAuthContext } from "../hooks/useAuthContext";
const URL = process.env.REACT_APP_BACKEND_URL;

const CreateEvent = () => {
    const {user} = useAuthContext()
    const [events, setEvents] = useState([])

const fetchEvents = async () => {
        console.log("Fetching from:", `${URL}/event`);

        const response = await fetch(`${URL}/event` , {
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
    })
        const json = await response.json()

        if (response.ok) {
            setEvents(json)
            console.log(json)
        } else {
            console.log("Error fetching events")
        }

    }



    return (
        <div className="NewEvent">

            <EventForm fetchEvents={fetchEvents}/>

        </div>
    );
}

export default CreateEvent