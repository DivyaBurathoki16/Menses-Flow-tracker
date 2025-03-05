import * as tf from "@tensorflow/tfjs";

// Function to train a model for predicting period cycle and flow intensity
export const trainCycleModel = async (historicalData) => {
  if (historicalData.length < 3) {
    console.warn("Not enough data to train the model.");
    return null;
  }

  // Prepare inputs: Cycle length & Flow intensity
  const inputs = historicalData.map((entry, index) => {
    if (index === 0) return null; // Skip first entry
    return [
      (new Date(entry.lastPeriodDate) - new Date(historicalData[index - 1].lastPeriodDate)) / (1000 * 60 * 60 * 24), // Cycle length in days
      entry.flowIntensity || 1, // Default to 1 if no intensity provided
    ];
  }).filter(entry => entry !== null); // Remove null values

  // Labels: Next cycle length & next flow intensity
  const labels = inputs.slice(1); // Shifted forward

  // Convert to Tensors
  const xs = tf.tensor2d(inputs.slice(0, -1));
  const ys = tf.tensor2d(labels);

  // Create a Neural Network Model
  const model = tf.sequential();
  model.add(tf.layers.dense({ units: 16, activation: "relu", inputShape: [2] }));
  model.add(tf.layers.dense({ units: 8, activation: "relu" }));
  model.add(tf.layers.dense({ units: 2 })); // Predicting both cycle length & flow intensity

  // Compile the model
  model.compile({ optimizer: "adam", loss: "meanSquaredError" });

  // Train the model
  await model.fit(xs, ys, { epochs: 150 });

  return model;
};

// Function to predict next period, duration concern, and flow intensity
export const predictNextCycle = async (model, lastPeriodDate, lastCycleLength, lastFlowIntensity, periodDuration) => {
  if (!model) return null;

  // Predict next cycle length & flow intensity
  const inputTensor = tf.tensor2d([[lastCycleLength, lastFlowIntensity]]);
  const prediction = await model.predict(inputTensor).data();

  const predictedCycleLength = Math.round(prediction[0]) || 28; // Default to 28 days
  const predictedFlowIntensity = Math.round(prediction[1]) || 2; // Default to medium intensity

  // Calculate next period start date
  const lastPeriod = new Date(lastPeriodDate);
  const nextPeriod = new Date(lastPeriod);
  nextPeriod.setDate(lastPeriod.getDate() + predictedCycleLength);

  // Calculate menstrual phases
  const menstrualPhaseEnd = new Date(lastPeriod);
  menstrualPhaseEnd.setDate(lastPeriod.getDate() + periodDuration - 1);

  const follicularPhaseStart = new Date(menstrualPhaseEnd);
  follicularPhaseStart.setDate(menstrualPhaseEnd.getDate() + 1);

  const ovulation = new Date(lastPeriod);
  ovulation.setDate(lastPeriod.getDate() + 14);

  const lutealPhaseStart = new Date(ovulation);
  lutealPhaseStart.setDate(ovulation.getDate() + 1);

  const lutealPhaseEnd = new Date(nextPeriod);
  lutealPhaseEnd.setDate(nextPeriod.getDate() - 1);

  // Check if period duration is abnormal
  let durationConcern = "";
  if (periodDuration < 5) {
    durationConcern = "Your period is shorter than usual. If this continues, consult a doctor.";
  } else if (periodDuration > 7) {
    durationConcern = "Your period is lasting longer than normal. Consider seeing a doctor.";
  } else {
    durationConcern = "Your period duration is within the normal range (5-7 days).";
  }

  // Predict Flow Intensity Concern
  let flowConcern = "";
  if (predictedFlowIntensity >= 4) {
    flowConcern = "Your predicted flow intensity is high. Stay hydrated and monitor for heavy bleeding.";
  } else if (predictedFlowIntensity === 3) {
    flowConcern = "Your predicted flow intensity is moderate. Maintain your usual menstrual care.";
  } else {
    flowConcern = "Your predicted flow intensity is low. Ensure you're tracking any irregularities.";
  }

  return {
    nextPeriod: nextPeriod.toDateString(),
    menstrualPhase: `${lastPeriod.toDateString()} - ${menstrualPhaseEnd.toDateString()}`,
    follicularPhase: `${follicularPhaseStart.toDateString()} - ${ovulation.toDateString()}`,
    ovulationDate: ovulation.toDateString(),
    lutealPhase: `${lutealPhaseStart.toDateString()} - ${lutealPhaseEnd.toDateString()}`,
    predictedCycleLength,
    predictedFlowIntensity,
    durationConcern,
    flowConcern,
  };
};
