import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // 🆕 Register User
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3001/api/register", {
        method: "POST",
        headers: {'Content-type': 'application/json; charset=UTF-8'},
        body: JSON.stringify({ email, password }),
      });
      if (response.ok) {
        setMessage("Registration successful! You can now log in.");
      } else {
        const error = await response.json();
        setMessage(error.msg || "Failed to register.");
      }
    } catch (err) {
      console.log(err);
      setMessage("Network error during registration.");
    }
  };

  // 🔐 Login User
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3001/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (response.ok) {
        onLogin();
        navigate("/draw"); // Redirect to the protected Draw page
      } else {
        const error = await response.json();
        setMessage(error.msg || "Login failed.");
      }
    } catch (err) {
      console.log(err);
      setMessage("Network error during login.");
    }
  };

  // 🚪 Logout User
  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/logout", { method: "DELETE" });
      if (response.ok) {
        setMessage("Successfully logged out!");
      } else {
        setMessage("Failed to log out.");
      }
    } catch (err) {
      setMessage("Network error during logout.");
    }
  };

  return (
    <main>
      <div className="login-container">
        <form onSubmit={handleLogin}>
          {/* Email Input */}
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password Input */}
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Action Buttons */}
          
          <div className="button-group">
            <button type="submit">Login</button>
            <button type="button" onClick={handleRegister}>
              Register
            </button>
          </div>
        </form>
        <p className="message">{message}</p>
      </div>
    </main>
  );
}
