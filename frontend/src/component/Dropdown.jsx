import { useState } from "react";
import "../CSS/Dropdown.css"; // Ensure correct CSS import

const Dropdown = () => {
  const topics = [
    { title: "Menstrual Hygiene", details: "Use clean sanitary products and change them regularly." },
    { title: "Hydration & Nutrition", details: "Drink plenty of water and eat iron-rich foods to stay healthy." },
    { title: "Exercise & Yoga", details: "Gentle yoga and light exercise can help reduce cramps and discomfort." },
    { title: "Mental Well-being", details: "Practice mindfulness and manage stress for a smoother cycle." },
    { title: "Tracking Your Cycle", details: "Keep track of your cycle to predict your periods and symptoms." },
    { title: "Irregular Periods", details: "Irregular cycles can indicate hormonal imbalances or health issues." },
  ];

  return (
    <div className="dropdown-container">
      <h2>Period Health & Hygiene</h2>
      <div className="dropdown-list">
        {topics.map((topic, index) => (
          <DropdownItem key={index} title={topic.title} details={topic.details} />
        ))}
      </div>
    </div>
  );
};

const DropdownItem = ({ title, details }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`dropdown-item ${isOpen ? "open" : ""}`}>
      <button onClick={() => setIsOpen(!isOpen)} className="dropdown-button">
        {title} <span>{isOpen ? "▲" : "▼"}</span>
      </button>
      <div className={`dropdown-content ${isOpen ? "visible" : ""}`}>
        <p>{details}</p>
      </div>
    </div>
  );
};

export default Dropdown;
