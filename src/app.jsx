import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import Login from './login/login';
import Gallary from './gallary/gallary';
import Draw from './draw/draw';
import './app.css';

export default function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <header>
          <h1>Draw Your Masterpiece</h1>
          <nav>
            <ul>
              <li>
                <NavLink className="nav-link" to="/">Login</NavLink>
              </li>
              <li>
                <NavLink className="nav-link" to="/draw">Draw</NavLink>
              </li>
              <li>
                <NavLink className="nav-link" to="/gallary">Gallery</NavLink>
              </li>
            </ul>
          </nav>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/draw" element={<Draw />} />
            <Route path="/gallary" element={<Gallary />} />
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
