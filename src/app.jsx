import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
export default function App() {
  return (
    <>
      <BrowserRouter>
      
      <header>
        <h1>Draw Your Masterpiece!</h1>
      </header>
      <Routes>
        <div>App will display here</div>
      </Routes>
      
      <footer>
        <a href="https://github.com/gilbJohn/startup" target="_blank" rel="noopener noreferrer">GitHub</a>
        <a href="/gallery.html">Gallery</a>
      </footer>
      
      </BrowserRouter>
    </>
  );
}
