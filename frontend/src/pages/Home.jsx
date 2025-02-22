import React from 'react';
import './Home.css';

const Home = () => {
  return (
    <div className="page-container">
      <h1>Welcome to Period Tracker</h1>
      <div className="home-content">
        <section className="features">
          <h2>Features</h2>
          <div className="feature-grid">
            <div className="feature-card">
              <h3>Period Tracking</h3>
              <p>Track your menstrual cycles with ease and accuracy</p>
            </div>
            <div className="feature-card">
              <h3>Health Monitoring</h3>
              <p>Monitor your overall reproductive health</p>
            </div>
            <div className="feature-card">
              <h3>Fertility Window</h3>
              <p>Calculate your fertile days and ovulation period</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;