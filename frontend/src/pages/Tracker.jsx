import React, { useState, useEffect, useContext } from 'react';
import UserContext from '../context/UserContext'; // Import user context
import './Tracker.css';

const Tracker = () => {
  const { user } = useContext(UserContext); // Get the logged-in user
  const [cycleData, setCycleData] = useState({
    startDate: '',
    cycleLength: '28',
    periodLength: '5',
    mood: '',
  });

  const [cycles, setCycles] = useState([]);
  const [expandedCycles, setExpandedCycles] = useState({});

  // Function to get user-specific cycle data from localStorage
  const loadUserCycles = () => {
    if (user && user.email) {
      const savedCycles = JSON.parse(localStorage.getItem(`cycles_${user.email}`)) || [];
      setCycles(savedCycles);
    }
  };

  // Load user-specific cycle data on mount or when user changes
  useEffect(() => {
    loadUserCycles();
  }, [user]);

  // Save user-specific cycle data whenever `cycles` updates
  useEffect(() => {
    if (user && user.email) {
      localStorage.setItem(`cycles_${user.email}`, JSON.stringify(cycles));
    }
  }, [cycles, user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCycleData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const calculateCyclePhases = (startDate, cycleLength, periodLength) => {
    const start = new Date(startDate);

    return {
      menstrual: {
        start: start.toISOString().split('T')[0],
        end: new Date(start.setDate(start.getDate() + parseInt(periodLength) - 1)).toISOString().split('T')[0],
        description: 'Menstruation occurs as the uterine lining sheds.',
      },
      follicular: {
        start: start.toISOString().split('T')[0],
        end: new Date(start.setDate(start.getDate() + 8)).toISOString().split('T')[0],
        description: 'Follicles develop and estrogen levels rise.',
      },
      ovulation: {
        start: new Date(start.setDate(start.getDate() + 1)).toISOString().split('T')[0],
        end: new Date(start.setDate(start.getDate() + 2)).toISOString().split('T')[0],
        description: 'Egg is released. This is the most fertile period.',
      },
      luteal: {
        start: new Date(start.setDate(start.getDate() + 1)).toISOString().split('T')[0],
        end: new Date(start.setDate(start.getDate() + parseInt(cycleLength) - periodLength - 4)).toISOString().split('T')[0],
        description: 'Hormone levels rise to prepare for pregnancy.',
      },
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user) {
      alert('Please log in to track your cycle.');
      return;
    }

    const phases = calculateCyclePhases(cycleData.startDate, cycleData.cycleLength, cycleData.periodLength);

    const newCycle = {
      id: Date.now(),
      ...cycleData,
      phases,
    };

    setCycles((prev) => [newCycle, ...prev]);
    setCycleData({ startDate: '', cycleLength: '28', periodLength: '5', mood: '' });
  };

  const deleteCycle = (id) => {
    setCycles((prev) => prev.filter((cycle) => cycle.id !== id));
  };

  const toggleCyclePhases = (cycleId) => {
    setExpandedCycles((prev) => ({
      ...prev,
      [cycleId]: !prev[cycleId],
    }));
  };

  return (
    <div className="page-container">
      <div className="tracker-content">
        <div className="input-section">
          <h2>Log New Cycle</h2>
          {user ? (
            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <label htmlFor="startDate">Period Start Date</label>
                <input
                  type="date"
                  id="startDate"
                  name="startDate"
                  value={cycleData.startDate}
                  onChange={handleInputChange}
                  required
                  max={new Date().toISOString().split('T')[0]}
                />
              </div>

              <div className="input-group">
                <label htmlFor="cycleLength">Cycle Length (days)</label>
                <input
                  type="number"
                  id="cycleLength"
                  name="cycleLength"
                  value={cycleData.cycleLength}
                  onChange={handleInputChange}
                  min="21"
                  max="45"
                  required
                />
              </div>

              <div className="input-group">
                <label htmlFor="periodLength">Period Length (days)</label>
                <input
                  type="number"
                  id="periodLength"
                  name="periodLength"
                  value={cycleData.periodLength}
                  onChange={handleInputChange}
                  min="2"
                  max="10"
                  required
                />
              </div>

              <div className="input-group">
                <label htmlFor="mood">Mood</label>
                <select id="mood" name="mood" value={cycleData.mood} onChange={handleInputChange}>
                  <option value="">Select Mood</option>
                  <option value="happy">Happy</option>
                  <option value="normal">Normal</option>
                  <option value="irritated">Irritated</option>
                  <option value="anxious">Anxious</option>
                  <option value="sad">Sad</option>
                </select>
              </div>

              <button type="submit" className="submit-button">Log Cycle</button>
            </form>
          ) : (
            <p>Please log in to track your cycles.</p>
          )}
        </div>

        <div className="history-section">
          <h2>Your Cycle History</h2>
          {user ? (
            <div className="cycle-list">
              {cycles.length > 0 ? (
                cycles.map((cycle) => (
                  <div key={cycle.id} className="cycle-item">
                    <h3>Cycle Details</h3>
                    <p><strong>Start Date:</strong> {cycle.startDate}</p>
                    <p><strong>Cycle Length:</strong> {cycle.cycleLength} days</p>
                    <p><strong>Period Length:</strong> {cycle.periodLength} days</p>
                    {cycle.mood && <p><strong>Mood:</strong> {cycle.mood}</p>}

                    <button className="toggle-phases-button" onClick={() => toggleCyclePhases(cycle.id)}>
                      {expandedCycles[cycle.id] ? 'Hide Phases' : 'Show Phases'}
                    </button>

                    {expandedCycles[cycle.id] && (
                      <div className="phases-container">
                        {Object.entries(cycle.phases).map(([key, phase]) => (
                          <div key={key} className={`phase ${key}`}>
                            <h4>{key.charAt(0).toUpperCase() + key.slice(1)} Phase</h4>
                            <p><strong>Duration:</strong> {phase.start} to {phase.end}</p>
                            <p className="phase-description">{phase.description}</p>
                          </div>
                        ))}
                      </div>
                    )}

                    <button onClick={() => deleteCycle(cycle.id)} className="delete-button">
                      Delete Record
                    </button>
                  </div>
                ))
              ) : (
                <p>No cycles logged yet.</p>
              )}
            </div>
          ) : (
            <p>Please log in to view your cycle history.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Tracker;
