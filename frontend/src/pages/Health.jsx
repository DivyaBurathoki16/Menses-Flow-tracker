import React, { useEffect, useState } from "react";
import { useTracker } from "../Context/TrackerContext";
import "./Health.css";

const Health = () => {
  const { cycles } = useTracker();
  const [periodStartDate, setPeriodStartDate] = useState(null);
  const [cycleEndDate, setCycleEndDate] = useState(null);
  const [selectedFlow, setSelectedFlow] = useState("");
  const [selectedCramp, setSelectedCramp] = useState("");
  const [showRecommendation, setShowRecommendation] = useState(true);
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

  // Define cycle phases
  const phases = [
    {
      name: "Menstrual Phase",
      start: periodStartDate,
      end: new Date(periodStartDate.getTime() + 5 * 24 * 60 * 60 * 1000),
      description: "This phase involves shedding the uterine lining.",
    },
    {
      name: "Follicular Phase",
      start: new Date(periodStartDate.getTime() + 5 * 24 * 60 * 60 * 1000),
      end: new Date(periodStartDate.getTime() + 13 * 24 * 60 * 60 * 1000),
    },
    {
      name: "Ovulation",
      start: new Date(periodStartDate.getTime() + 13 * 24 * 60 * 60 * 1000),
      end: new Date(periodStartDate.getTime() + 14 * 24 * 60 * 60 * 1000),
      description: "The mature egg is released.",
    },
    {
      name: "Luteal Phase",
      start: new Date(periodStartDate.getTime() + 14 * 24 * 60 * 60 * 1000),
      end: cycleEndDate,
      description: "Hormonal changes prepare for pregnancy.",
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
    "low-medium": {
      description:
        "For low period flow with moderate cramps, focus on gentle exercises and relaxation techniques to ease discomfort.",
      exercise: [
        "Yoga: Incorporate deeper stretches like Child's Pose and Bridge.",
        "Walking: Moderate-paced walks boost circulation and reduce pain.",
        "Pilates: Core strengthening supports posture and reduces tension.",
      ],
      diet: [
        "Hydration: Increase water intake and try ginger tea.",
        "Anti-inflammatory Foods: Emphasize fruits, vegetables, and omega-3s.",
        "Magnesium Foods: Nuts and seeds can help relax muscles.",
        "Avoid: Processed foods and excessive caffeine.",
      ],
      additional: [
        "Heat Therapy: Use warm compresses to relax muscles.",
        "Meditation: Deep breathing exercises reduce pain and stress.",
      ],
    },
    "low-high": {
      description:
        "When experiencing low flow with high cramps, prioritize comfort, gentle movement, and effective pain management.",
      exercise: [
        "Restorative Yoga: Poses like Legs Up the Wall ease severe cramps.",
        "Light Walking: Short, slow walks keep you moving without strain.",
        "Gentle Stretching: Mild stretches help reduce muscle tension.",
      ],
      diet: [
        "Hydration: Sip warm herbal teas like chamomile or peppermint.",
        "Anti-inflammatory Foods: Berries and leafy greens help reduce inflammation.",
        "Avoid: High sugar, processed foods, caffeine, and salt.",
      ],
      additional: [
        "Warm Baths: A warm bath can relax muscles and reduce pain.",
        "Warm Compresses: Apply heat to the abdomen for relief.",
        "Consult a healthcare provider if pain is severe.",
      ],
    },
    "medium-low": {
      description:
        "With medium period flow and low cramps, a balanced approach with moderate exercise and a nutrient-rich diet can help maintain energy.",
      exercise: [
        "Gentle Yoga: Moderate poses keep the body active without strain.",
        "Walking: Steady-paced walks boost circulation.",
        "Swimming: Light sessions promote movement without pressure.",
      ],
      diet: [
        "Hydration: Maintain adequate water intake.",
        "Balanced Meals: Lean proteins, whole grains, and fruits provide energy.",
        "Anti-inflammatory Foods: Incorporate fish and leafy greens.",
        "Avoid: Excess caffeine.",
      ],
      additional: [
        "Relaxation Techniques: Light stretching and warm compresses help.",
        "Rest: Ensure sufficient downtime to support recovery.",
      ],
    },
    "medium-medium": {
      description:
        "For medium flow with moderate cramps, balancing movement with rest and a healthy diet can help reduce discomfort.",
      exercise: [
        "Yoga: Use gentle flows and restorative poses.",
        "Brisk Walking: A brisk walk boosts circulation without overexertion.",
        "Light Strength Training: Low-impact exercises maintain muscle tone.",
      ],
      diet: [
        "Hydration: Drink plenty of water and herbal teas.",
        "Anti-inflammatory Foods: Focus on omega-3s and fresh produce.",
        "Magnesium Foods: Dark leafy greens help ease cramps.",
        "Avoid: Processed and salty foods.",
      ],
      additional: [
        "Heat Therapy: Warm compresses relieve pain.",
        "Massage: Gentle self-massage relaxes tight muscles.",
      ],
    },
    "medium-high": {
      description:
        "For medium flow with high cramps, balance gentle activity with effective pain management strategies.",
      exercise: [
        "Restorative Yoga: Prioritize relaxation poses that minimize strain.",
        "Slow Walking: Take gentle, short walks as tolerated.",
        "Light Stretching: Incorporate mild stretching routines.",
      ],
      diet: [
        "Hydration: Consume warm fluids and plenty of water.",
        "Anti-inflammatory Diet: Emphasize antioxidant- and omega-3–rich foods.",
        "Light Meals: Opt for easy-to-digest options.",
        "Avoid: Caffeine and refined sugars.",
      ],
      additional: [
        "Warm Baths: Help relax muscles.",
        "Acupressure: Try gentle acupressure for relief.",
        "Seek professional advice if pain persists.",
      ],
    },
    "high-low": {
      description:
        "If you experience high period flow with low cramps, focus on maintaining energy with supportive exercises and a nutrient-rich diet.",
      exercise: [
        "Gentle Yoga: Use poses that boost circulation without strain.",
        "Walking: Steady-paced walks support energy levels.",
        "Swimming: Enjoy light, full-body movement.",
      ],
      diet: [
        "Hydration: Prioritize fluids and maintain electrolyte balance.",
        "Iron-rich Foods: Lean meats, spinach, and similar sources replenish iron.",
        "Balanced Meals: Whole grains and fruits provide sustained energy.",
        "Avoid: Excessive caffeine.",
      ],
      additional: [
        "Rest: Ensure you get sufficient rest and quality sleep.",
        "Warm Compresses: Use for minor discomfort as needed.",
      ],
    },
    "high-medium": {
      description:
        "With high period flow and moderate cramps, gentle, low-impact exercises and a nutrient-dense diet are key.",
      exercise: [
        "Yoga: Engage in gentle sequences focusing on relaxation.",
        "Walking: Moderate-paced walks support circulation and reduce pain.",
        "Pilates: Light core exercises strengthen without strain.",
      ],
      diet: [
        "Hydration: Increase fluid intake, including electrolyte drinks if needed.",
        "Iron-rich Foods: Emphasize iron-rich options to support energy.",
        "Anti-inflammatory Foods: Fill your plate with fruits and veggies.",
        "Avoid: Processed foods and excessive caffeine.",
      ],
      additional: [
        "Warm Baths: Help relax muscles with a warm soak.",
        "Acupressure: Consider gentle acupressure to relieve cramps.",
      ],
    },
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
              Citations: [1] Nationwide Children's, [2] The Womens, [3] Natural Cycles, [4] Healthline, [5] NYP, [6] WebMD, [7] Everyday Health, [8] Medical News Today.
            </p>
          </div>
        )}
      </section>
    </div>
  );
};

export default Health;
