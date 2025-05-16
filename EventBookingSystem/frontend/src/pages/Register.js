import {useState} from 'react'
import { useRegister } from '../hooks/useRegister';
import { useDarkMode } from "../context/DarkModeContext"; // Import the dark mode context


const URL = process.env.REACT_APP_BACKEND_URL;

const Register = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [dob, setDob] = useState('');
    const [address, setAddress] = useState('');
    const [nationalId, setNationalId] = useState('');
    const {register, isLoading, error} = useRegister()
    const { isDarkMode } = useDarkMode(); // Access dark mode state


    

    const handleSubmit = async (e) => {
        e.preventDefault();
        await register(email, password, name, phone, dob, address, nationalId)

        
        }
       
    
    return(
                <div className={`${isDarkMode ? "bg-dark text-light" : ""}`}style={{ width: "50%", margin: "50px auto", textAlign: "left" }}>

        <form className="register" onSubmit={handleSubmit}
        style={{
                    backgroundColor: isDarkMode ? "#333" : "#f0f0f0", // Dark mode background
                    color: isDarkMode ? "#fff" : "#000", // Light grey background
                    padding: "20px", // Add padding for spacing
                    borderRadius: isDarkMode ? "8px" : "8px", // Rounded corners
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Subtle shadow for better appearance
                }}>
            <div class="mb-3 mt-3">
            <h3 style={{ textAlign: "center" }}>Register</h3>
            <label class="form-label">Name:</label>
            <input
                type="text"
                placeholder='Enter your name'
                required
                class="form-control"
                onChange={(e) => setName(e.target.value)}
                value={name}  
                style={{
  background: "var(--main-bg)",
  color: "var(--text-main)",
  border: "1px solid var(--surface-border)",
  borderRadius: "8px",
}}
                />
            <label class="form-label">Email:</label>
            <input
                type="email"
                placeholder='Enter your email'
                required
                class="form-control"
                onChange={(e) => setEmail(e.target.value)}
                value={email}  
                style={{
  background: "var(--main-bg)",
  color: "var(--text-main)",
  border: "1px solid var(--surface-border)",
  borderRadius: "8px",
}}
                />
            <label class="form-label">Password:</label>
            <input
                type="password"
                required
                class="form-control"
                onChange={(e) => setPassword(e.target.value)}
                value={password}  
                style={{
  background: "var(--main-bg)",
  color: "var(--text-main)",
  border: "1px solid var(--surface-border)",
  borderRadius: "8px",
}}
                />
            
            <label class="form-label">Phone:</label>
            <input
                type="text"
                placeholder='Enter your phone number'
                required
                class="form-control"
                onChange={(e) => setPhone(e.target.value)}
                value={phone}  
                style={{
  background: "var(--main-bg)",
  color: "var(--text-main)",
  border: "1px solid var(--surface-border)",
  borderRadius: "8px",
}}
                />
            <label class="form-label">Date of Birth:</label>
            <input
                type="date"
                class="form-control"
                required
                onChange={(e) => setDob(e.target.value)}
                value={dob}  
                style={{
  background: "var(--main-bg)",
  color: "var(--text-main)",
  border: "1px solid var(--surface-border)",
  borderRadius: "8px",
}}
                />
            <label class="form-label">Address:</label>
            <input
                type="text"
                class="form-control"
                placeholder='Enter your address'
                required
                onChange={(e) => setAddress(e.target.value)}
                value={address}  
                style={{
  background: "var(--main-bg)",
  color: "var(--text-main)",
  border: "1px solid var(--surface-border)",
  borderRadius: "8px",
}}
                />
            <label class="form-label">National ID:</label>
            <input
                type="text"
                class="form-control"
                placeholder='Enter your national ID'
                required
                onChange={(e) => setNationalId(e.target.value)}
                value={nationalId}  
                style={{
  background: "var(--main-bg)",
  color: "var(--text-main)",
  border: "1px solid var(--surface-border)",
  borderRadius: "8px",
}}
                />
            
            <button disabled = {isLoading} type="submit" class="btn btn-primary" style={{margin: "10px auto", display: "block", width: "100%"}}>Register</button>
            {error && <div className="error">{error}</div>}
            {isLoading && <div className="loading">Loading...</div>}

            </div>
            <div className="mb-3 mt-3">
                <p>Already have an account? <a href="/login">Log in</a></p>
            </div>
        </form>
        </div>

    )
    }





export default Register