import React, { useEffect, useState, useMemo } from "react";
import { useTracker } from "../Context/TrackerContext";
import { Navigate } from "react-router-dom";
import { Bar, Line } from "react-chartjs-2";
import { MdOutlineCalendarToday, MdMood } from "react-icons/md";
import { FaAppleAlt } from "react-icons/fa";
import { GiWeightLiftingUp, GiStethoscope } from "react-icons/gi";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "./Health.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const recommendations = {
  "low-low": {
    description:
      "For low period flow with low cramps, gentle movement paired with a balanced diet helps maintain energy without overexertion.",
    exercise: [
      "Light Yoga: Try Child’s Pose and Cat-Cow to gently relieve tension.",
      "Leisurely Walking: A slow, steady walk to boost circulation.",
    ],
    diet: [
      "Hydration: Drink plenty of water and soothing herbal teas like chamomile.",
      "Fresh Fruits: Enjoy berries and oranges for vitamins and antioxidants.",
    ],
    additional: [
      "Prioritize a good night’s sleep and incorporate mindfulness practices.",
    ],
  },
  "low-medium": {
    description:
      "For low flow with moderate cramps, focus on calming exercises and anti-inflammatory foods to ease discomfort.",
    exercise: [
      "Restorative Yoga: Poses such as Legs-Up-The-Wall and Reclined Butterfly can help relax your muscles.",
      "Pilates: Light core exercises to maintain strength without strain.",
    ],
    diet: [
      "Herbal Teas: Ginger or turmeric tea for soothing effects.",
      "Leafy Greens: Spinach and kale to boost essential vitamins and minerals.",
    ],
    additional: [
      "Apply a warm compress and practice deep breathing for relaxation.",
    ],
  },
  "low-high": {
    description:
      "For low flow with high cramps, use gentle, mindful movements and targeted nutrition to help alleviate severe discomfort.",
    exercise: [
      "Meditative Yoga: Engage in slow, deliberate poses paired with deep breathing.",
      "Short, Gentle Walks: Maintain light activity without aggravating pain.",
    ],
    diet: [
      "Hydration: Increase water intake with a squeeze of lemon or cucumber.",
      "Anti-inflammatory Foods: Incorporate berries, fatty fish, and walnuts.",
    ],
    additional: [
      "Consider magnesium supplements and consult a healthcare provider if pain persists.",
    ],
  },
  "medium-low": {
    description:
      "For medium flow with low cramps, maintain a consistent routine of moderate exercise and balanced meals.",
    exercise: [
      "Moderate Yoga: Use poses like Warrior and Tree to build strength and stability.",
      "Brisk Walking: A steady pace to keep energy levels up and improve circulation.",
    ],
    diet: [
      "Balanced Meals: Focus on lean proteins, whole grains, and a variety of vegetables.",
      "Fresh Fruits & Veggies: For natural vitamins and antioxidants.",
    ],
    additional: [
      "Keep a consistent daily routine to support overall hormonal balance.",
    ],
  },
  "medium-medium": {
    description:
      "For medium flow with moderate cramps, combine gentle exercise with a nutrient-rich diet to effectively manage symptoms.",
    exercise: [
      "Gentle Yoga: Incorporate Downward Dog and Cobra Pose for muscle relief.",
      "Pilates: Engage in light core-strengthening exercises.",
    ],
    diet: [
      "Whole Grains & Lean Protein: For steady, sustained energy.",
      "Hydration: Maintain consistent water intake throughout the day.",
    ],
    additional: [
      "Integrate stress management techniques like meditation or deep breathing.",
    ],
  },
  "medium-high": {
    description:
      "For medium flow with high cramps, prioritize restorative movements and a soothing, anti-inflammatory diet to ease discomfort.",
    exercise: [
      "Restorative Yoga: Try Reclined Twist and Savasana to reduce muscle tension.",
      "Slow Walking: Only if energy permits, ensuring minimal strain.",
    ],
    diet: [
      "Hydration: Drink warm herbal teas and water frequently.",
      "Anti-inflammatory Diet: Emphasize vegetables, fruits, and omega-3-rich foods.",
    ],
    additional: [
      "Apply warm compresses and allow ample time for rest.",
    ],
  },
  "high-low": {
    description:
      "For high flow with low cramps, focus on replenishing essential nutrients and maintaining a light exercise routine.",
    exercise: [
      "Light Yoga: Gentle stretches like seated forward bend to boost circulation.",
      "Walking: Maintain a relaxed pace to keep active.",
    ],
    diet: [
      "Iron-Rich Foods: Include lean meats, lentils, and dark leafy greens.",
      "Hydration: Consistently drink water and electrolyte-enhanced beverages.",
    ],
    additional: [
      "Ensure ample rest and consider small, frequent meals.",
    ],
  },
  "high-medium": {
    description:
      "For high flow with moderate cramps, balance gentle exercise with a nutrient-dense diet to support energy and ease discomfort.",
    exercise: [
      "Gentle Yoga: Use poses like Forward Bend and Seated Twist for relaxation.",
      "Brisk Walking: To improve circulation without overexerting.",
    ],
    diet: [
      "Fruits, Vegetables, & Lean Protein: For energy and recovery.",
      "Hydration: Stay well-hydrated with water and natural electrolyte drinks.",
    ],
    additional: [
      "Consider magnesium supplements and maintain a stress-relief routine.",
    ],
  },
  "high-high": {
    description:
      "For high flow with high cramps, it’s crucial to prioritize rest, gentle movement, and nutrient replenishment.",
    exercise: [
      "Restorative Yoga: Focus on very gentle poses like Child’s Pose and Savasana.",
      "Minimal Walking: Only if absolutely necessary to avoid strain.",
    ],
    diet: [
      "Hydration: Maintain fluid and electrolyte balance with water and coconut water.",
      "Iron-Rich & Anti-inflammatory Foods: Emphasize whole, unprocessed foods like dark leafy greens, nuts, and fatty fish.",
    ],
    additional: [
      "Apply warm compresses to soothe cramps.",
      "Take frequent breaks and rest as needed.",
      "Seek professional advice if symptoms intensify.",
    ],
  },
};

const NavBar = () => {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="health-navbar">
      <ul>
        <li onClick={() => scrollToSection("cycle-phases")}>
          <MdOutlineCalendarToday size={20} /> Cycle Phases
        </li>
        <li onClick={() => scrollToSection("nutrition-guide")}>
          <FaAppleAlt size={20} /> Nutrition Guide
        </li>
        <li onClick={() => scrollToSection("recommendations")}>
          <GiWeightLiftingUp size={20} /> Exercise & Diet
        </li>
        <li onClick={() => scrollToSection("mood-tracker")}>
          <MdMood size={20} /> Mood Tracker
        </li>
        <li onClick={() => scrollToSection("symptom-tracker")}>
          <GiStethoscope size={20} /> Symptom Tracker
        </li>
      </ul>
    </nav>
  );
};


const Health = () => {
  // Check authentication using token in localStorage
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/login" />;
  }

  const { cycles } = useTracker();
  const [periodStartDate, setPeriodStartDate] = useState(null);
  const [cycleEndDate, setCycleEndDate] = useState(null);
  const [selectedFlow, setSelectedFlow] = useState("");
  const [selectedCramp, setSelectedCramp] = useState("");
  const [showRecommendation, setShowRecommendation] = useState(true);

  // State for symptom tracker
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [loggedSymptoms, setLoggedSymptoms] = useState([]);
  // Initially, graphs are hidden so the button shows "Show Graph"
  const [showGraph, setShowGraph] = useState(false);

  // State for mood tracker
  const moodOptions = ["Happy", "Neutral", "Sad", "Anxious", "Stressed"];
  const [selectedMood, setSelectedMood] = useState("");
  const [loggedMoods, setLoggedMoods] = useState([]);
  const [showMoodGraph, setShowMoodGraph] = useState(false);

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

  useEffect(() => {
    setShowRecommendation(true);
  }, [selectedFlow, selectedCramp]);

  const isLoading = !periodStartDate || !cycleEndDate;

  const formatDate = (date) =>
    date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  // Calculate next period prediction
  const nextPeriodDate = useMemo(
    () =>
      periodStartDate
        ? new Date(
            periodStartDate.getTime() + cycleLength * 24 * 60 * 60 * 1000
          )
        : new Date(),
    [periodStartDate, cycleLength]
  );

  // Define cycle phases with id "cycle-phases"
  const phases = useMemo(
    () => [
      {
        name: "Menstrual Phase",
        start: periodStartDate || new Date(),
        end: periodStartDate
          ? new Date(periodStartDate.getTime() + 5 * 24 * 60 * 60 * 1000)
          : new Date(),
        description:
          "This phase involves shedding the uterine lining. Common symptoms include cramps, fatigue, and bloating. Recommended activities include gentle yoga and staying hydrated.",
      },
      {
        name: "Follicular Phase",
        start: periodStartDate
          ? new Date(periodStartDate.getTime() + 5 * 24 * 60 * 60 * 1000)
          : new Date(),
        end: periodStartDate
          ? new Date(periodStartDate.getTime() + 13 * 24 * 60 * 60 * 1000)
          : new Date(),
        description:
          "Starts on the first day of the period and ends at ovulation. Estrogen rises, energy improves, and the body prepares for ovulation.",
      },
      {
        name: "Ovulation",
        start: periodStartDate
          ? new Date(periodStartDate.getTime() + 13 * 24 * 60 * 60 * 1000)
          : new Date(),
        end: periodStartDate
          ? new Date(periodStartDate.getTime() + 14 * 24 * 60 * 60 * 1000)
          : new Date(),
        description:
          "A mature egg is released. This is the most fertile period. Some women experience a surge in energy and libido.",
      },
      {
        name: "Luteal Phase",
        start: periodStartDate
          ? new Date(periodStartDate.getTime() + 14 * 24 * 60 * 60 * 1000)
          : new Date(),
        end: cycleEndDate || new Date(),
        description:
          "Hormonal changes prepare the body for potential pregnancy. PMS symptoms like mood swings and bloating might occur. Focus on balanced nutrition and stress management.",
      },
    ],
    [periodStartDate, cycleEndDate]
  );

  // Nutrition Guide Content with id "nutrition-guide"
  const nutritionGuide = useMemo(
    () => [
      {
        phase: "Menstrual Phase",
        advice:
          "Focus on iron-rich foods (spinach, lean red meat, legumes) to replenish lost iron, along with vitamin C-rich foods to enhance absorption. Stay hydrated and opt for soothing herbal teas.",
      },
      {
        phase: "Follicular Phase",
        advice:
          "Increase your intake of fresh fruits, vegetables, lean proteins, and whole grains. This phase benefits from foods that boost energy and support hormone balance.",
      },
      {
        phase: "Ovulation",
        advice:
          "Incorporate healthy fats (avocado, nuts), lean proteins, and antioxidant-rich foods to support fertility and overall health.",
      },
      {
        phase: "Luteal Phase",
        advice:
          "Emphasize complex carbohydrates, magnesium-rich foods (leafy greens, nuts), and balanced meals to reduce PMS symptoms and stabilize mood.",
      },
    ],
    []
  );

  // Memoize recommendation based on selectedFlow and selectedCramp with id "recommendations"
  const rec = useMemo(
    () => recommendations[`${selectedFlow}-${selectedCramp}`],
    [selectedFlow, selectedCramp]
  );

  // Symptom Tracker functions and state with id "symptom-tracker"
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

  // Aggregate symptom data for graph
  const aggregatedSymptoms = symptomOptions.reduce((acc, symptom) => {
    acc[symptom] = 0;
    return acc;
  }, {});
  loggedSymptoms.forEach((entry) => {
    entry.symptoms.forEach((symptom) => {
      aggregatedSymptoms[symptom] += 1;
    });
  });
  const chartData = useMemo(
    () => ({
      labels: symptomOptions,
      datasets: [
        {
          label: "Frequency",
          data: symptomOptions.map((symptom) => aggregatedSymptoms[symptom]),
          backgroundColor: "#ff6f61",
        },
      ],
    }),
    [aggregatedSymptoms]
  );

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

  // Mood Tracker functions and state with id "mood-tracker"
  const moodValues = {
    Happy: 5,
    Neutral: 3,
    Sad: 1,
    Anxious: 2,
    Stressed: 0,
  };

  const logMood = () => {
    if (selectedMood) {
      setLoggedMoods([...loggedMoods, { date: new Date(), mood: selectedMood }]);
      setSelectedMood("");
    }
  };

  const deleteLoggedMood = (index) => {
    setLoggedMoods((prev) => prev.filter((_, i) => i !== index));
  };

  const moodChartData = useMemo(
    () => ({
      labels: loggedMoods.map((entry) => formatDate(entry.date)),
      datasets: [
        {
          label: "Mood Rating",
          data: loggedMoods.map((entry) => moodValues[entry.mood]),
          fill: false,
          borderColor: "#d63384",
          backgroundColor: "#d63384",
          tension: 0.2,
        },
      ],
    }),
    [loggedMoods]
  );

  const moodChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Mood Tracker",
      },
    },
  };

  const negativeMoods = ["Sad", "Anxious", "Stressed"];
  const negativeCount = loggedMoods.filter((entry) =>
    negativeMoods.includes(entry.mood)
  ).length;
  const moodSuggestion =
    loggedMoods.length > 0 && negativeCount > loggedMoods.length / 2
      ? "Your recent mood logs suggest you're experiencing more negative emotions. Consider a guided meditation, journaling your feelings, or taking a short walk in nature."
      : "Your mood appears balanced. Keep tracking and consider a brief daily mindfulness exercise to maintain emotional well-being.";

  // Suggestions based on symptoms
  const symptomSuggestions = {
    Bloating: "Try staying hydrated and incorporating fiber-rich foods.",
    Headache: "Reduce caffeine and take breaks to rest your eyes.",
    Fatigue: "Get enough sleep and maintain a balanced diet.",
    Nausea: "Eat small, frequent meals and avoid greasy foods.",
    "Mood Swings": "Practice relaxation techniques like meditation or gentle yoga.",
    Acne: "Keep your skin clean and include anti-inflammatory foods.",
    "Lower Back Pain": "Consider stretching, gentle yoga, and proper posture exercises.",
    "Food Cravings": "Opt for balanced meals and healthy snacks to curb cravings.",
    Dizziness: "Stay hydrated and avoid sudden position changes.",
    Cramps: "Use warm compresses and try light stretching or gentle yoga.",
  };

  const suggestionsList = useMemo(
    () =>
      symptomOptions
        .filter((symptom) => aggregatedSymptoms[symptom] > 0)
        .map((symptom) => `${symptom}: ${symptomSuggestions[symptom]}`),
    [aggregatedSymptoms]
  );

  return (
    <div className="health-container">
      <h1>Health Overview</h1>
      {/* NavBar for in-page navigation */}
      <NavBar />
      {isLoading ? (
        <p>Loading cycle data...</p>
      ) : (
        <>
          {/* Next Period Prediction */}
          <div className="next-period">
            <p>
              Next Period Date Prediction:{" "}
              <strong>{formatDate(nextPeriodDate)}</strong>
            </p>
          </div>

          {/* Cycle Phases Section */}
          <section id="cycle-phases" className="health-section">
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

          {/* Nutrition Guide Section */}
          <section
            id="nutrition-guide"
            className="nutrition-guide health-section"
          >
            <h2>Nutrition Guide</h2>
            <p>
              Understanding your body's nutritional needs during each phase can
              help optimize your energy and overall well-being. Here are some
              guidelines:
            </p>
            <ul className="nutrition-list">
              {nutritionGuide.map((item, index) => (
                <li key={index}>
                  <strong>{item.phase}:</strong> {item.advice}
                </li>
              ))}
            </ul>
          </section>

          {/* Personalized Recommendation Section */}
          <section
            id="recommendations"
            className="recommendation-section health-section"
          >
            <h2>Personalized Exercise & Diet Recommendations</h2>
            <p>Please select your period flow and cramp pain levels:</p>
            <div className="button-group">
              <div className="btn-group">
                <h3>Period Flow:</h3>
                <button
                  className={`option-btn ${
                    selectedFlow === "low" ? "active" : ""
                  }`}
                  onClick={() => setSelectedFlow("low")}
                >
                  Low
                </button>
                <button
                  className={`option-btn ${
                    selectedFlow === "medium" ? "active" : ""
                  }`}
                  onClick={() => setSelectedFlow("medium")}
                >
                  Medium
                </button>
                <button
                  className={`option-btn ${
                    selectedFlow === "high" ? "active" : ""
                  }`}
                  onClick={() => setSelectedFlow("high")}
                >
                  High
                </button>
              </div>
              <div className="btn-group">
                <h3>Cramp Pain:</h3>
                <button
                  className={`option-btn ${
                    selectedCramp === "low" ? "active" : ""
                  }`}
                  onClick={() => setSelectedCramp("low")}
                >
                  Low
                </button>
                <button
                  className={`option-btn ${
                    selectedCramp === "medium" ? "active" : ""
                  }`}
                  onClick={() => setSelectedCramp("medium")}
                >
                  Medium
                </button>
                <button
                  className={`option-btn ${
                    selectedCramp === "high" ? "active" : ""
                  }`}
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
                  Cycles, [4] Healthline, [5] NYP, [6] WebMD, [7] Everyday Health, [8]
                  Medical News Today.
                </p>
              </div>
            )}
          </section>

          {/* Mood Tracker & Mental Wellness Section */}
          <section id="mood-tracker" className="mood-tracker health-section">
            <h2>Mental Wellness & Mood Tracker</h2>
            <p>Select your current mood:</p>
            <div className="mood-buttons">
              {moodOptions.map((mood) => (
                <button
                  key={mood}
                  className={`mood-btn ${selectedMood === mood ? "selected" : ""}`}
                  onClick={() => setSelectedMood(mood)}
                >
                  {mood}
                </button>
              ))}
            </div>
            <button className="log-mood-btn" onClick={logMood}>
              Log Mood
            </button>
            {loggedMoods.length > 0 && (
              <div className="logged-moods">
                <h3>Logged Moods</h3>
                <ul>
                  {loggedMoods.map((entry, index) => (
                    <li key={index}>
                      <strong>{formatDate(entry.date)}:</strong> {entry.mood}
                      <button
                        className="delete-mood-btn"
                        onClick={() => deleteLoggedMood(index)}
                      >
                        Delete
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className="mood-graph-toggle">
              {showMoodGraph ? (
                <button
                  className="toggle-graph-btn"
                  onClick={() => setShowMoodGraph(false)}
                >
                  Close Mood Graph
                </button>
              ) : (
                <button
                  className="toggle-graph-btn"
                  onClick={() => setShowMoodGraph(true)}
                >
                  Show Mood Graph
                </button>
              )}
            </div>
            {showMoodGraph && loggedMoods.length > 0 && (
              <div className="mood-chart">
                <Line data={moodChartData} options={moodChartOptions} />
              </div>
            )}
            {loggedMoods.length > 0 && showMoodGraph && (
              <div className="mood-suggestions">
                <p>
                  {loggedMoods.filter((e) =>
                    ["Sad", "Anxious", "Stressed"].includes(e.mood)
                  ).length > loggedMoods.length / 2
                    ? "Your recent mood logs suggest you're experiencing more negative emotions. Consider a guided meditation, journaling your feelings, or taking a short walk in nature."
                    : "Your mood appears balanced. Keep tracking and consider a brief daily mindfulness exercise to maintain emotional well-being."}
                </p>
              </div>
            )}
          </section>

          {/* Symptom Tracker Section */}
          <section id="symptom-tracker" className="symptom-tracker">
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
                      <strong>{formatDate(entry.date)}:</strong>{" "}
                      {entry.symptoms.join(", ")}
                      <button
                        className="delete-entry-btn"
                        onClick={() => deleteLoggedEntry(index)}
                      >
                        Delete
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className="graph-toggle">
              {showGraph ? (
                <button
                  className="toggle-graph-btn"
                  onClick={() => setShowGraph(false)}
                >
                  Close Graph
                </button>
              ) : (
                <button
                  className="toggle-graph-btn"
                  onClick={() => setShowGraph(true)}
                >
                  Show Graph
                </button>
              )}
            </div>
            {showGraph && loggedSymptoms.length > 0 && (
              <div className="symptom-graph">
                <Bar data={chartData} options={chartOptions} />
              </div>
            )}
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
        </>
      )}
    </div>
  );
};

export default Health;
