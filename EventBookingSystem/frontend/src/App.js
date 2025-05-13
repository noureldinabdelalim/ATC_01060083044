import logo from "./logoTheBooker.png";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";
import Home from "./pages/Home";
import Login from "./pages/Login";
import CreateEvent from "./pages/CreateEvent";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import EditEvent from "./pages/EditEvent";
import BookingConfirmation from "./pages/BookingCofirmation";
import MyBookings from "./pages/MyBookings";
import MyProfile from "./pages/MyProflie";
import AddAdmin from "./pages/AddAdmin";
import Otp from "./pages/Otp";
function App() {
  const {user} = useAuthContext()
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Welcome to TheBooker</p>
        </header> */}
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
            <Route path="/register" element={!user ? <Register /> : <Navigate to="/" />} />

            {/* Protected Routes */}
            {user && user.role === "admin" && (
              <>
                {/* Admin Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/create-event" element={<CreateEvent />} />
                <Route path="/add-admin" element={<AddAdmin />} />
                <Route path="/edit-event/:id" element={<EditEvent />} />

                {/* Add more admin-specific routes here */}
              </>
            )}

            {user && user.role === "user" && (
              <>
                {/* User Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/my-bookings" element={<MyBookings />} />
                <Route path="/booking-confirmation" element={<BookingConfirmation />} />
                <Route path="/my-profile" element={<MyProfile />} />
                {/* <Route path="/user" element={<UserDashboard />} /> */}
                {/* Add more user-specific routes here */}
              </>
            )}

            {/* Redirect to login if no matching route */}
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
