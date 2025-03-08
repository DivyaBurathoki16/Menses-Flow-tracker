import React, { useState } from "react";
import "../CSS/CycleStages.css";

const CycleStageCard = ({ stage }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className={`cycle-card ${isFlipped ? "flipped" : ""}`} onClick={() => setIsFlipped(!isFlipped)}>
      <div className="card-front">
        <img src={stage.image} alt={stage.title} className="stage-image" />
        <h3 className="stage-title">{stage.title}</h3>
      </div>
      <div className="card-back">
        <h3>{stage.title}</h3>
        <p>{stage.description}</p>
      </div>
    </div>
  );
};

export default CycleStageCard;
