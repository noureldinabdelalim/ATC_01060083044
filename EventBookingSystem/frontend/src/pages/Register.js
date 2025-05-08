import {useState} from 'react'
import { useRegister } from '../hooks/useRegister';

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

    

    const handleSubmit = async (e) => {
        e.preventDefault();
        await register(email, password, name, phone, dob, address, nationalId)

        
        }
       
    
    return(
        <form className="register" onSubmit={handleSubmit}>
            <h3>Register</h3>
            <label>Email:</label>
            <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}  
                />
            <label>Password:</label>
            <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}  
                />
            <label>Name:</label>
            <input
                type="text"
                onChange={(e) => setName(e.target.value)}
                value={name}  
                />
            <label>Phone:</label>
            <input
                type="text"
                onChange={(e) => setPhone(e.target.value)}
                value={phone}  
                />
            <label>Date of Birth:</label>
            <input
                type="date"
                onChange={(e) => setDob(e.target.value)}
                value={dob}  
                />
            <label>Address:</label>
            <input
                type="text"
                onChange={(e) => setAddress(e.target.value)}
                value={address}  
                />
            <label>National ID:</label>
            <input
                type="text"
                onChange={(e) => setNationalId(e.target.value)}
                value={nationalId}  
                />
            
            <button disabled = {isLoading} type="submit">Register</button>
            {error && <div className="error">{error}</div>}
            {isLoading && <div className="loading">Loading...</div>}
        </form>

    )
    }





export default Register