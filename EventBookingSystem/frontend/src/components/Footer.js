import { useDarkMode } from "../context/DarkModeContext";

const Footer = () => {
    const { isDarkMode, toggleDarkMode } = useDarkMode();

    return (
        <footer className={`text-center py-3 ${isDarkMode ? "bg-dark text-light" : "bg-light text-dark"}`}>
            <button className="btn btn-outline-primary" onClick={toggleDarkMode}>
                {isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            </button>
        </footer>
    );
};

export default Footer;