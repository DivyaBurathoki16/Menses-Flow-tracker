import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const location = useLocation();

  return (
    <header className="header">
      <nav>
        <Link to="/" className="logo">
          FlowTracker
        </Link>
        <div className="nav-links">
          <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
            Home
          </Link>
          <Link to="/tracker" className={location.pathname === '/tracker' ? 'active' : ''}>
            Tracker
          </Link>
          <Link to="/health" className={location.pathname === '/health' ? 'active' : ''}>
            Health
          </Link>
          <Link to="/profile" className={location.pathname === '/profile' ? 'active' : ''}>
            Profile
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
