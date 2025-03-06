// src/components/MetricsGraph.jsx
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

// Helper functions
const average = (arr) => arr.length ? arr.reduce((a, b) => a + b, 0) / arr.length : 0;

const encodeCategorical = (value, categories) => {
  const index = categories.indexOf(value);
  return index === -1 ? 0 : index / (categories.length - 1);
};

const MetricsGraph = ({ moodData }) => {
  if (!moodData || moodData.length === 0) {
    return <p>No data to display metrics.</p>;
  }
  
  // Numeric fields
  const energyLevels = moodData.map(entry => Number(entry.energyLevel));
  const stressLevels = moodData.map(entry => Number(entry.stressLevel));
  const sleepHours = moodData.map(entry => Number(entry.sleepHours));
  
  // Categorical fields
  const exerciseCategories = ["Yoga", "Walking", "Running", "Stretching", "No Exercise"];
  const socialCategories = ["None", "Minimal (Online/Texting)", "In-person Chat", "Group Hangout"];
  
  const exerciseValues = moodData.map(entry => encodeCategorical(entry.exerciseActivity, exerciseCategories));
  const socialValues = moodData.map(entry => encodeCategorical(entry.socialInteraction, socialCategories));
  
  const avgEnergy = average(energyLevels);
  const avgStress = average(stressLevels);
  const avgSleep = average(sleepHours);
  const avgExercise = average(exerciseValues);
  const avgSocial = average(socialValues);
  
  const data = {
    labels: ['Energy', 'Stress', 'Sleep', 'Exercise', 'Social'],
    datasets: [
      {
        label: 'Average Value',
        data: [avgEnergy, avgStress, avgSleep, avgExercise, avgSocial],
        backgroundColor: [
          'rgba(75, 192, 192, 0.6)',
          'rgba(255, 99, 132, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(153, 102, 255, 0.6)',
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  // 🎯 Responsive Chart Options
  const options = {
    responsive: true,
    maintainAspectRatio: false, // Allows better resizing
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          font: {
            size: 12, // Adjust text size for readability
          },
        },
      },
      x: {
        ticks: {
          font: {
            size: 12, // Adjust text size for readability
          },
        },
      },
    },
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          font: {
            size: 14,
          },
        },
      },
    },
  };

  return (
    <div style={{ height: '300px', width: '100%', marginTop: '20px' }}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default MetricsGraph;
