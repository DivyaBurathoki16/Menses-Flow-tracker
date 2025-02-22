import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <header>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/tracker">Tracker</Link>
        <Link to="/health">Health</Link>
      </nav>
    </header>
  );
};

export default Header;
