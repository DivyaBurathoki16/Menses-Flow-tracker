// src/components/MoodAnalytics.jsx
import React, { useContext } from 'react';
import MoodGraph from './MoodGraph';
import { MoodTrackerContext } from '../context/MoodTrackerContext';

const MoodAnalytics = () => {
  const { moodData } = useContext(MoodTrackerContext);
  return (
    <div className="mood-analytics">
      <MoodGraph moodData={moodData} />
    </div>
  );
};

export default MoodAnalytics;
