import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "../src/component/Header"
import ProfilePage from "./pages/ProfilePage";
import HomePage from "./pages/HomePage";
import TrackerPage from "./pages/TrackerPage";
import HealthPage from "./pages/HealthPage";

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/tracker" element={<TrackerPage />} />
        <Route path="/health" element={<HealthPage />} />
      </Routes>
    </Router>
  );
};

export default App;
