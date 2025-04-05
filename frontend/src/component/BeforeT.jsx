import React from "react";
import { useNavigate } from "react-router-dom";
import "../CSS/BeforeT.css";

const WhyTrackPeriod = () => {
  const navigate = useNavigate();

  const handleSignUp = () => {
    navigate("/profile"); // adjust path if needed
  };

  return (
    <div className="why-track-container">
      <div className="header-section">
        <h1>🌸 Empower Yourself Through Cycle Tracking</h1>
        <p>Understanding your body is the first step to caring for it.</p>
      </div>

      <div className="benefits-section">
        <h2>✨ Benefits of Tracking Your Period</h2>
        <ul>
          <li>📅 Predict upcoming periods, ovulation & fertile windows</li>
          <li>🩺 Monitor cycle regularity & detect abnormalities</li>
          <li>🧘‍♀️ Receive personalized wellness, exercise & nutrition tips</li>
          <li>🧠 Track mood, flow, and symptoms to understand your health better</li>
          <li>📖 Keep a record for medical consultations</li>
        </ul>
      </div>

      <div className="awareness-section">
        <h2>⚠️ PCOD & PCOS Awareness</h2>
        <p>
          Polycystic Ovarian Disease (PCOD) and Polycystic Ovary Syndrome (PCOS)
          are common hormonal disorders affecting millions of women.
        </p>
        <ul>
          <li>❗ Irregular periods may be an early symptom</li>
          <li>🍽️ Lifestyle changes, stress management, and regular tracking can help manage it</li>
          <li>🩺 Early detection is key to preventing long-term complications</li>
        </ul>
        <p>
          Tracking your cycle can be your first defense in spotting these conditions early and taking control of your reproductive health.
        </p>
      </div>

      <div className="cta-section">
        <p><strong>Log in</strong> or <strong>Sign up</strong> to begin your wellness journey. Your body deserves attention and love.</p>
        <button className="login-btn" onClick={handleSignUp}>Login</button>
      </div>
    </div>
  );
};

export default WhyTrackPeriod;
