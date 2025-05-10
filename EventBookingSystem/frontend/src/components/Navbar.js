import { Link, useLocation } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import { useDarkMode } from "../context/DarkModeContext";

const Navbar = () => {
    const { logout } = useLogout();
    const { user } = useAuthContext();
    const location = useLocation();
    const { isDarkMode } = useDarkMode(); // Access dark mode state

    const handleLogout = () => {
        logout();
    };

    return (
        <header>
            {/* <div className="container"> */}
                {/* <Link to="/">
                    <h1>Event System</h1>
                </Link> */}

                <nav className={`navbar navbar-expand-sm ${isDarkMode ? "bg-dark" : "bg-primary"} navbar-dark`} style={{ width: "95%", margin: "0 auto" }}>
                    <div className="container-fluid">
                        <ul className="navbar-nav ms-auto d-flex flex-row align-items-center">
                            {user && (
                                <>
                                    <span className="navbar-text me-3">Welcome, {user.name}</span>
                                    {/* Admin Section */}
                                    {user.role === "admin" && (
                                        <>
                                            <li className="nav-item">
                                                <Link className="nav-link" to="/admin-dashboard">
                                                    Admin Dashboard
                                                </Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link className="nav-link" to="/create-event">
                                                    Create Event
                                                </Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link className="nav-link" to="/manage-users">
                                                    Manage Users
                                                </Link>
                                            </li>
                                        </>
                                    )}

                                    {/* User Section */}
                                    {user.role === "user" && (
                                        <>
                                            <li className="nav-item">
                                                <Link className="nav-link" to="/user-dashboard">
                                                    User Dashboard
                                                </Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link className="nav-link" to="/my-bookings">
                                                    My Bookings
                                                </Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link className="nav-link" to="/events">
                                                    Browse Events
                                                </Link>
                                            </li>
                                        </>
                                    )}

                                    {/* Logout */}
                                    <li className="nav-item">
                                        <a className="nav-link" href="/login" onClick={handleLogout}>
                                            Log Out
                                        </a>
                                    </li>
                                </>
                            )}

                            {!user && (
                                <div className="d-flex flex-row">
                                    {location.pathname !== "/login" && (
                                        <li className="nav-item">
                                            <a className="nav-link" href="/login">
                                                Login
                                            </a>
                                        </li>
                                    )}
                                    {location.pathname !== "/register" && (
                                        <li className="nav-item">
                                            <a className="nav-link" href="/register">
                                                Register
                                            </a>
                                        </li>
                                    )}
                                </div>
                            )}
                        </ul>
                    </div>
                </nav>
            {/* </div> */}
        </header>
    );
};

export default Navbar;