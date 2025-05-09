import { createContext, useContext, useState } from "react";
import { useEffect } from "react";

// Create the context
const DarkModeContext = createContext();

// Custom hook to use the DarkModeContext
export const useDarkMode = () => {
    return useContext(DarkModeContext);
};

// Provider component
export const DarkModeProvider = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    const toggleDarkMode = () => {
        setIsDarkMode((prevMode) => !prevMode);
    };

        useEffect(() => {
        if (isDarkMode) {
            document.body.classList.add("dark-mode");
        } else {
            document.body.classList.remove("dark-mode");
        }
    }, [isDarkMode]);

    return (
        <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
            {children}
        </DarkModeContext.Provider>
    );
};