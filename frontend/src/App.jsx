import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Tracker from './pages/Tracker';
import Health from './pages/Health';
import Home from './pages/Home';
import Header from './components/Header';
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/tracker" element={<Tracker />} /> */}
          <Route path="/health" element={<Health />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
