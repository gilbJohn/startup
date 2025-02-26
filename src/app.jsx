import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, NavLink, Route, Routes, Navigate } from "react-router-dom";
import Login from "./login/login";
import Gallary from "./gallary/gallary";
import Draw from "./draw/draw";
import "./app.css";
import QuoteComponent from "../components/quote";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Handle successful login
  const handleLogin = () => setIsLoggedIn(true);

  // Handle logout
  const handleLogout = async () => {
    // Call backend logout endpoint
    try {
      const response = await fetch("/api/logout", { method: "DELETE" });
      if (response.ok) {
        setIsLoggedIn(false);
      } else {
        console.error("Failed to log out.");
      }
    } catch (err) {
      console.error("Network error during logout:", err);
      console.log(err)
    }
  };

  return (
    <BrowserRouter>
      <div className="app">
        <header>
          <h1>Draw Your Masterpiece</h1>
          <nav>
            <ul>
              {!isLoggedIn ? (
                <li>
                  <NavLink className="nav-link" to="/">Login</NavLink>
                </li>
              ) : (
                <>
                  <li>
                    <NavLink className="nav-link" to="/draw">Draw</NavLink>
                  </li>
                  <li>
                    <NavLink className="nav-link" to="/gallary">Gallery</NavLink>
                  </li>
                  <li>
                    <a className="nav-link logout-button" onClick={handleLogout}>Logout</a>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </header>

        <main>
          <Routes>
            {/* Login route */}
            <Route path="/" element={<Login onLogin={handleLogin} />} />
            {/* Protected routes */}
            <Route path="/draw" element={isLoggedIn ? <Draw /> : <Navigate to="/" />} />
            <Route path="/gallary" element={isLoggedIn ? <Gallary /> : <Navigate to="/" />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        {/* Quote component */}
        <QuoteComponent/>

        {/* Footer with GitHub link */}
        <footer>
          <a href="https://github.com/gilbJohn/startup" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
        </footer>
      </div>
    </BrowserRouter>
  );
}

// 404 Not Found component
function NotFound() {
  return <main className="container-fluid bg-secondary text-center">404: Page Not Found</main>;
}
