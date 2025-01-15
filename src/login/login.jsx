import React from "react";
import "./login.css";

export default function Login() {
  return (
    <main>
      <div className="container">
        <form action="/draw.html" method="get">
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" name="username" />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" />
          </div>
          <button type="submit">Login</button>
          <button type="button" onClick={() => window.location.href = '/create.html'}>Create</button>
        </form>
      </div>
    </main>
  );
}
