import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
// import UserHome from "./pages/userHome";
import Otp from "./pages/Otp";
import Footer from "./components/Footer";

function App() {
  const {user} = useAuthContext()
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route
              path="/"
              element={
                user
                  ? user.role === "admin"
                    ? <Home />
                    : <Navigate to="/login" />
                  : <Navigate to="/login" />
              }
            />
            <Route path="/login" element={!user ? <Login /> : <Navigate to="/"/>} />
            <Route path="/register" element={!user ? <Register /> : <Navigate to="/"/>} />
            {/* <Route path="/forgotPassword" element={!user ? <Otp /> : <Navigate to="/"/>} /> */}

            //user routes
            {/* <Route path="/user" element={
                user
                  ? user.role === "user"
                    ? <UserHome />
                    : <Navigate to="/login" />
                  : <Navigate to="/login" />
              } /> */}


          
          </Routes>
        </div>
        <Footer />

      </BrowserRouter>
    </div>
  );
}

export default App;
