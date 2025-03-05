import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ProfilePage from "./pages/ProfilePage";
import HomePage from "./pages/HomePage";
import TrackerPage from "./pages/TrackerPage"; 
import HealthPage from "./pages/HealthPage"; // Import HealthPage

const App = () => {
  return (
    <Router>
      <nav style={styles.navbar}>
        <Link to="/" style={styles.link}>Home</Link>
        <Link to="/profile" style={styles.link}>Profile</Link>
        <Link to="/tracker" style={styles.link}>Tracker</Link>
        <Link to="/health" style={styles.link}>Health</Link> {/* Added Health link */}
      </nav>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/tracker" element={<TrackerPage />} /> 
        <Route path="/health" element={<HealthPage />} /> {/* Added Health route */}
      </Routes>
    </Router>
  );
};

// Basic inline styles for the navbar
const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-around",
    padding: "1rem",
    backgroundColor: "#007bff",
  },
  link: {
    color: "white",
    textDecoration: "none",
    fontSize: "1.2rem",
  },
};

export default App;
