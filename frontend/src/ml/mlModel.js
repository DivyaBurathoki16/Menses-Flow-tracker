import * as tf from "@tensorflow/tfjs";

// Function to train a model for predicting period cycle and flow intensity
export const trainCycleModel = async (historicalData) => {
  if (historicalData.length < 3) {
    console.warn("Not enough data to train the model.");
    return null;
  }

  // Prepare input data: [cycle length in days, flow intensity]
  const inputs = historicalData.map((entry, index) => {
    if (index === 0) return null;
    return [
      (new Date(entry.lastPeriodDate) - new Date(historicalData[index - 1].lastPeriodDate)) / (1000 * 60 * 60 * 24),
      entry.flowIntensity || 1,
    ];
  }).filter(entry => entry !== null);

  // Labels: shifted forward to predict next [cycle length, flow intensity]
  const labels = inputs.slice(1);
  const xs = tf.tensor2d(inputs.slice(0, -1));
  const ys = tf.tensor2d(labels);

  // Define the model
  const model = tf.sequential();
  model.add(tf.layers.dense({ units: 16, activation: "relu", inputShape: [2] }));
  model.add(tf.layers.dense({ units: 8, activation: "relu" }));
  model.add(tf.layers.dense({ units: 2 })); // Predict cycle length and flow intensity

  model.compile({ optimizer: "adam", loss: "meanSquaredError" });

  await model.fit(xs, ys, { epochs: 150 });

  return model;
};

// Function to predict next cycle details
export const predictNextCycle = async (
  model,
  lastPeriodDate,
  lastCycleLength,
  lastFlowIntensity,
  periodDuration
) => {
  if (!model) return null;

  const inputTensor = tf.tensor2d([[lastCycleLength, lastFlowIntensity]]);
  const prediction = await model.predict(inputTensor).data();

  const predictedCycleLength = Math.round(prediction[0]) || 28;
  const predictedFlowIntensity = Math.round(prediction[1]) || 2;

  const lastPeriod = new Date(lastPeriodDate);
  if (isNaN(lastPeriod.getTime())) {
    return {
      error: "Invalid lastPeriodDate",
    };
  }

  const nextPeriod = new Date(lastPeriod);
  nextPeriod.setDate(lastPeriod.getDate() + predictedCycleLength);

  const menstrualStart = new Date(lastPeriod);
  const menstrualEnd = new Date(menstrualStart);
  menstrualEnd.setDate(menstrualStart.getDate() + periodDuration - 1);

  const ovulation = new Date(lastPeriod);
  ovulation.setDate(lastPeriod.getDate() + 14);

  const follicularStart = new Date(menstrualEnd);
  follicularStart.setDate(menstrualEnd.getDate() + 1);
  const follicularEnd = new Date(ovulation);
  follicularEnd.setDate(ovulation.getDate() - 1);

  const lutealStart = new Date(ovulation);
  const lutealEnd = new Date(nextPeriod);
  lutealEnd.setDate(nextPeriod.getDate() - 1);

  // Concerns
  let durationConcern = "";
  if (periodDuration < 5) {
    durationConcern = "Your period is shorter than usual. If this continues, consult a doctor.";
  } else if (periodDuration > 7) {
    durationConcern = "Your period is lasting longer than normal. Consider seeing a doctor.";
  } else {
    durationConcern = "Your period duration is within the normal range (5-7 days).";
  }

  let flowConcern = "";
  if (predictedFlowIntensity >= 4) {
    flowConcern = "Your predicted flow intensity is high. Stay hydrated and monitor for heavy bleeding.";
  } else if (predictedFlowIntensity === 3) {
    flowConcern = "Your predicted flow intensity is moderate. Maintain your usual menstrual care.";
  } else {
    flowConcern = "Your predicted flow intensity is low. Ensure you're tracking any irregularities.";
  }

  const formatDate = (date) =>
    !(date instanceof Date) || isNaN(date.getTime()) ? "Invalid Date" : date.toDateString();

  return {
    nextPeriod: formatDate(nextPeriod),
    menstrualPhase: `${formatDate(menstrualStart)} - ${formatDate(menstrualEnd)}`,
    follicularPhase: `${formatDate(follicularStart)} - ${formatDate(follicularEnd)}`,
    ovulationDate: formatDate(ovulation),
    lutealPhase: `${formatDate(lutealStart)} - ${formatDate(lutealEnd)}`,
    predictedCycleLength,
    predictedFlowIntensity,
    durationConcern,
    flowConcern,
  };
};
