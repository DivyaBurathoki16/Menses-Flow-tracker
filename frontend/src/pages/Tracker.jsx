import React, { useState, useEffect } from 'react';
import './Tracker.css';

const Tracker = () => {
  const [cycles, setCycles] = useState([]);
  const [lastPeriodDate, setLastPeriodDate] = useState('');
  const [cycleLength, setCycleLength] = useState(28);
  const [periodLength, setPeriodLength] = useState(5);
  const [expandedCycle, setExpandedCycle] = useState(null);
  const [cyclePhases, setCyclePhases] = useState(null);

  // Clear cycles when component mounts (page loads/refreshes)
  useEffect(() => {
    localStorage.removeItem('menstrualCycles'); // Clear localStorage
    setCycles([]); // Clear state
  }, []);

  // Save cycles to localStorage whenever they change
  useEffect(() => {
    if (cycles.length > 0) {
      localStorage.setItem('menstrualCycles', JSON.stringify(cycles));
    }
  }, [cycles]);

  const calculateCyclePhases = (startDate, cycleLength) => {
    const start = new Date(startDate);
    
    // Menstrual Phase (Days 1-5)
    const menstrualEnd = new Date(start);
    menstrualEnd.setDate(start.getDate() + periodLength - 1);

    // Follicular Phase (Days 1-13)
    const follicularEnd = new Date(start);
    follicularEnd.setDate(start.getDate() + 13);

    // Ovulation Phase (Days 14-17)
    const ovulationStart = new Date(start);
    ovulationStart.setDate(start.getDate() + 13);
    const ovulationEnd = new Date(start);
    ovulationEnd.setDate(start.getDate() + 16);

    // Luteal Phase (Days 18-28)
    const lutealStart = new Date(start);
    lutealStart.setDate(start.getDate() + 17);
    const lutealEnd = new Date(start);
    lutealEnd.setDate(start.getDate() + (cycleLength - 1));

    // Next Period
    const nextPeriod = new Date(start);
    nextPeriod.setDate(start.getDate() + cycleLength);

    // Fertile Window (Days 11-17)
    const fertileStart = new Date(start);
    fertileStart.setDate(start.getDate() + 10);
    const fertileEnd = new Date(start);
    fertileEnd.setDate(start.getDate() + 16);

    return {
      menstrual: {
        phase: "Menstrual Phase",
        start: start.toLocaleDateString(),
        end: menstrualEnd.toLocaleDateString(),
        description: "Period bleeding occurs as the uterine lining sheds."
      },
      follicular: {
        phase: "Follicular Phase",
        start: start.toLocaleDateString(),
        end: follicularEnd.toLocaleDateString(),
        description: "Follicles in ovaries develop and estrogen levels rise."
      },
      ovulation: {
        phase: "Ovulation Phase",
        start: ovulationStart.toLocaleDateString(),
        end: ovulationEnd.toLocaleDateString(),
        description: "A mature egg is released from the ovary."
      },
      luteal: {
        phase: "Luteal Phase",
        start: lutealStart.toLocaleDateString(),
        end: lutealEnd.toLocaleDateString(),
        description: "Corpus luteum produces progesterone to prepare for possible pregnancy."
      },
      fertile: {
        phase: "Fertile Window",
        start: fertileStart.toLocaleDateString(),
        end: fertileEnd.toLocaleDateString(),
        description: "Highest probability of conception during these days."
      },
      nextPeriod: {
        phase: "Next Period Expected",
        date: nextPeriod.toLocaleDateString(),
        description: "Your next period is expected to start around this date."
      }
    };
  };

  const saveCycle = () => {
    if (!lastPeriodDate) {
      alert('Please enter your last period start date');
      return;
    }

    const newCycle = {
      id: Date.now(),
      startDate: lastPeriodDate,
      cycleLength: parseInt(cycleLength),
      periodLength: parseInt(periodLength),
      phases: calculateCyclePhases(lastPeriodDate, cycleLength)
    };

    setCycles([...cycles, newCycle]);
    setLastPeriodDate('');
    setCyclePhases(calculateCyclePhases(lastPeriodDate, cycleLength));
  };

  const deleteCycle = (id) => {
    const updatedCycles = cycles.filter(cycle => cycle.id !== id);
    setCycles(updatedCycles);
    if (updatedCycles.length === 0) {
      localStorage.removeItem('menstrualCycles');
    }
  };

  const toggleCycle = (cycleId) => {
    setExpandedCycle(expandedCycle === cycleId ? null : cycleId);
  };

  return (
    <div className="page-container">
      <h1>Menstrual Cycle Tracker</h1>
      
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
        <button onClick={saveCycle}>Track Cycle</button>
      </div>

      {cyclePhases && (
        <div className="phases-container">
          <h2>Current Cycle Phases</h2>
          <div className="phases-grid">
            {Object.values(cyclePhases).map((phase, index) => (
              <div key={index} className="phase-card">
                <h3>{phase.phase}</h3>
                {phase.start && phase.end ? (
                  <p className="phase-dates">{phase.start} - {phase.end}</p>
                ) : (
                  <p className="phase-dates">{phase.date}</p>
                )}
                <p className="phase-description">{phase.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="history-section">
        <h2>Cycle History</h2>
        {cycles.length === 0 ? (
          <p>No cycles logged yet</p>
        ) : (
          <div className="cycle-list">
            {cycles.map(cycle => (
              <div 
                key={cycle.id} 
                className={`cycle-item ${expandedCycle === cycle.id ? 'expanded' : 'collapsed'}`}
                onClick={() => toggleCycle(cycle.id)}
              >
                <h3>Cycle Starting {new Date(cycle.startDate).toLocaleDateString()}</h3>
                {expandedCycle === cycle.id && (
                  <div className="cycle-details">
                    <div className="phases-grid">
                      {Object.values(cycle.phases).map((phase, index) => (
                        <div key={index} className="phase-card">
                          <h4>{phase.phase}</h4>
                          {phase.start && phase.end ? (
                            <p className="phase-dates">{phase.start} - {phase.end}</p>
                          ) : (
                            <p className="phase-dates">{phase.date}</p>
                          )}
                          <p className="phase-description">{phase.description}</p>
                        </div>
                      ))}
                    </div>
                    <button className="delete-btn" onClick={(e) => {
                      e.stopPropagation();
                      deleteCycle(cycle.id);
                    }}>Delete Cycle</button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Tracker;
