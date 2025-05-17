import { Link, useLocation } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import { useDarkMode } from "../context/DarkModeContext";
import logo from "../logoTheBooker.png";

const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const location = useLocation();
  const { isDarkMode } = useDarkMode(); 


  const handleLogout = () => {
    logout();
  };

  return (
    <header>



      <nav
        className={`navbar navbar-expand-sm ${
          isDarkMode ? "bg-dark" : "bg-primary"
        } navbar-dark`}
        style={{ width: "100%", margin: "0 auto" }}
      >
        <div className="container-fluid">
          <Link to="/home" className="navbar-brand d-flex align-items-center">
          
            <img
              src={logo}
              alt="The Booker Logo"
              style={{ height: "60px", marginRight: "10px" }} 
            />
            <span style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
              The Booker
            </span>{" "}
          </Link>
          <ul className="navbar-nav ms-auto d-flex flex-row align-items-center">
            {user && (
              <>
                <span className="navbar-text me-3">Welcome, {user.name}</span>
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
                      <Link className="nav-link" to="/add-admin">
                        Add Admin
                      </Link>
                    </li>
                  </>
                )}

                {user.role === "user" && (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link" to="/user-dashboard">
                        Browse Events
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/my-bookings">
                        My Bookings
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/my-profile">
                        My Profile
                      </Link>
                    </li>
                  </>
                )}

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
    </header>
  );
};

export default Navbar;
