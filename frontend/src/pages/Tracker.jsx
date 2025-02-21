import React, { useState, useEffect } from 'react';
import './Tracker.css';

const Tracker = () => {
  const [cycles, setCycles] = useState([]);
  const [lastPeriodDate, setLastPeriodDate] = useState('');
  const [cycleLength, setCycleLength] = useState(28);
  const [periodLength, setPeriodLength] = useState(5);

  useEffect(() => {
    // Load saved cycles from localStorage on component mount
    const savedCycles = localStorage.getItem('menstrualCycles');
    if (savedCycles) {
      setCycles(JSON.parse(savedCycles));
    }
  }, []);

  const saveCycle = () => {
    if (!lastPeriodDate) {
      alert('Please enter your last period start date');
      return;
    }

    const newCycle = {
      startDate: new Date(lastPeriodDate).toISOString(),
      cycleLength: parseInt(cycleLength),
      periodLength: parseInt(periodLength),
      id: Date.now()
    };

    const updatedCycles = [...cycles, newCycle];
    setCycles(updatedCycles);
    localStorage.setItem('menstrualCycles', JSON.stringify(updatedCycles));

    // Reset form
    setLastPeriodDate('');
  };

  const calculateNextPeriod = (startDate, cycleLength) => {
    const date = new Date(startDate);
    date.setDate(date.getDate() + parseInt(cycleLength));
    return date.toISOString().split('T')[0];
  };

  const deleteCycle = (id) => {
    const updatedCycles = cycles.filter(cycle => cycle.id !== id);
    setCycles(updatedCycles);
    localStorage.setItem('menstrualCycles', JSON.stringify(updatedCycles));
  };

  return (
    <div className="page-container">
      <h1>Tracker</h1>
      <p>Track your progress here</p>
      
      <div className="input-section">
        <h2>Log New Cycle</h2>
        <div className="input-group">
          <label>Last Period Start Date:</label>
          <input
            type="date"
            value={lastPeriodDate}
            onChange={(e) => setLastPeriodDate(e.target.value)}
            max={new Date().toISOString().split('T')[0]}
          />
        </div>
        
        <div className="input-group">
          <label>Cycle Length (days):</label>
          <input
            type="number"
            value={cycleLength}
            onChange={(e) => setCycleLength(e.target.value)}
            min="20"
            max="45"
          />
        </div>

        <div className="input-group">
          <label>Period Length (days):</label>
          <input
            type="number"
            value={periodLength}
            onChange={(e) => setPeriodLength(e.target.value)}
            min="2"
            max="10"
          />
        </div>

        <button onClick={saveCycle}>Save Cycle</button>
      </div>

      <div className="history-section">
        <h2>Cycle History</h2>
        {cycles.length === 0 ? (
          <p>No cycles logged yet</p>
        ) : (
          <div className="cycle-list">
            {cycles.map(cycle => (
              <div key={cycle.id} className="cycle-item">
                <p>Period Start: {new Date(cycle.startDate).toLocaleDateString()}</p>
                <p>Next Period: {new Date(calculateNextPeriod(cycle.startDate, cycle.cycleLength)).toLocaleDateString()}</p>
                <p>Cycle Length: {cycle.cycleLength} days</p>
                <p>Period Length: {cycle.periodLength} days</p>
                <button onClick={() => deleteCycle(cycle.id)}>Delete</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Tracker;
