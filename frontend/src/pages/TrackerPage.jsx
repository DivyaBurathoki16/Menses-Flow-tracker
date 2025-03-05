import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import { PeriodTrackerContext } from "../context/PeriodTrackerContext";
import PredictComponent from "../component/PredictComponent";

const TrackerPage = () => {
  const { user } = useContext(UserContext);
  const { trackerData, addPeriodEntry, deletePeriodEntry } = useContext(PeriodTrackerContext); // Fetch tracker data and delete function
  const [date, setDate] = useState("");
  const [periodDuration, setPeriodDuration] = useState(5);
  const [flowIntensity, setFlowIntensity] = useState("Low");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user) {
      await addPeriodEntry({ lastPeriodDate: date, periodDuration, flowIntensity });
      setDate("");
      setPeriodDuration(5);
      setFlowIntensity("Low");
    }
  };

  if (!user) {
    return <p>Please log in to track your period.</p>;
  }

  return (
    <>
      <div className="tracker-page">
        <h2>Period Tracker</h2>

        {/* Period Entry Form */}
        <form onSubmit={handleSubmit}>
          <label>
            Last Period Date:
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
          </label>

          <label>
            Period Duration (Days):
            <input 
              type="number" 
              value={periodDuration} 
              onChange={(e) => setPeriodDuration(e.target.value)} 
              min="1"
              max="50" 
              required 
            />
          </label>

          <label>
            Flow Intensity:
            <select value={flowIntensity} onChange={(e) => setFlowIntensity(e.target.value)}>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </label>

          <button type="submit">Add Entry</button>
        </form>

        {/* Display User's Period Records */}
        <h3>Your Period Records</h3>
        {trackerData.length > 0 ? (
          <ul>
            {trackerData.map((entry) => (
              <li key={entry._id}>
                <strong>Date:</strong> {entry.lastPeriodDate} | 
                <strong> Duration:</strong> {entry.periodDuration} days | 
                <strong> Flow:</strong> {entry.flowIntensity} 
                <button onClick={() => deletePeriodEntry(entry._id)}>Delete</button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No period records found.</p>
        )}
      </div>

      {/* Prediction Component */}
      <PredictComponent />
    </>
  );
};

export default TrackerPage;
