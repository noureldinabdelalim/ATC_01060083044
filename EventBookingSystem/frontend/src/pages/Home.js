import { useEffect, useState } from "react";
import EventDetails from "../components/EventDetails";
import EventForm from "../components/EventForm";
import { useAuthContext } from "../hooks/useAuthContext";
import { useDarkMode } from "../context/DarkModeContext";
import { Alert, Slide } from "@mui/material";

const URL = process.env.REACT_APP_BACKEND_URL;
const Home = () => {
  const { user } = useAuthContext();

  const [events, setEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 5;
  const [allEvents, setAllEvents] = useState([]);


  const [priceRange, setPriceRange] = useState([0, 100000]); 
  const [selectedDate, setSelectedDate] = useState(""); 
  const [ticketsRange, setTicketsRange] = useState([0, 100000]);
  const [selectedTag, setSelectedTag] = useState("All Tags");

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const { isDarkMode } = useDarkMode()

  const handleSuccessMessage = (message) => {
    setSuccessMessage(message);

    setTimeout(() => {
      setSuccessMessage("");
    }, 5000);
  };
  const [successDeleteMessage, setSuccessDeleteMessage] = useState("");

  const handleSuccessDeleteMessage = (message) => {
    setSuccessDeleteMessage(message);

    setTimeout(() => {
      setSuccessDeleteMessage("");
    }, 5000);
  };

  const tags = [
    "All Tags",
    "Sports",
    "Music",
    "Gaming",
    "Theatre",
    "Opera",
    "Festival",
    "Ceremony",
  ];
  const [sortBy, setSortBy] = useState("dateAdded"); 

  const sortEvents = (events, sortBy) => {
    const sorted = [...events];
    if (sortBy === "eventDate") {
      sorted.sort((a, b) => new Date(a.date) - new Date(b.date));
    } else if (sortBy === "price") {
      sorted.sort((a, b) => a.price - b.price);
    } else {
      sorted.sort((a, b) => (a._id < b._id ? 1 : -1));
    }
    return sorted;
  };

  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;

  const filteredEvents = events.filter((event) => {
    const withinPriceRange =
      event.price >= priceRange[0] && event.price <= priceRange[1];
    console.log("Selected Date:", selectedDate);
    console.log(
      "Event Date (formatted):",
      new Date(event.date).toISOString().split("T")[0]
    );
    const matchesDate = selectedDate
      ? new Date(event.date).toISOString().split("T")[0] === selectedDate
      : true;
    const withinTicketsRange =
      event.availableTickets >= ticketsRange[0] &&
      event.availableTickets <= ticketsRange[1];
    const matchesTag = selectedTag === "All Tags" || event.tag === selectedTag;

    return withinPriceRange && matchesDate && withinTicketsRange && matchesTag;
  });

  const currentEvents = filteredEvents.slice(
    indexOfFirstEvent,
    indexOfLastEvent
  );
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const fetchEvents = async () => {
    setLoading(true)
    console.log("Fetching from:", `${URL}/event`);

    const response = await fetch(`${URL}/event`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();

    if (response.ok) {
      setAllEvents(json);
      let sortedEvents = sortEvents(json, sortBy);
      setEvents(sortedEvents);
      console.log(json);
      setLoading(false)
    } else {
      console.log("Error fetching events");
    }
  };
  useEffect(() => {
    if (user) {
      fetchEvents();
    }
  }, [user]);

  const handleFilterChange = (callback) => {
    setLoading(true); 
    setTimeout(() => {
      callback(); 
      setLoading(false); 
    }, 500); 
  };

  return (
    <div>

      {successMessage && (
  <Slide direction="down" in={!!successMessage} mountOnEnter unmountOnExit>
    <Alert
      severity="success"
      variant="filled"
      sx={{
        position: "fixed",
        top: 100,
        right: 32,
        zIndex: 2000,
        width: { xs: "90%", sm: "35%", md: "28%" },
        textAlign: "center",
        fontSize: "1.1rem",
        fontWeight: 500,
      }}
    >
      {successMessage}
    </Alert>
  </Slide>
)}
{successDeleteMessage && (
  <Slide direction="down" in={!!successDeleteMessage} mountOnEnter unmountOnExit>
    <Alert
      severity="warning"
      variant="filled"
      sx={{
        position: "fixed",
        top: 100,
        right: 32,
        zIndex: 2000,
        width: { xs: "90%", sm: "35%", md: "28%" },
        textAlign: "center",
        fontSize: "1.1rem",
        fontWeight: 500,
      }}
    >
      {successDeleteMessage}
    </Alert>
  </Slide>
)}
      <div className="Home d-flex" style={{ display: "flex", height: "100%" }}>
        {loading && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.5)", 
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 1000,
            }}
          >
            <div
              className="spinner-border text-light"
              role="status"
              style={{ width: "3rem", height: "3rem" }}
            >
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}

        

        <div
          className="filter-section p-3"
          style={{
            width: "25%",
            borderRadius: "18px",
            borderRight: "2px solid #ccc",
            borderBottom: "2px solid #ccc",
            borderLeft: "2px solid #ccc",
            borderTop: "2px solid #ccc",
            height: "100%", 
            overflowY: "auto", 
            backgroundColor: (isDarkMode
      ? "var(--events-bg-dark)"
      : "#e6f0fa"),
            color: isDarkMode ? "#fff" : "#000",
            marginLeft: "20px",
          }}
        >
            <h4>Sort By</h4>
             <div className="mb-3">
    <select
      className="form-select"
      style={{
        backgroundColor: "#fff",
        color: "#000",
      }}
      value={sortBy}
      onChange={(e) => {
        setSortBy(e.target.value);
        setEvents(sortEvents(allEvents, e.target.value));
      }}
    >
      <option value="dateAdded">Date Added</option>
      <option value="eventDate">Event Date</option>
      <option value="price">Price</option>
    </select>
  </div>
          <h4>Filters</h4>
          <div className="mb-3">
            <label>Price Range:</label>
            <br />
            <input
              type="range"
              min="0"
              max="10000"
              value={priceRange[0]}
              onChange={(e) => setPriceRange([+e.target.value, priceRange[1]])}
              style={{
        backgroundColor: isDarkMode ? "#444" : "#fff",
        color: isDarkMode ? "#fff" : "#000",
      }}
            />
            <input
              type="range"
              min="0"
              max="10000"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([priceRange[0], +e.target.value])}
              style={{
        backgroundColor: isDarkMode ? "#444" : "#fff",
        color: isDarkMode ? "#fff" : "#000",
      }}
            />
            <p>
              {priceRange[0]} - {priceRange[1]} EGP
            </p>
          </div>

          <div className="mb-3">
            <label>Date:</label>
            <input
              type="date"
              className="form-control"
              value={selectedDate}
              onChange={(e) => {
                console.log("Selected Date Input Value:", e.target.value);
                setSelectedDate(e.target.value);

                handleFilterChange(() => setSelectedDate(e.target.value));
              }}
            />
          </div>

          <div className="mb-3">
            <label>Available Tickets:</label>
            <br />
            <input
              type="range"
              min="0"
              max="10000"
              value={ticketsRange[0]}
              onChange={(e) =>
                setTicketsRange([+e.target.value, ticketsRange[1]])
              }
            />
            <input
              type="range"
              min="0"
              max="10000"
              value={ticketsRange[1]}
              onChange={(e) =>
                setTicketsRange([ticketsRange[0], +e.target.value])
              }
            />
            <p>
              {ticketsRange[0]} - {ticketsRange[1]} Tickets
            </p>
          </div>

          <div className="mb-3">
            <label>Tags:</label>
            <br />
            <br />
            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
              {tags.map((tag) => (
                <button
                  key={tag}
                  className={`btn ${
                    selectedTag === tag ? "btn-primary" : "btn-outline-primary"
                  }`}
                  onClick={() => handleFilterChange(() => setSelectedTag(tag))}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
          <br /><br />
          

        </div>

        <div className="events-section p-3" style={{ width: "75%",
          backgroundColor: isDarkMode
      ? "var(--events-bg-dark)"
      : "var(--events-bg-light)",
        }}>
                <h1 className="events-title">Events</h1>

          <div className="events">
            {currentEvents &&
              currentEvents.map((event) => (
                <EventDetails
                  onSuccessDelete={handleSuccessDeleteMessage}
                  onSuccess={handleSuccessMessage}
                  key={event._id}
                  event={event}
                  fetchEvents={fetchEvents}
                />
              ))}
          </div>

        </div>
      </div>
          <nav>
            <ul className="pagination justify-content-center">
              {Array.from(
                { length: Math.ceil(filteredEvents.length / eventsPerPage) },
                (_, index) => (
                  <li
                    key={index + 1}
                    className={`page-item ${
                      currentPage === index + 1 ? "active" : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={() => paginate(index + 1)}
                    >
                      {index + 1}
                    </button>
                  </li>
                )
              )}
            </ul>
          </nav>
    </div>
  );
};

export default Home;
