import React from "react";
import CycleStageCard from "./CycleStageCard";
import "../CSS/CycleStages.css";

const stages = [
  {
    title: "Menstruation",
    image: "https://source.unsplash.com/500x300/?flower,pink", // Replace with a proper floral image
    description: "This phase starts on the first day of your period and lasts for 3-7 days. The uterus sheds its lining, leading to bleeding."
  },
  {
    title: "Follicular Phase",
    image: "https://source.unsplash.com/500x300/?flower,nature",
    description: "The body prepares to release an egg. Estrogen levels rise, and the uterine lining thickens to support pregnancy."
  },
  {
    title: "Ovulation",
    image: "https://source.unsplash.com/500x300/?flower,blue",
    description: "This phase occurs around day 14. The ovary releases an egg, and it's the most fertile time of the cycle."
  },
  {
    title: "Luteal Phase",
    image: "https://source.unsplash.com/500x300/?flower,red",
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
