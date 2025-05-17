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
import AppNavBar from "./components/AppNavBar";
import Otp from "./pages/Otp";
import LandingPage from "./pages/LandingPage";

function App() {
  const {user} = useAuthContext()
  return (
    <div className="App">

      <BrowserRouter>
        <AppNavBar />
        <div className="pages">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={!user ? <Login /> : <Navigate to="/home" />} />
            <Route path="/register" element={!user ? <Register /> : <Navigate to="/home" />} />

            {user && user.role === "admin" && (
              <>
                <Route path="/home" element={<Home />} />
                <Route path="/create-event" element={<CreateEvent />} />
                <Route path="/add-admin" element={<AddAdmin />} />
                <Route path="/edit-event/:id" element={<EditEvent />} />

              </>
            )}

            {user && user.role === "user" && (
              <>
                <Route path="/home" element={<Home />} />
                <Route path="/my-bookings" element={<MyBookings />} />
                <Route path="/booking-confirmation" element={<BookingConfirmation />} />
                <Route path="/my-profile" element={<MyProfile />} />
              </>
            )}

            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </div>
        <Footer />

      </BrowserRouter>
    </div>
  );
}

export default App;
