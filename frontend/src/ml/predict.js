import * as tf from '@tensorflow/tfjs';
import { prepareTrainingData } from './moodModel';

export const predictMood = async (newEntry) => {
  try {
    const model = await tf.loadLayersModel('localstorage://mood-model');
    
    const { inputs } = prepareTrainingData([newEntry]);
    const inputTensor = tf.tensor2d(inputs);

    const prediction = model.predict(inputTensor);
    const predictedIndex = prediction.argMax(1).dataSync()[0];

    const moods = ["Happy", "Sad", "Stressed", "Relaxed", "Angry"];
    return moods[predictedIndex];
  } catch (error) {
    console.error("Error loading or predicting with the model:", error);
    return null;
  }
};
