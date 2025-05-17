import {useState} from 'react'
import { useAuthContext } from './useAuthContext'

const URL = process.env.REACT_APP_BACKEND_URL;

export const useRegister = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useAuthContext()

    const register = async (email, password, name, phone, dob, address, nationalId) => {
        setError(null)
        setIsLoading(true)

        const response = await fetch(`${URL}/guest/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password, name, phone, dob, address, nationalId })
        })
        const json = await response.json()

        if (!response.ok) {
            setIsLoading(false)
            setError(json.error)
        }
        if (response.ok) {
            localStorage.setItem('user', JSON.stringify(json))

            dispatch({ type: 'LOGIN', payload: json })

            setIsLoading(false)
        }
    }

    return { register, isLoading, error }




}