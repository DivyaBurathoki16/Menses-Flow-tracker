import React from "react";
import CycleStageCard from "./CycleStageCard";
import "../CSS/CycleStages.css";


const stages = [
  {
    title: "Menstruation",
    image: "/M.jpeg",
    description: "This phase starts on the first day of your period and lasts for 3-7 days. The uterus sheds its lining, leading to bleeding."
  },
  {
    title: "Follicular Phase",
    image: "/F.jpeg",
    description: "The body prepares to release an egg. Estrogen levels rise, and the uterine lining thickens to support pregnancy."
  },
  {
    title: "Ovulation",
    image: "O.jpeg",
    description: "This phase occurs around day 14. The ovary releases an egg, and it's the most fertile time of the cycle."
  },
  {
    title: "Luteal Phase",
    image: "L.jpeg",
    description: "If fertilization doesn't occur, progesterone levels drop, and the uterine lining prepares to shed again."
  }
];

const CycleStages = () => {
  return (
    <div className="cycle-stages-container">
      {stages.map((stage, index) => (
        <CycleStageCard key={index} stage={stage} />
      ))}
    </div>
  );
};

export default CycleStages;
