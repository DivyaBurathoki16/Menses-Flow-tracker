import React from "react";
import { useNavigate } from "react-router-dom";
import "../CSS/BeforeH.css"; 

const MoodHealthHygiene = () => {
  const navigate = useNavigate();

  const handleExplore = () => {
    navigate("/profile"); // Redirect to login/signup or dashboard
  };

  return (
    <div className="why-track-container">
      <div className="header-section">
        <h1>🧠 Embrace Mood, Health & Hygiene</h1>
        <p>Your mind, body, and cleanliness form the foundation of your everyday strength.</p>
      </div>

      <div className="benefits-section">
        <h2>🪷 The Power of Mental Well-being</h2>
        <ul>
          <li>💖 Tracking your mood helps identify emotional triggers and patterns</li>
          <li>🧘‍♀️ Reduces stress, anxiety, and promotes emotional clarity</li>
          <li>📓 Journaling and reflection can foster self-awareness and healing</li>
          <li>🎧 Mindful habits like music, meditation, and self-talk boost resilience</li>
        </ul>
      </div>

      <div className="benefits-section">
        <h2>🥗 Physical Health Matters</h2>
        <ul>
          <li>🍎 Balanced meals nourish hormones and maintain energy levels</li>
          <li>🚶‍♀️ Daily movement, yoga or walking improves mood and reduces cramps</li>
          <li>💧 Hydration supports digestion, skin health, and brain function</li>
          <li>😴 Quality sleep helps regulate mood and menstrual cycles</li>
        </ul>
      </div>

      <div className="awareness-section">
        <h2>🩸 Hygiene & Self-Care During Periods</h2>
        <p>
          Cleanliness is key to staying infection-free and feeling fresh during menstruation. Small habits create big impacts:
        </p>
        <ul>
          <li>🧼 Change pads/tampons every 4-6 hours to prevent rashes and infections</li>
          <li>🛁 Wash intimate areas with mild, unscented soap</li>
          <li>👖 Wear clean, breathable underwear</li>
          <li>💨 Let your skin breathe—avoid damp clothes and tight fits</li>
        </ul>
      </div>

      <div className="cta-section">
        <h3>🌈 Remember, you are not alone.</h3>
        <p>
          Empowering your mind and body begins with tiny steps. Tracking your mood and caring for your health & hygiene can change your life in beautiful ways.
        </p>
        <button className="signup-btn" onClick={handleExplore}>Start Your Wellness Journey</button>
      </div>
    </div>
  );
};

export default MoodHealthHygiene;
