import { createContext, useReducer, useEffect, useState } from "react";

export const AuthContext = createContext();

export const authReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN":
            return { ...state, user: action.payload };
        case "LOGOUT":
            return { ...state, user: null, bookings: [] }; 
        case "SET_BOOKINGS":
            return { ...state, bookings: action.payload }; 
        default:
            return state;
    }
};

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null,
        bookings: [], 
    });

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user) {
            dispatch({ type: "LOGIN", payload: user });

            const fetchBookings = async () => {
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/user/myBookings`, {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                });

                const bookings = await response.json();
                if (response.ok) {
                    dispatch({ type: "SET_BOOKINGS", payload: bookings });
                }
            };

            fetchBookings();
        }
    }, []);

    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AuthContext.Provider>
    );
};