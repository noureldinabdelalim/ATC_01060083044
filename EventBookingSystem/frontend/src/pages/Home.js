import { useEffect, useState } from "react";
import EventDetails from "../components/EventDetails"
import EventForm from "../components/EventForm"
import { useAuthContext } from "../hooks/useAuthContext";
const URL = process.env.REACT_APP_BACKEND_URL;
const Home = () => {
    const {user} = useAuthContext()

    
    const [events, setEvents] = useState([])
    const [currentPage, setCurrentPage] = useState(1); // Current page
    const eventsPerPage = 5;

    const [priceRange, setPriceRange] = useState([0, 100000]); // Default price range
    const [selectedDate, setSelectedDate] = useState(""); // Date filter
    const [ticketsRange, setTicketsRange] = useState([0, 100000]);

    const indexOfLastEvent = currentPage * eventsPerPage;
    const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;

const filteredEvents = events.filter((event) => {
        const withinPriceRange =
            event.price >= priceRange[0] && event.price <= priceRange[1];
        const matchesDate = selectedDate ? event.date === selectedDate : true;
        const withinTicketsRange =
            event.availableTickets >= ticketsRange[0] &&
            event.availableTickets <= ticketsRange[1];

        return withinPriceRange && matchesDate && withinTicketsRange;
    });

    const currentEvents = filteredEvents.slice(indexOfFirstEvent, indexOfLastEvent);
    const paginate = (pageNumber) => setCurrentPage(pageNumber)
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
useEffect(() => {

    if(user){

        fetchEvents()
    }

},[user])

    return (
        <div className="Home d-flex" style={{ display: "flex" }}>
             <div
                className="filter-section p-3"
                style={{
                    width: "25%",
                    borderRight: "1px solid #ccc",
                    height: "100vh", // Make it full height
                    overflowY: "auto", // Add scroll if content overflows
                }}
            >
                <h4>Filters</h4>
                {/* Price Range Filter */}
                <div className="mb-3">
                    <label>Price Range:</label>
                    <br />
                    <input
                        type="range"
                        min="0"
                        max="10000"
                        value={priceRange[0]}
                        onChange={(e) => setPriceRange([+e.target.value, priceRange[1]])}
                    />
                    <input
                        type="range"
                        min="0"
                        max="10000"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], +e.target.value])}
                    />
                    <p>
                        {priceRange[0]} - {priceRange[1]} EGP
                    </p>
                </div>

                {/* Date Filter */}
                <div className="mb-3">
                    <label>Date:</label>
                    <input
                        type="date"
                        className="form-control"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                    />
                </div>

                {/* Tickets Range Filter */}
                <div className="mb-3">
                    <label>Available Tickets:</label>
                    <br />
                    <input
                        type="range"
                        min="0"
                        max="100000"
                        value={ticketsRange[0]}
                        onChange={(e) => setTicketsRange([+e.target.value, ticketsRange[1]])}
                    />
                    <input
                        type="range"
                        min="0"
                        max="100000"
                        value={ticketsRange[1]}
                        onChange={(e) => setTicketsRange([ticketsRange[0], +e.target.value])}
                    />
                    <p>
                        {ticketsRange[0]} - {ticketsRange[1]} Tickets
                    </p>
                </div>
            </div>

            {/* Events Section */}
            <div className="events-section p-3" style={{ width: "75%" }}>
                <h1>Events</h1>
                <div className="events">
                    {currentEvents &&
                        currentEvents.map((event) => (
                            <EventDetails key={event._id} event={event} fetchEvents={fetchEvents} />
                        ))}
                </div>

                {/* Pagination */}
                <nav>
                    <ul className="pagination justify-content-center">
                        {Array.from({ length: Math.ceil(filteredEvents.length / eventsPerPage) }, (_, index) => (
                            <li
                                key={index + 1}
                                className={`page-item ${currentPage === index + 1 ? "active" : ""}`}
                            >
                                <button
                                    className="page-link"
                                    onClick={() => paginate(index + 1)}
                                >
                                    {index + 1}
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </div>
    );
};

export default Home;