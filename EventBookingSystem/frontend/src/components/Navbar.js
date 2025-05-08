import { Link } from "react-router-dom"
import { useLogout } from "../hooks/useLogout"
import { useAuthContext } from "../hooks/useAuthContext"

const Navbar = () => {
    const { logout } = useLogout()
    const { user } = useAuthContext()

    const handleLogout = () => {
        logout()

    }
    return (
        <header>
            <div className="container">
                <Link to="/">
                <h1>Home</h1>
                </Link>

                <nav>
                    {user && (<div>
                        {user && <span>Welcome, {user.name}</span>}
                        <button onClick={handleLogout}>Log Out</button>
                    </div>
                    )}
                    {!user &&(<div>
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                    </div>
                    )}
                </nav>

            </div>
        </header>
    )






}
export default Navbar
