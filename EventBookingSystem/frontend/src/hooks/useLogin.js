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
                json = await response.json(); 
            } catch (err) {
                throw new Error('Invalid response from server');
            }
    
            if (!response.ok) {
                setIsLoading(false);
                setError(json.error || 'Something went wrong');
                return;
            }
    
            localStorage.setItem('user', JSON.stringify(json));
    
            dispatch({ type: 'LOGIN', payload: json });

            const bookingsResponse = await fetch(`${URL}/user/myBookings`, {
            headers: {
                Authorization: `Bearer ${json.token}`,
            },
        });

        const bookings = await bookingsResponse.json();
        if (bookingsResponse.ok) {
            dispatch({ type: "SET_BOOKINGS", payload: bookings });
        }
    
            setIsLoading(false);
        } catch (error) {
            setError(error.message);
            console.error(error.message);
            setIsLoading(false);
        }
    }
    return { login, isLoading, error }




}