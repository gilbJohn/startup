import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, NavLink, Route, Routes, Navigate } from "react-router-dom";
import Login from "./login/login";
import Gallary from "./gallary/gallary";
import Draw from "./draw/draw";
import "./app.css";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => setIsLoggedIn(true);
  const handleLogout = () => setIsLoggedIn(false);

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
                    <NavLink className="nav-link logout-button" onClick={handleLogout}>Logout</NavLink>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<Login onLogin={handleLogin} />} />
            <Route path="/draw" element={isLoggedIn ? <Draw /> : <Navigate to="/" />} />
            <Route path="/gallary" element={isLoggedIn ? <Gallary /> : <Navigate to="/" />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <footer>
          <a href="https://github.com/gilbJohn/startup" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
        </footer>
      </div>
    </BrowserRouter>
  );
}

function NotFound() {
  return <main className="container-fluid bg-secondary text-center">404: Page Not Found</main>;
}
