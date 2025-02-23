import React, { useState, useEffect } from 'react';
import './Tracker.css';

const Tracker = () => {
  const [cycleData, setCycleData] = useState({
    startDate: '',
    cycleLength: '28',
    periodLength: '5',
    symptoms: [],
    mood: ''
  });

  const [cycles, setCycles] = useState([]);
  const [expandedCycles, setExpandedCycles] = useState({});

  useEffect(() => {
    const savedCycles = localStorage.getItem('cycles');
    if (savedCycles) {
      setCycles(JSON.parse(savedCycles));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cycles', JSON.stringify(cycles));
  }, [cycles]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCycleData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const calculateCyclePhases = (startDate, cycleLength, periodLength) => {
    const start = new Date(startDate);
    
    // Menstrual Phase (Days 1-5 typically)
    const menstrualEnd = new Date(start);
    menstrualEnd.setDate(start.getDate() + parseInt(periodLength) - 1);

    // Follicular Phase (Days 1-13)
    const follicularEnd = new Date(start);
    follicularEnd.setDate(start.getDate() + 13);

    // Ovulation (Around Day 14)
    const ovulationStart = new Date(start);
    ovulationStart.setDate(start.getDate() + 13);
    const ovulationEnd = new Date(start);
    ovulationEnd.setDate(start.getDate() + 15);

    // Luteal Phase (Days 15-28)
    const lutealStart = new Date(start);
    lutealStart.setDate(start.getDate() + 15);
    const lutealEnd = new Date(start);
    lutealEnd.setDate(start.getDate() + parseInt(cycleLength) - 1);

    return {
      menstrual: {
        start: start.toISOString().split('T')[0],
        end: menstrualEnd.toISOString().split('T')[0],
        description: 'Menstruation occurs as the uterine lining sheds. Hormone levels are at their lowest.'
      },
      follicular: {
        start: start.toISOString().split('T')[0],
        end: follicularEnd.toISOString().split('T')[0],
        description: 'Follicles develop in the ovaries and estrogen levels begin to rise.'
      },
      ovulation: {
        start: ovulationStart.toISOString().split('T')[0],
        end: ovulationEnd.toISOString().split('T')[0],
        description: 'An egg is released from the ovary. This is the most fertile period.'
      },
      luteal: {
        start: lutealStart.toISOString().split('T')[0],
        end: lutealEnd.toISOString().split('T')[0],
        description: 'Progesterone rises to prepare for possible pregnancy. If no pregnancy occurs, levels drop and the cycle begins again.'
      }
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const phases = calculateCyclePhases(
      cycleData.startDate, 
      cycleData.cycleLength,
      cycleData.periodLength
    );
    
    const newCycle = {
      id: Date.now(),
      ...cycleData,
      phases
    };

    setCycles(prev => [newCycle, ...prev]);
    setCycleData({
      startDate: '',
      cycleLength: '28',
      periodLength: '5',
      symptoms: [],
      mood: ''
    });
  };

  const deleteCycle = (id) => {
    setCycles(prev => prev.filter(cycle => cycle.id !== id));
  };

  const toggleCyclePhases = (cycleId) => {
    setExpandedCycles(prev => ({
      ...prev,
      [cycleId]: !prev[cycleId]
    }));
  };

  return (
    <div className="page-container">
      <div className="tracker-content">
        <div className="input-section">
          <h2>Log New Cycle</h2>
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
              <select
                id="mood"
                name="mood"
                value={cycleData.mood}
                onChange={handleInputChange}
              >
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
        </div>

        <div className="history-section">
          <h2>Cycle History</h2>
          <div className="cycle-list">
            {cycles.map(cycle => (
              <div key={cycle.id} className="cycle-item">
                <h3>Cycle Details</h3>
                <p><strong>Start Date:</strong> {cycle.startDate}</p>
                <p><strong>Cycle Length:</strong> {cycle.cycleLength} days</p>
                <p><strong>Period Length:</strong> {cycle.periodLength} days</p>
                {cycle.mood && <p><strong>Mood:</strong> {cycle.mood}</p>}
                
                <div className="cycle-phases">
                  <div className="phases-header">
                    <h3>Cycle Phases</h3>
                    <button 
                      className="toggle-phases-button"
                      onClick={() => toggleCyclePhases(cycle.id)}
                      aria-label={expandedCycles[cycle.id] ? 'Hide phases' : 'Show phases'}
                    >
                      {expandedCycles[cycle.id] ? '−' : '+'}
                    </button>
                  </div>
                  
                  {expandedCycles[cycle.id] && (
                    <div className="phases-container">
                      <div className="phase menstrual">
                        <h4>Menstrual Phase</h4>
                        <p><strong>Duration:</strong> {cycle.phases.menstrual.start} to {cycle.phases.menstrual.end}</p>
                        <p className="phase-description">{cycle.phases.menstrual.description}</p>
                      </div>

                      <div className="phase follicular">
                        <h4>Follicular Phase</h4>
                        <p><strong>Duration:</strong> {cycle.phases.follicular.start} to {cycle.phases.follicular.end}</p>
                        <p className="phase-description">{cycle.phases.follicular.description}</p>
                      </div>

                      <div className="phase ovulation">
                        <h4>Ovulation Phase</h4>
                        <p><strong>Duration:</strong> {cycle.phases.ovulation.start} to {cycle.phases.ovulation.end}</p>
                        <p className="phase-description">{cycle.phases.ovulation.description}</p>
                      </div>

                      <div className="phase luteal">
                        <h4>Luteal Phase</h4>
                        <p><strong>Duration:</strong> {cycle.phases.luteal.start} to {cycle.phases.luteal.end}</p>
                        <p className="phase-description">{cycle.phases.luteal.description}</p>
                      </div>
                    </div>
                  )}
                </div>

                <button 
                  onClick={() => deleteCycle(cycle.id)}
                  className="delete-button"
                >
                  Delete Record
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tracker; 