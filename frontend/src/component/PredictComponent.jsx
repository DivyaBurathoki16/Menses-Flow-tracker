import { useContext, useEffect, useState } from "react";
import { PeriodTrackerContext } from "../context/PeriodTrackerContext";
import { UserContext } from "../context/UserContext";
import { trainCycleModel, predictNextCycle } from "../ml/mlModel";

const PredictComponent = () => {
  const { user } = useContext(UserContext);
  const { trackerData } = useContext(PeriodTrackerContext);
  const [model, setModel] = useState(null);
  const [prediction, setPrediction] = useState(null);

  useEffect(() => {
    if (user && trackerData.length > 2) {
      trainModel();
    }
  }, [user, trackerData]);

  const trainModel = async () => {
    const trainedModel = await trainCycleModel(trackerData);
    setModel(trainedModel);
  };

  const generatePrediction = async () => {
    if (!model || trackerData.length === 0) return;
    
    const latestEntry = trackerData[trackerData.length - 1];
    const result = await predictNextCycle(model, latestEntry.lastPeriodDate, latestEntry.periodDuration);
    
    setPrediction(result);
  };

  return (
    <div className="predict-component">
      <h2>Cycle Predictions (AI-Enhanced)</h2>
      {prediction ? (
        <div>
          <p>🌸 Next Period Date: {prediction.nextPeriod}</p>
          <p>🌀 Follicular Phase: {prediction.follicularPhase}</p>
          <p>🌟 Ovulation Date: {prediction.ovulation}</p>
          <p>🌑 Luteal Phase: {prediction.lutealPhase}</p>
        </div>
      ) : (
        <button onClick={generatePrediction}>Predict My Cycle</button>
      )}
    </div>
  );
};

export default PredictComponent;
