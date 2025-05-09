import { Link, useLocation } from "react-router-dom"
import { useLogout } from "../hooks/useLogout"
import { useAuthContext } from "../hooks/useAuthContext"
import { useDarkMode } from "../context/DarkModeContext";

const Navbar = () => {
    const { logout } = useLogout()
    const { user } = useAuthContext()
    const location = useLocation()
    const { isDarkMode } = useDarkMode(); // Access dark mode state


    const handleLogout = () => {
        logout()

    }
    return (
        <header>
            <div className="container">
                <Link to="/">
                <h1>Event System</h1>
                </Link>

                <nav class={`navbar navbar-expand-sm ${isDarkMode ? "bg-dark" : "bg-primary"} navbar-dark`}>
                    <div class="container-fluid">
                        <ul class="navbar-nav ms-auto">
                    {user && (<div>
                        {user && <span>Welcome, {user.name}</span>}
                         <li class="nav-item">

                            <a class="nav-link" href="/login" onClick={handleLogout}>Log Out</a>

                         </li>
                    </div>
                    )}
                    {!user &&(<div class="d-flex flex-row">
                        {location.pathname !== "/login" && (
                        <li class="nav-item">
                            <a class="nav-link" href="/login">Login</a>
                        </li>
                        )}
                        {location.pathname !== "/register" && (
                        <li class="nav-item">
                            <a class="nav-link" href="/register">Register</a>
                        </li>
                        )}
                        {/* <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link> */}
                        {/* <Link to="/forgotPassword">Forgot Password</Link> */}
                    </div>
                    )}
                    </ul>
                    </div>
                </nav>

            </div>
        </header>
    )






}
export default Navbar
