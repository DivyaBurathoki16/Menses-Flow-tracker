import { createContext, useState, useContext, useEffect } from "react";
import { UserContext } from "./UserContext";
import { PeriodTrackerContext } from "./PeriodTrackerContext";

export const PredictContext = createContext();

export const PredictProvider = ({ children }) => {
  const { user } = useContext(UserContext);
  const { trackerData } = useContext(PeriodTrackerContext);
  const [predictions, setPredictions] = useState(null);

  useEffect(() => {
    if (user && trackerData.length > 0) {
      predictCycle();
    }
  }, [user, trackerData]);

  const predictCycle = () => {
    if (!trackerData || trackerData.length === 0) return;
    
    const latestEntry = trackerData[trackerData.length - 1];
    const cycleLength = 28; // Default cycle length (can be improved later with ML)
    const ovulationDay = 14; // Midpoint of the cycle
    
    const lastPeriodDate = new Date(latestEntry.lastPeriodDate);
    const nextPeriodDate = new Date(lastPeriodDate);
    nextPeriodDate.setDate(lastPeriodDate.getDate() + cycleLength);
    
    const ovulationDate = new Date(lastPeriodDate);
    ovulationDate.setDate(lastPeriodDate.getDate() + ovulationDay);
    
    setPredictions({
      nextPeriodDate: nextPeriodDate.toDateString(),
      ovulationDate: ovulationDate.toDateString(),
    });
  };

  return (
    <PredictContext.Provider value={{ predictions }}>
      {children}
    </PredictContext.Provider>
  );
};

export const PredictComponent = () => {
  const { predictions } = useContext(PredictContext);

  if (!predictions) return <p>Loading predictions...</p>;

  return (
    <div className="predict-section">
      <h3>Predicted Cycle</h3>
      <p>Next Period Date: {predictions.nextPeriodDate}</p>
      <p>Ovulation Date: {predictions.ovulationDate}</p>
    </div>
  );
};
