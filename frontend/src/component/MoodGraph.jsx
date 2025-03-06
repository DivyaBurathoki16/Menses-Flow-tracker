// src/components/MoodGraph.jsx
import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const MoodGraph = ({ moodData }) => {
  const moods = ["Happy", "Sad", "Stressed", "Relaxed", "Angry"];
  // Count how many times each mood appears
  const counts = moods.map(mood => moodData.filter(entry => entry.mood === mood).length);

  const data = {
    labels: moods,
    datasets: [
      {
        label: 'Mood Frequency',
        data: counts,
        backgroundColor: [
          'rgba(75, 192, 192, 0.5)',
          'rgba(255, 99, 132, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(153, 102, 255, 0.5)'
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(153, 102, 255, 1)'
        ],
        borderWidth: 1,
      }
    ],
  };

  return (
    <div style={{ height: '300px', marginTop: '20px' }}>
      <Pie data={data} />
    </div>
  );
};

export default MoodGraph;
