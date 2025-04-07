import { useState } from "react";
import "../CSS/Blood.css";

const bloodColors = [
  {
    colorName: "Bright Red",
    hex: "#ff4d4d",
    cause: "Fresh blood, common during the start of the period.",
    action: "Stay hydrated, rest as needed.",
  },
  {
    colorName: "Dark Red",
    hex: "#990000",
    cause: "Older blood that’s been in the uterus longer.",
    action: "Light exercise or yoga helps circulation.",
  },
  {
    colorName: "Brown or Rusty",
    hex: "#5c4033",
    cause: "Old blood oxidized over time.",
    action: "If mid-cycle or bad odor, consult a doctor.",
  },
  {
    colorName: "Black",
    hex: "#1a1a1a",
    cause: "Blood has taken a long time to exit the uterus.",
    action: "See a doctor if paired with itching, odor, or discharge.",
  },
  {
    colorName: "Pink",
    hex: "#ffb6c1",
    cause: "Blood mixed with cervical fluid.",
    action: "Eat iron-rich foods, check hormone levels if frequent.",
  },
  {
    colorName: "Light Red / Watery",
    hex: "#f08080",
    cause: "Thin blood, may indicate low flow or nutrient deficiency.",
    action: "Eat iron-rich foods, track energy, consider blood tests.",
  },
  {
    colorName: "Purple or Blue-Tinted",
    hex: "#800080",
    cause: "Estrogen dominance or hormonal imbalance.",
    action: "Avoid processed foods, increase fiber, consult a gynecologist.",
  },
  {
    colorName: "Orange",
    hex: "#ff944d",
    cause: "Blood mixed with cervical mucus or infection.",
    action: "If odor or discomfort is present, see a doctor.",
  },
  {
    colorName: "Gray",
    hex: "#a9a9a9",
    cause: "Possible infection like bacterial vaginosis.",
    action: "Immediate medical attention is needed.",
  },
];

const Blood = () => {
  const [selected, setSelected] = useState(null);

  return (
    <div className="blood-grid-container">
      <h1 className="blood-heading">Period Blood Color Guide</h1>
      <div className="blood-grid">
        {bloodColors.map((item, index) => (
          <div
            key={index}
            className="blood-card"
            style={{ background: item.hex }}
            onClick={() => setSelected(item)}
          >
            <div className="card-overlay">
              <h3>{item.colorName}</h3>
            </div>
          </div>
        ))}
      </div>

      {selected && (
        <div className="blood-modal-overlay" onClick={() => setSelected(null)}>
          <div className="blood-modal" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={() => setSelected(null)}>
              ×
            </button>
            <h2 style={{ color: selected.hex }}>{selected.colorName}</h2>
            <p><strong>Cause:</strong> {selected.cause}</p>
            <p><strong>Action:</strong> {selected.action}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Blood;
