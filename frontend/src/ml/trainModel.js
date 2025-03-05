import * as tf from '@tensorflow/tfjs';
import { createMoodModel, prepareTrainingData } from './moodModel';

export const trainMoodModel = async (moodData) => {
  if (moodData.length < 7) {
    console.warn("Not enough data to train the model. Minimum 7 entries required.");
    return;
  }

  const { inputs, labels } = prepareTrainingData(moodData);

  const xs = tf.tensor2d(inputs);
  const ys = tf.tensor2d(labels);

  const model = createMoodModel();

  console.log("Training the mood model...");
  await model.fit(xs, ys, {
    epochs: 50,
    batchSize: 4,
    shuffle: true,
  });

  await model.save('localstorage://mood-model');
  console.log("Model trained and saved successfully!");
};
