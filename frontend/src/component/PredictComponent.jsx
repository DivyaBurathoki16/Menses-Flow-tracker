import { useContext, useEffect, useState } from "react";
import { PeriodTrackerContext } from "../context/PeriodTrackerContext";
import { UserContext } from "../context/UserContext";
import { trainCycleModel, predictNextCycle } from "../ml/mlModel";
import "../CSS/PredictComponent.css";

const PredictComponent = () => {
  const { user } = useContext(UserContext);
  const { trackerData } = useContext(PeriodTrackerContext);
  const [model, setModel] = useState(null);
  const [prediction, setPrediction] = useState(null);

  useEffect(() => {
    if (user && trackerData.length >= 3) {
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

    if (
      !latestEntry.lastPeriodDate ||
      !latestEntry.cycleLength ||
      !latestEntry.flowIntensity ||
      !latestEntry.periodDuration
    ) {
      alert("Missing necessary data for prediction (cycle length, flow intensity, or period duration).");
      return;
    }

    const result = await predictNextCycle(
      model,
      latestEntry.lastPeriodDate,
      latestEntry.cycleLength,
      latestEntry.flowIntensity,
      latestEntry.periodDuration
    );

    setPrediction(result);
  };

  return (
    <div className="predict-component">
      <h2>Cycle Predictions (AI-Enhanced)</h2>

      {trackerData.length < 3 ? (
        <p style={{ color: "red", fontWeight: "bold" }}>
          🚨 You need at least <b>{3 - trackerData.length}</b> more period record(s) for accurate cycle predictions.
        </p>
      ) : prediction ? (
        <div className="prediction-result">
          <p>🌸 <strong>Next Period Date:</strong> {prediction.nextPeriod}</p>
          <p>🩸 <strong>Menstrual Phase:</strong> {prediction.menstrualPhase}</p>
          <p>🌀 <strong>Follicular Phase:</strong> {prediction.follicularPhase}</p>
          <p>🌟 <strong>Ovulation Date:</strong> {prediction.ovulationDate}</p>
          <p>🌑 <strong>Luteal Phase:</strong> {prediction.lutealPhase}</p>
          <p>📏 <strong>Predicted Cycle Length:</strong> {prediction.predictedCycleLength} days</p>
          <p>💧 <strong>Predicted Flow Intensity:</strong> {prediction.predictedFlowIntensity}</p>
          <p>🔍 <strong>Duration Note:</strong> {prediction.durationConcern}</p>
          <p>📋 <strong>Flow Note:</strong> {prediction.flowConcern}</p>
        </div>
      ) : (
        <button onClick={generatePrediction}>Predict My Cycle</button>
      )}
    </div>
  );
};

export default PredictComponent;
