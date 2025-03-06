import React, { useContext } from 'react';
import MetricsGraph from './MatricsGraph';
import DietWaterGraph from './DietWaterGraph';
import MoodAnalytics from './MoodAnalytics';
import { MoodTrackerContext } from '../context/MoodTrackerContext';
import '../CSS/Graph.css'; // Import CSS

const AdvancedAnalytics = () => {
  const { moodData } = useContext(MoodTrackerContext);

  return (
    <div className="advanced-analytics">
      
      <div className="analytics-box">
      <h4>Mood Graph</h4>
        <MoodAnalytics moodData={moodData} />
      </div>

     
      <div className="analytics-box">
      <h4>Combined Metrics</h4>
        <MetricsGraph moodData={moodData} />
      </div>

    
      <div className="analytics-box">
      
        <DietWaterGraph moodData={moodData} />
      </div>
    </div>
  );
};

export default AdvancedAnalytics;
