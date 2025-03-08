import React from "react";
import { Link } from "react-router-dom";
import "../CSS/Header.css"; // Import the CSS file

const Header = () => {
  return (
    <header className="header">
      {/* Logo on the left */}
      <Link to="/">
        <img src="/logo.png" alt="App Logo" className="logo" />
      </Link>

      {/* Navigation links centered */}
      <nav className="navbar">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/profile" className="nav-link">Profile</Link>
        <Link to="/tracker" className="nav-link">Tracker</Link>
        <Link to="/health" className="nav-link">Health</Link>
      </nav>
    </header>
  );
};

export default Header;
