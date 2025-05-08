import {useState} from 'react'
import { useAuthContext } from './useAuthContext'

const URL = process.env.REACT_APP_BACKEND_URL;

export const useLogin = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useAuthContext()


    const login = async (email, password) => {
        setError(null);
        setIsLoading(true);
    
        try {
            const response = await fetch(`${URL}/guest/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });
    
            let json;
            try {
                json = await response.json(); // Attempt to parse JSON
            } catch (err) {
                throw new Error('Invalid response from server'); // Handle non-JSON responses
            }
    
            if (!response.ok) {
                setIsLoading(false);
                setError(json.error || 'Something went wrong');
                return;
            }
    
            // Save the user to local storage
            localStorage.setItem('user', JSON.stringify(json));
    
            // Update the auth context
            dispatch({ type: 'LOGIN', payload: json });
    
            setIsLoading(false);
        } catch (error) {
            setError(error.message);
            console.error(error.message);
            setIsLoading(false);
        }
    }
    return { login, isLoading, error }




}