import React from "react";
import "./login.css";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Login() {
  return (
    <main>
      <div className="login-container">
        <form>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" name="username" />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" />
          </div>
          {/* Button Group */}
          <div className="button-group">
            <button type="submit">Login</button>
            <button type="button">Create</button>
          </div>
        </form>
      </div>
    </main>
  );
}
