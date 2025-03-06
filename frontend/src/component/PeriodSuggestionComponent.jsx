import React, { useState } from "react";
import { getPeriodSuggestions } from "../utils/periodsuggestion";
import "../CSS/Suggestion.css"; // Import CSS file

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

  const handleCloseSuggestions = () => {
    setSuggestions(null);
    setPeriodIntensity(""); // Reset selected button
    setCrampsLevel(""); // Reset selected button
  };

  return (
    <div className="period-suggestion-container">
      <h2> Exercise Suggestions</h2>
      <form onSubmit={handleSubmit} className="period-form">
        <div>
          <p>Period Intensity:</p>
          <div className="button-group">
            <button
              type="button"
              className={periodIntensity === "Low" ? "selected" : ""}
              onClick={() => setPeriodIntensity("Low")}
            >
              Low
            </button>
            <button
              type="button"
              className={periodIntensity === "Medium" ? "selected" : ""}
              onClick={() => setPeriodIntensity("Medium")}
            >
              Medium
            </button>
            <button
              type="button"
              className={periodIntensity === "High" ? "selected" : ""}
              onClick={() => setPeriodIntensity("High")}
            >
              High
            </button>
          </div>
        </div>
        <div>
          <p>Cramps Level:</p>
          <div className="button-group">
            <button
              type="button"
              className={crampsLevel === "Low" ? "selected" : ""}
              onClick={() => setCrampsLevel("Low")}
            >
              Low
            </button>
            <button
              type="button"
              className={crampsLevel === "Medium" ? "selected" : ""}
              onClick={() => setCrampsLevel("Medium")}
            >
              Medium
            </button>
            <button
              type="button"
              className={crampsLevel === "High" ? "selected" : ""}
              onClick={() => setCrampsLevel("High")}
            >
              High
            </button>
          </div>
        </div>
        <div>
          <button type="submit" className="submit-button">Get Suggestions</button>
        </div>
      </form>

      {suggestions && (
        <div className="suggestions">
          <div className="suggestion-header">
            <h3>Exercise & Diet Suggestions</h3>
            <button className="close-button" onClick={handleCloseSuggestions}>❌</button>
          </div>
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
