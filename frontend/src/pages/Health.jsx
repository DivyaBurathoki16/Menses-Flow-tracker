import React, { useEffect, useState } from "react";
import { useTracker } from "../Context/TrackerContext";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "./Health.css";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Health = () => {
  const { cycles } = useTracker();
  const [periodStartDate, setPeriodStartDate] = useState(null);
  const [cycleEndDate, setCycleEndDate] = useState(null);
  const [selectedFlow, setSelectedFlow] = useState("");
  const [selectedCramp, setSelectedCramp] = useState("");
  const [showRecommendation, setShowRecommendation] = useState(true);
  
  // State for symptom tracker
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [loggedSymptoms, setLoggedSymptoms] = useState([]);
  const [showGraph, setShowGraph] = useState(true);
  
  const cycleLength = 28; // Default cycle length

  useEffect(() => {
    console.log("📌 Fetched Cycles:", cycles);
    if (cycles.length > 0 && cycles[0]?.cycleStartDate) {
      let startDate = new Date(cycles[0].cycleStartDate);
      let endDate = new Date(cycles[0].cycleEndDate);
      if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
        console.error("❌ Invalid Date Format:", cycles[0]);
      } else {
        setPeriodStartDate(startDate);
        setCycleEndDate(endDate);
      }
    }
  }, [cycles]);

  // Re-show recommendations if user changes the selection
  useEffect(() => {
    setShowRecommendation(true);
  }, [selectedFlow, selectedCramp]);

  if (!periodStartDate || !cycleEndDate) {
    return <p>Loading cycle data...</p>;
  }

  // Helper function to format dates
  const formatDate = (date) =>
    date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  // Define cycle phases with additional details
  const phases = [
    {
      name: "Menstrual Phase",
      start: periodStartDate,
      end: new Date(periodStartDate.getTime() + 5 * 24 * 60 * 60 * 1000),
      description:
        "This phase involves shedding the uterine lining. Common symptoms: cramps, fatigue, and bloating. Recommended activities include gentle yoga and staying hydrated.",
    },
    {
      name: "Follicular Phase",
      start: new Date(periodStartDate.getTime() + 5 * 24 * 60 * 60 * 1000),
      end: new Date(periodStartDate.getTime() + 13 * 24 * 60 * 60 * 1000),
      description:
        "Starts on the first day of the period and ends at ovulation. Estrogen rises, energy improves, and the body prepares for ovulation.",
    },
    {
      name: "Ovulation",
      start: new Date(periodStartDate.getTime() + 13 * 24 * 60 * 60 * 1000),
      end: new Date(periodStartDate.getTime() + 14 * 24 * 60 * 60 * 1000),
      description:
        "A mature egg is released. This is the most fertile period. Some women experience a surge in energy and libido.",
    },
    {
      name: "Luteal Phase",
      start: new Date(periodStartDate.getTime() + 14 * 24 * 60 * 60 * 1000),
      end: cycleEndDate,
      description:
        "Hormonal changes prepare the body for potential pregnancy. PMS symptoms like mood swings and bloating might occur. Focus on balanced nutrition and stress management.",
    },
  ];

  // Recommendations for each combination of period flow and cramp pain levels
  const recommendations = {
    "low-low": {
      description:
        "If you experience low period flow and low cramps, incorporating certain exercises and dietary changes can help manage symptoms and improve overall well-being.",
      exercise: [
        "Yoga: Poses like Cobra, Cat/Cow, and Fish help reduce cramps and improve flexibility [1].",
        "Walking: A low-impact activity that triggers endorphin release [3].",
        "Swimming: Low-impact movement and stretching can reduce tension [3].",
      ],
      diet: [
        "Hydration: Drink plenty of water and herbal teas like chamomile [2][6].",
        "Anti-inflammatory Foods: Salmon and sardines help reduce inflammation [5].",
        "Calcium-rich Foods: Nuts, low-fat dairy, and fish with bones support overall health [2].",
        "Leafy Greens: Spinach and kale provide iron and magnesium [4].",
        "Avoid: Saturated fats, salt, and caffeine [2][6].",
      ],
      additional: [
        "Warm Compresses: Relax uterine muscles and improve blood flow [5].",
        "Massage & Acupressure: Help alleviate cramps [7].",
      ],
    },
    // ... (other recommendation combinations remain unchanged)
    "high-high": {
      description:
        "For high period flow with high cramps, prioritize gentle movement, proper nutrition, and ample rest. Monitor your symptoms and consult a healthcare provider if necessary.",
      exercise: [
        "Restorative Yoga: Focus on very gentle, restorative poses.",
        "Slow Walking: Only move as tolerated.",
        "Light Stretching: Gentle stretching relieves muscle tension.",
      ],
      diet: [
        "Hydration: Prioritize fluids and electrolyte balance.",
        "Iron-rich Foods: Ensure adequate iron intake for heavy flow.",
        "Anti-inflammatory Diet: Emphasize whole, unprocessed foods.",
        "Avoid: High-sugar, high-salt foods.",
      ],
      additional: [
        "Warm Compresses: Apply heat to soothe severe cramps.",
        "Rest & Recovery: Allow ample recovery time.",
        "Professional Advice: Seek medical help if symptoms worsen.",
      ],
    },
  };

  const recommendationKey = `${selectedFlow}-${selectedCramp}`;
  const rec = recommendations[recommendationKey];

  // Symptom Tracker functions and state
  const symptomOptions = [
    "Bloating",
    "Headache",
    "Fatigue",
    "Nausea",
    "Mood Swings",
    "Acne",
    "Lower Back Pain",
    "Food Cravings",
    "Dizziness",
    "Cramps",
  ];

  const toggleSymptom = (symptom) => {
    setSelectedSymptoms((prev) =>
      prev.includes(symptom)
        ? prev.filter((s) => s !== symptom)
        : [...prev, symptom]
    );
  };

  const logSymptoms = () => {
    if (selectedSymptoms.length > 0) {
      setLoggedSymptoms([
        ...loggedSymptoms,
        { date: new Date(), symptoms: selectedSymptoms },
      ]);
      setSelectedSymptoms([]);
    }
  };

  const deleteLoggedEntry = (index) => {
    setLoggedSymptoms((prev) => prev.filter((_, i) => i !== index));
  };

  // Aggregate symptom data for graph (counts per symptom)
  const aggregatedSymptoms = symptomOptions.reduce((acc, symptom) => {
    acc[symptom] = 0;
    return acc;
  }, {});
  loggedSymptoms.forEach((entry) => {
    entry.symptoms.forEach((symptom) => {
      aggregatedSymptoms[symptom] += 1;
    });
  });
  const chartData = {
    labels: symptomOptions,
    datasets: [
      {
        label: "Frequency",
        data: symptomOptions.map((symptom) => aggregatedSymptoms[symptom]),
        backgroundColor: "#ff6f61",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Logged Symptoms Frequency",
      },
    },
  };

  // Suggestions based on symptoms (mapping each symptom to advice)
  const symptomSuggestions = {
    Bloating: "Try staying hydrated and incorporating fiber-rich foods.",
    Headache: "Reduce caffeine and ensure you take breaks to rest your eyes.",
    Fatigue: "Make sure to get enough sleep and consider a balanced diet.",
    Nausea: "Eat small, frequent meals and avoid heavy, greasy foods.",
    "Mood Swings": "Practice relaxation techniques like meditation or gentle yoga.",
    Acne: "Keep your skin clean and include anti-inflammatory foods in your diet.",
    "Lower Back Pain": "Consider stretching, gentle yoga, and proper posture exercises.",
    "Food Cravings": "Opt for balanced meals and healthy snacks to keep cravings in check.",
    Dizziness: "Stay hydrated and avoid rapid position changes.",
    Cramps: "Use warm compresses and consider light stretching or gentle yoga.",
  };

  // Compute suggestions for all symptoms that have been logged (if count > 0)
  const suggestionsList = symptomOptions
    .filter((symptom) => aggregatedSymptoms[symptom] > 0)
    .map((symptom) => `${symptom}: ${symptomSuggestions[symptom]}`);

  return (
    <div className="health-container">
      <h1>Health Overview</h1>

      {/* Cycle Phases Section */}
      <section className="health-section">
        <h2>Cycle Phases</h2>
        <ul className="phase-list">
          {phases.map((phase, index) => (
            <li key={index}>
              <h3 className="phase-title">{phase.name}</h3>
              <p className="phase-date">
                <strong>From:</strong> {formatDate(phase.start)}{" "}
                <strong>To:</strong> {formatDate(phase.end)}
              </p>
              {phase.description && (
                <p className="phase-description">{phase.description}</p>
              )}
            </li>
          ))}
        </ul>
      </section>

      {/* Personalized Recommendation Section */}
      <section className="recommendation-section">
        <h2>Personalized Exercise & Diet Recommendations</h2>
        <p>Please select your period flow and cramp pain levels:</p>
        <div className="button-group">
          <div className="btn-group">
            <h3>Period Flow:</h3>
            <button
              className={`option-btn ${selectedFlow === "low" ? "active" : ""}`}
              onClick={() => setSelectedFlow("low")}
            >
              Low
            </button>
            <button
              className={`option-btn ${selectedFlow === "medium" ? "active" : ""}`}
              onClick={() => setSelectedFlow("medium")}
            >
              Medium
            </button>
            <button
              className={`option-btn ${selectedFlow === "high" ? "active" : ""}`}
              onClick={() => setSelectedFlow("high")}
            >
              High
            </button>
          </div>
          <div className="btn-group">
            <h3>Cramp Pain:</h3>
            <button
              className={`option-btn ${selectedCramp === "low" ? "active" : ""}`}
              onClick={() => setSelectedCramp("low")}
            >
              Low
            </button>
            <button
              className={`option-btn ${selectedCramp === "medium" ? "active" : ""}`}
              onClick={() => setSelectedCramp("medium")}
            >
              Medium
            </button>
            <button
              className={`option-btn ${selectedCramp === "high" ? "active" : ""}`}
              onClick={() => setSelectedCramp("high")}
            >
              High
            </button>
          </div>
        </div>

        {selectedFlow && selectedCramp && rec && showRecommendation && (
          <div className="recommendation-result">
            <button
              className="close-btn"
              onClick={() => {
                setShowRecommendation(false);
                setSelectedFlow("");
                setSelectedCramp("");
              }}
            >
              ✕
            </button>
            <h3>Recommendations</h3>
            <p>{rec.description}</p>
            <div className="recommendation-details">
              <h4>Exercise</h4>
              <ul>
                {rec.exercise.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
              <h4>Diet</h4>
              <ul>
                {rec.diet.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
              <h4>Additional Tips</h4>
              <ul>
                {rec.additional.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
            <p className="citations">
              Citations: [1] Nationwide Children's, [2] The Womens, [3] Natural
              Cycles, [4] Healthline, [5] NYP, [6] WebMD, [7] Everyday Health, [8] Medical News Today.
            </p>
          </div>
        )}
      </section>

      {/* Symptom Tracker Section */}
      <section className="symptom-tracker">
        <h2>Symptom Tracker</h2>
        <p>Select your symptoms for today:</p>
        <div className="symptom-buttons">
          {symptomOptions.map((symptom) => (
            <button
              key={symptom}
              className={`symptom-btn ${
                selectedSymptoms.includes(symptom) ? "selected" : ""
              }`}
              onClick={() => toggleSymptom(symptom)}
            >
              {symptom}
            </button>
          ))}
        </div>
        <button className="log-symptom-btn" onClick={logSymptoms}>
          Log Symptoms
        </button>

        {loggedSymptoms.length > 0 && (
          <div className="logged-symptoms">
            <h3>Logged Symptoms</h3>
            <ul>
              {loggedSymptoms.map((entry, index) => (
                <li key={index}>
                  <strong>{formatDate(entry.date)}:</strong> {entry.symptoms.join(", ")}
                  <button className="delete-entry-btn" onClick={() => deleteLoggedEntry(index)}>Delete</button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Graph Section */}
        <div className="graph-toggle">
          {showGraph ? (
            <button className="toggle-graph-btn" onClick={() => setShowGraph(false)}>
              Close Graph
            </button>
          ) : (
            <button className="toggle-graph-btn" onClick={() => setShowGraph(true)}>
              Show Graph
            </button>
          )}
        </div>
        {showGraph && loggedSymptoms.length > 0 && (
          <div className="symptom-graph">
            <Bar data={chartData} options={chartOptions} />
          </div>
        )}

        {/* Suggestions Section */}
        {suggestionsList.length > 0 && (
          <div className="symptom-suggestions">
            <h3>Suggestions Based on Your Symptoms</h3>
            <ul>
              {suggestionsList.map((suggestion, index) => (
                <li key={index}>{suggestion}</li>
              ))}
            </ul>
          </div>
        )}
      </section>
    </div>
  );
};

export default Health;
