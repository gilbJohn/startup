import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";

export default function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Redirect after login

  const handleLogin = (e) => {
    e.preventDefault();
    if (username && password) {
      onLogin(); // Update login status
      navigate("/draw"); // Redirect to Gallery
    }
  };

  return (
    <main>
      <div className="login-container">
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    </main>
  );
}
