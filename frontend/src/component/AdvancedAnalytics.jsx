// src/components/AdvancedAnalytics.jsx
import React, { useContext } from 'react';
import MetricsGraph from './MatricsGraph';
import DietWaterGraph from './DietWaterGraph';
import MoodAnalytics from './MoodAnalytics'
import { MoodTrackerContext } from '../context/MoodTrackerContext';

const AdvancedAnalytics = () => {
  const { moodData } = useContext(MoodTrackerContext);
  return (
    <div className="advanced-analytics">
      <h3>Mood Graph</h3>
      <MoodAnalytics moodData={moodData} />
      <h3>Combined Metrics</h3>
      <MetricsGraph moodData={moodData} />
      <h3>Diet & Water Intake</h3>
      <DietWaterGraph moodData={moodData} />
    </div>
  );
};

export default AdvancedAnalytics;
