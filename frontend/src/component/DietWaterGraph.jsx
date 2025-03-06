// src/components/DietWaterGraph.jsx
import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend, Filler);

const DietWaterGraph = ({ moodData }) => {
  if (!moodData || moodData.length === 0) {
    return <p>No data to display diet & water metrics.</p>;
  }

  // --- Diet Graph Data (Line Chart) ---
  const dietCategories = ["Balanced Meal", "Vegetarian", "High Protein", "Junk Food"];
  const dietCounts = dietCategories.map(category =>
    moodData.filter(entry => entry.diet === category).length
  );

  const dietData = {
    labels: dietCategories,
    datasets: [
      {
        label: 'Diet Intake Frequency',
        data: dietCounts,
        fill: false,
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        tension: 0.1,
      }
    ],
  };

  const dietOptions = {
    scales: {
      y: {
        beginAtZero: true,
        ticks: { stepSize: 1 },
      },
    },
  };

  // --- Water Intake Graph Data as Area Chart ---
  const waterCategories = ["0.5 L", "1.0 L", "1.5 L", "2.0 L", "2.5+ L"];
  const waterCounts = waterCategories.map(category =>
    moodData.filter(entry => entry.waterIntake === category).length
  );

  const waterData = {
    labels: waterCategories,
    datasets: [
      {
        label: 'Water Intake Frequency',
        data: waterCounts,
        fill: true, // This makes it an area chart
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: 'rgba(54, 162, 235, 0.3)',
        tension: 0.1,
      }
    ],
  };

  const waterOptions = {
    scales: {
      y: {
        beginAtZero: true,
        ticks: { stepSize: 1 },
      },
    },
  };

  return (
    <div style={{ marginTop: '20px' }}>
      <div style={{ height: '300px', marginBottom: '40px' }}>
        <h4>Diet Intake Comparison</h4>
        <Line data={dietData} options={dietOptions} />
      </div>
      <div style={{ height: '300px' }}>
        <h4>Water Intake Area Chart</h4>
        <Line data={waterData} options={waterOptions} />
      </div>
    </div>
  );
};

export default DietWaterGraph;
