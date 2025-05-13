import {useState} from 'react'
import { useDarkMode } from "../context/DarkModeContext"; // Import the dark mode context
import { useAuthContext } from '../hooks/useAuthContext'

const URL = process.env.REACT_APP_BACKEND_URL;

const AddAdmin = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [dob, setDob] = useState('');
    const [address, setAddress] = useState('');
    const [nationalId, setNationalId] = useState('');
    const { isDarkMode } = useDarkMode(); // Access dark mode state
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [success, setSuccess] = useState(false); // State to track success message


    const {user} = useAuthContext()

    

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null)
        setIsLoading(true)



        const admin = {
            email,name,password,phone,dob,address,nationalId
        }
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/admin/addAdmin`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${user.token}`,
            },
            body: JSON.stringify(admin),
        });


        const json = await response.json()
        if (!response.ok) {
            setIsLoading(false)
            setError(json.error)
        
        }
        else{
            setIsLoading(false)
            setSuccess(true)
            setEmail('')
            setName('')
            setPassword('')
            setPhone('')
            setDob('')
            setAddress('')
            setNationalId('')

            setTimeout(() => {
                setSuccess(false);
            }, 5000);
        }
    }
       
    
    return(
                <div className={`${isDarkMode ? "bg-dark text-light" : ""}`}style={{ width: "50%", margin: "50px auto", textAlign: "left" }}>

        <form className="addAdmin" onSubmit={handleSubmit}
        style={{
                    backgroundColor: isDarkMode ? "#333" : "#f0f0f0", // Dark mode background
                    color: isDarkMode ? "#fff" : "#000", // Light grey background
                    padding: "20px", // Add padding for spacing
                    borderRadius: isDarkMode ? "8px" : "8px", // Rounded corners
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Subtle shadow for better appearance
                }}>
            <div class="mb-3 mt-3">
            <h3 style={{ textAlign: "center" }}>Add Admin</h3>

            {success && (
                        <div className="alert alert-success" role="alert">
                            Admin added successfully!
                        </div>
                    )}

                    {/* Error Message */}
                    {error && (
                        <div className="alert alert-danger" role="alert">
                            {error}
                        </div>
                    )}

            <label class="form-label">Name:</label>
            <input
                type="text"
                placeholder="Enter new admin's name"
                required
                class="form-control"
                onChange={(e) => setName(e.target.value)}
                value={name}  
                style={{
                            backgroundColor: isDarkMode ? "#555" : "#fff", // Input background for dark mode
                            color: isDarkMode ? "#fff" : "#000", // Input text color for dark mode
                        }}
                />
            <label class="form-label">Email:</label>
            <input
                type="email"
                placeholder="Enter new admin's email"
                required
                class="form-control"
                onChange={(e) => setEmail(e.target.value)}
                value={email}  
                style={{
                            backgroundColor: isDarkMode ? "#555" : "#fff", // Input background for dark mode
                            color: isDarkMode ? "#fff" : "#000", // Input text color for dark mode
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
                            backgroundColor: isDarkMode ? "#555" : "#fff", // Input background for dark mode
                            color: isDarkMode ? "#fff" : "#000", // Input text color for dark mode
                        }}
                />
            
            <label class="form-label">Phone:</label>
            <input
                type="text"
                placeholder='Enter phone number'
                required
                class="form-control"
                onChange={(e) => setPhone(e.target.value)}
                value={phone}  
                style={{
                            backgroundColor: isDarkMode ? "#555" : "#fff", // Input background for dark mode
                            color: isDarkMode ? "#fff" : "#000", // Input text color for dark mode
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
                            backgroundColor: isDarkMode ? "#555" : "#fff", // Input background for dark mode
                            color: isDarkMode ? "#fff" : "#000", // Input text color for dark mode
                        }}
                />
            <label class="form-label">Address:</label>
            <input
                type="text"
                class="form-control"
                placeholder='Enter address'
                required
                onChange={(e) => setAddress(e.target.value)}
                value={address}  
                style={{
                            backgroundColor: isDarkMode ? "#555" : "#fff", // Input background for dark mode
                            color: isDarkMode ? "#fff" : "#000", // Input text color for dark mode
                        }}
                />
            <label class="form-label">National ID:</label>
            <input
                type="text"
                class="form-control"
                placeholder='Enter national ID'
                required
                onChange={(e) => setNationalId(e.target.value)}
                value={nationalId}  
                style={{
                            backgroundColor: isDarkMode ? "#555" : "#fff", // Input background for dark mode
                            color: isDarkMode ? "#fff" : "#000", // Input text color for dark mode
                        }}
                />
            
            <button disabled = {isLoading} type="submit" class="btn btn-primary" style={{margin: "10px auto", display: "block", width: "100%"}}>Add Admin</button>
            {error && <div className="error">{error}</div>}
            {isLoading && <div className="loading">Loading...</div>}

            </div>
        </form>
        </div>

    )
    }





export default AddAdmin