import React from 'react';
// NavLink allows navigation without full page refresh and highlights active link
import { NavLink } from 'react-router-dom';
import './Navbar.css';

// Reusable Navbar Component
const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        🏥 Hospital Management System
      </div>
      <div className="nav-links">
        {/* NavLink to Home page ("/") */}
        <NavLink to="/" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
          Home
        </NavLink>

        {/* NavLink to Doctors page ("/doctors") */}
        <NavLink to="/doctors" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
          Doctors
        </NavLink>

        {/* NavLink to Booking page ("/booking") */}
        <NavLink to="/booking" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
          Booking
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
