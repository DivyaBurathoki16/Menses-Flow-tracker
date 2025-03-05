import * as tf from '@tensorflow/tfjs';

// Encode categorical values into numbers (simplified approach)
const encodeCategorical = (value, categories) => {
  return categories.indexOf(value) / (categories.length - 1);
};

// Define the model
const createMoodModel = () => {
  const model = tf.sequential();
  
  // Input layer: Expecting 7 numerical inputs
  model.add(tf.layers.dense({ inputShape: [7], units: 16, activation: 'relu' }));
  
  // Hidden layer
  model.add(tf.layers.dense({ units: 12, activation: 'relu' }));
  
  // Output layer: 5 possible moods
  model.add(tf.layers.dense({ units: 5, activation: 'softmax' }));

  model.compile({
    optimizer: 'adam',
    loss: 'categoricalCrossentropy',
    metrics: ['accuracy'],
  });

  return model;
};

// Function to prepare data for training
const prepareTrainingData = (data) => {
  const moods = ["Happy", "Sad", "Stressed", "Relaxed", "Angry"];
  const exercises = ["Yoga", "Walking", "Running", "Stretching", "No Exercise"];
  const diets = ["Balanced Meal", "Vegetarian", "High Protein", "Junk Food"];
  const waterLevels = ["0.5 L", "1.0 L", "1.5 L", "2.0 L", "2.5+ L"];
  const socialLevels = ["None", "Minimal (Online/Texting)", "In-person Chat", "Group Hangout"];

  const inputs = data.map(entry => [
    Number(entry.energyLevel) / 10, // Normalize (0-1)
    Number(entry.stressLevel) / 10, // Normalize (0-1)
    Number(entry.sleepHours) / 12, // Normalize (0-1)
    encodeCategorical(entry.exerciseActivity, exercises),
    encodeCategorical(entry.diet, diets),
    encodeCategorical(entry.waterIntake, waterLevels),
    encodeCategorical(entry.socialInteraction, socialLevels)
  ]);

  const labels = data.map(entry => {
    const labelArray = new Array(5).fill(0);
    labelArray[moods.indexOf(entry.mood)] = 1; // One-hot encoding
    return labelArray;
  });

  return { inputs, labels };
};

export { createMoodModel, prepareTrainingData };
