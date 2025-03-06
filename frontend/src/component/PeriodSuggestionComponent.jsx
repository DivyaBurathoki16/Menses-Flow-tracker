// src/components/PeriodSuggestionComponent.jsx
import React, { useState } from "react";
import { getPeriodSuggestions } from "../utils/periodsuggestion";

const PeriodSuggestionComponent = () => {
  const [periodIntensity, setPeriodIntensity] = useState("");
  const [crampsLevel, setCrampsLevel] = useState("");
  const [suggestions, setSuggestions] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!periodIntensity || !crampsLevel) {
      alert("Please select both period intensity and cramps level!");
      return;
    }
    const result = getPeriodSuggestions(periodIntensity, crampsLevel);
    setSuggestions(result);
  };

  return (
    <div>
      <h2>Period & Cramps Suggestions</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <p>Period Intensity:</p>
          <button type="button" onClick={() => setPeriodIntensity("Low")}>
            Low
          </button>
          <button type="button" onClick={() => setPeriodIntensity("Medium")}>
            Medium
          </button>
          <button type="button" onClick={() => setPeriodIntensity("High")}>
            High
          </button>
        </div>
        <div>
          <p>Cramps Level:</p>
          <button type="button" onClick={() => setCrampsLevel("Low")}>
            Low
          </button>
          <button type="button" onClick={() => setCrampsLevel("Medium")}>
            Medium
          </button>
          <button type="button" onClick={() => setCrampsLevel("High")}>
            High
          </button>
        </div>
        <div>
          <button type="submit">Get Suggestions</button>
        </div>
      </form>

      {suggestions && (
        <div>
          <h3>Exercise Recommendation:</h3>
          <p>{suggestions.exerciseSuggestion}</p>
          <h3>Diet Recommendation:</h3>
          <p>{suggestions.dietSuggestion}</p>
        </div>
      )}
    </div>
  );
};

export default PeriodSuggestionComponent;
