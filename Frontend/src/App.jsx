import React from 'react';
// 1. REACT ROUTER SETUP: Importing essential components from react-router-dom
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// 2. PAGE COMPONENTS
import HomePage from './pages/HomePage';
import DoctorsPage from './pages/DoctorsPage';
import BookingPage from './pages/BookingPage';

// 3. REUSABLE NAVBAR COMPONENT
import Navbar from './components/Navbar';

import './App.css';

function App() {
  return (
    // BrowserRouter enables single-page routing without page reloads
    <BrowserRouter>
      <div className="app-container">
        {/* Navbar is placed outside Routes so it stays visible on every page */}
        <Navbar />

        <main className="app-main">
          {/* Routes evaluates path matches and renders the corresponding component */}
          <Routes>
            {/* Route 1: "/" renders HomePage */}
            <Route path="/" element={<HomePage />} />

            {/* Route 2: "/doctors" renders DoctorsPage */}
            <Route path="/doctors" element={<DoctorsPage />} />

            {/* Route 3: "/booking" renders BookingPage */}
            <Route path="/booking" element={<BookingPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
