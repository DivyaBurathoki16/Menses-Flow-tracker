import React, { useState, useEffect, useContext } from "react";
import { useTracker } from "../context/TrackerContext";
import UserContext from "../context/UserContext";
import "./Tracker.css";

const Tracker = () => {
  const { user } = useContext(UserContext);
  const { cycles, addCycle, deleteCycle, loadUserCycles } = useTracker();

  const [cycleData, setCycleData] = useState({
    cycleStartDate: "",
    cycleEndDate: "",
    PeriodLengths: "5",
    FlowIntensity: "",
    Mood: "",
  });

  // Fetch previous records when the component mounts
  useEffect(() => {
    if (user) {
      loadUserCycles();
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCycleData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      alert("Please log in to track your cycle.");
      return;
    }
    await addCycle(cycleData);
    await loadUserCycles(); // Ensure UI updates with fresh data
    setCycleData({ cycleStartDate: "", cycleEndDate: "", PeriodLengths: "5", FlowIntensity: "", Mood: "" });
  };

  return (
    <div className="page-container">
      <div className="tracker-content">
        <div className="input-section">
          <h2>Log New Cycle</h2>
          {user ? (
            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <label htmlFor="cycleStartDate">Period Start Date</label>
                <input
                  type="date"
                  id="cycleStartDate"
                  name="cycleStartDate"
                  value={cycleData.cycleStartDate}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="input-group">
                <label htmlFor="cycleEndDate">Period End Date</label>
                <input
                  type="date"
                  id="cycleEndDate"
                  name="cycleEndDate"
                  value={cycleData.cycleEndDate}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="input-group">
                <label htmlFor="PeriodLengths">Period Length (days)</label>
                <input
                  type="number"
                  id="PeriodLengths"
                  name="PeriodLengths"
                  value={cycleData.PeriodLengths}
                  onChange={handleInputChange}
                  min="2"
                  max="10"
                  required
                />
              </div>

              <div className="input-group">
                <label htmlFor="FlowIntensity">Flow Intensity</label>
                <select id="FlowIntensity" name="FlowIntensity" value={cycleData.FlowIntensity} onChange={handleInputChange}>
                  <option value="">Select Intensity</option>
                  <option value="light">Light</option>
                  <option value="medium">Medium</option>
                  <option value="heavy">Heavy</option>
                </select>
              </div>

              <div className="input-group">
                <label htmlFor="Mood">Mood</label>
                <select id="Mood" name="Mood" value={cycleData.Mood} onChange={handleInputChange}>
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
                  <div key={cycle._id} className="cycle-item">
                    <h3>Cycle Details</h3>
                    <p><strong>Start Date:</strong> {cycle.cycleStartDate}</p>
                    <p><strong>End Date:</strong> {cycle.cycleEndDate}</p>
                    <p><strong>Period Length:</strong> {cycle.PeriodLengths} days</p>
                    <p><strong>Flow Intensity:</strong> {cycle.FlowIntensity}</p>
                    <p><strong>Mood:</strong> {cycle.Mood}</p>

                    <button onClick={async () => {
                      await deleteCycle(cycle._id);
                      await loadUserCycles();
                    }} className="delete-button">
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