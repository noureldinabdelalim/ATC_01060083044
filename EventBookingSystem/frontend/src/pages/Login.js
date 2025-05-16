import { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import { useDarkMode } from "../context/DarkModeContext"; // Import the dark mode context

const URL = process.env.REACT_APP_BACKEND_URL;

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login, isLoading, error } = useLogin();
    const { isDarkMode } = useDarkMode(); // Access dark mode state

    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(email, password);
    };

    return (
        <div
            className={`login-container ${isDarkMode ? "bg-dark text-light" : ""}`}
            style={{
                width: "50%",
                margin: "50px auto",
                textAlign: "left",
            }}
        >
            <form
                className="login"
                onSubmit={handleSubmit}
                style={{
                    backgroundColor: isDarkMode ? "#333" : "#f0f0f0", // Dark mode background
                    color: isDarkMode ? "#fff" : "#000", // Dark mode text color
                    padding: "20px", // Add padding for spacing
                    borderRadius: isDarkMode ? "8px" : "8px", // Rounded corners
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", 
                    // border: isDarkMode ? "5px solid #555" : "none",
                }}
            >
                <div className="mb-3 mt-3">
                    <h3 style={{ textAlign: "center" }}>Log in</h3>
                    <label className="form-label">Email:</label>
                    <input
                        type="email"
                        className="form-control"
                        placeholder="Enter your email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        style={{
  background: "var(--main-bg)",
  color: "var(--text-main)",
  border: "1px solid var(--surface-border)",
  borderRadius: "8px",
}}
                    />
                    <label className="form-label">Password:</label>
                    <input
                        type="password"
                        className="form-control"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        style={{
  background: "var(--main-bg)",
  color: "var(--text-main)",
  border: "1px solid var(--surface-border)",
  borderRadius: "8px",
}}
                    />
                    <button
                        type="submit"
                        disabled={isLoading}
                        className= {isDarkMode ? "btn btn-dark": "btn btn-primary"}
                        style={{
                            margin: "10px auto",
                            display: "block",
                            width: "90%",

                        }}
                    >
                        Log in
                    </button>
                    {error && <div className="error">{error}</div>}
                    {isLoading && <div className="loading">Loading...</div>}
                </div>
                <div className="mb-3 mt-3">
                    <p>
                        Don't have an account? <a href="/register">Sign up</a>
                    </p>
                </div>
            </form>
        </div>
    );
};

export default Login;