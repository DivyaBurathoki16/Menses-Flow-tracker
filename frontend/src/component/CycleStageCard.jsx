import React, { useState } from "react";
import "../CSS/CycleStages.css";

const CycleStageCard = ({ stage }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleCardClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className={`cycle-card ${isFlipped ? "flipped" : ""}`} onClick={handleCardClick}>
      {/* 🌺 Front Side */}
      <div className="card-front">
        <img src={stage.image} alt={stage.title} className="stage-image" />
        <h3 className="stage-title">{stage.title}</h3>
      </div>

      {/* 🌼 Back Side */}
      <div className="card-back">
        <h3>{stage.title}</h3>
        <p>{stage.description}</p>
      </div>
    </div>
  );
};

export default CycleStageCard;
