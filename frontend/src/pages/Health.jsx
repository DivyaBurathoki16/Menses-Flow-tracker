import React, { useState } from 'react';
import './Health.css';

const Health = () => {
  const [selectedColor, setSelectedColor] = useState(null);

  const colorInfo = {
    brightRed: {
      color: '#FF0000',
      meaning: 'Fresh blood from active menstruation. This is typical during the beginning or middle of your period and is considered healthy.',
      when: 'Common at the start of menstruation',
      icon: '🔴'
    },
    darkRed: {
      color: '#8B0000',
      meaning: 'Blood that has taken longer to leave the uterus and has oxidized. This is normal and common, especially at the beginning or end of your period.',
      when: 'Usually seen at the start or end of period',
      icon: '🔺'
    },
    brown: {
      color: '#8B4513',
      meaning: 'Old blood that has had time to oxidize. This is normal and common at the end of your period or during spotting.',
      when: 'Typically appears at the end of period',
      icon: '🟤'
    },
    black: {
      color: '#000000',
      meaning: 'Very old blood that has taken a long time to leave the uterus. Usually normal, but if accompanied by clots or foul odor, consult a doctor.',
      when: 'Can appear at the beginning or end of period',
      icon: '⚫'
    },
    pink: {
      color: '#FFB6C1',
      meaning: 'Blood mixed with cervical fluid. Could indicate low estrogen levels. If persistent, consult your healthcare provider.',
      when: 'May indicate light spotting or implantation bleeding',
      icon: '💗'
    },
    orange: {
      color: '#FFA500',
      meaning: 'Blood mixed with cervical fluid or infection. If accompanied by unusual odor or itching, consult a healthcare provider.',
      when: 'May indicate infection if accompanied by other symptoms',
      icon: '🟠'
    },
    gray: {
      color: '#808080',
      meaning: 'May indicate an infection or miscarriage. If you see gray blood, consult your healthcare provider immediately.',
      when: 'Unusual color that requires medical attention',
      icon: '⚪'
    }
  };

  const remediesInfo = {
    exercise: {
      title: "Exercise",
      icon: "🏃‍♀️",
      description: "Regular exercise releases endorphins that act as natural painkillers.",
      tips: [
        "Gentle yoga or stretching",
        "Light walking or swimming",
        "Low-impact aerobic exercises",
        "Pelvic exercises"
      ]
    },
    heat: {
      title: "Heat Therapy",
      icon: "🌡️",
      description: "Heat helps relax uterine muscles and improves blood flow.",
      tips: [
        "Use a heating pad on lower abdomen",
        "Take warm baths",
        "Try heat patches for on-the-go relief",
        "Warm compress on lower back"
      ]
    },
    nutrition: {
      title: "Dietary Support",
      icon: "🥗",
      description: "Certain nutrients and supplements can help reduce cramp severity.",
      tips: [
        "Vitamin E supplements",
        "Omega-3 fatty acids",
        "Magnesium-rich foods",
        "Stay hydrated with water"
      ]
    },
    relaxation: {
      title: "Stress Reduction",
      icon: "🧘‍♀️",
      description: "Managing stress can help reduce cramp intensity.",
      tips: [
        "Deep breathing exercises",
        "Meditation",
        "Regular sleep schedule",
        "Gentle massage"
      ]
    }
  };

  return (
    <div className="health-container">
      <div className="blood-color-section">
        <h1>Period Blood Color Guide</h1>
        <p className="guide-description">Click on a color to learn more about what it means for your menstrual health</p>
        
        <div className="color-circles">
          {Object.entries(colorInfo).map(([key, info]) => (
            <div
              key={key}
              className="color-circle-container"
              onClick={() => setSelectedColor(key)}
            >
              <div
                className={`color-circle ${selectedColor === key ? 'selected' : ''}`}
                style={{ backgroundColor: info.color }}
              >
                <span className="color-icon">{info.icon}</span>
              </div>
              <span className="color-label">{key.replace(/([A-Z])/g, ' $1').toLowerCase()}</span>
            </div>
          ))}
        </div>

        {selectedColor && (
          <div className="color-info-modal-overlay" onClick={() => setSelectedColor(null)}>
            <div className="color-info-modal" onClick={e => e.stopPropagation()}>
              <button 
                className="close-button"
                onClick={() => setSelectedColor(null)}
                aria-label="Close"
              >
                ×
              </button>
              <div className="color-info-content">
                <div 
                  className="color-preview"
                  style={{ backgroundColor: colorInfo[selectedColor].color }}
                >
                  <span className="color-icon-large">{colorInfo[selectedColor].icon}</span>
                </div>
                <h2>{selectedColor.replace(/([A-Z])/g, ' $1').toLowerCase()}</h2>
                <div className="info-section">
                  <h3>When it occurs:</h3>
                  <p>{colorInfo[selectedColor].when}</p>
                </div>
                <div className="info-section">
                  <h3>What it means:</h3>
                  <p>{colorInfo[selectedColor].meaning}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="cramps-section">
        <h2>Managing Period Cramps</h2>
        <p className="section-description">
          Explore these effective remedies to help ease menstrual discomfort
        </p>

        <div className="remedies-grid">
          {Object.entries(remediesInfo).map(([key, info]) => (
            <div key={key} className="remedy-card">
              <div className="remedy-icon">{info.icon}</div>
              <h3>{info.title}</h3>
              <p>{info.description}</p>
              <ul className="remedy-tips">
                {info.tips.map((tip, index) => (
                  <li key={index}>{tip}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="additional-tips">
          <h3>Important Tips</h3>
          <ul>
            <li>Avoid alcohol and caffeine during your period</li>
            <li>Stay hydrated to minimize bloating</li>
            <li>Consider over-the-counter pain relievers if needed</li>
            <li>Maintain a regular exercise routine</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Health;
