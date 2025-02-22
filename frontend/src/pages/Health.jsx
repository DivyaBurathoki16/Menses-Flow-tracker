import React, { useState } from 'react';
import './Health.css';

const Health = () => {
  const [selectedColor, setSelectedColor] = useState(null);

  const colorInfo = {
    brightRed: {
      color: '#FF0000',
      meaning: 'Fresh blood from active menstruation. This is typical during the beginning or middle of your period and is considered healthy.',
      when: 'Common at the start of menstruation'
    },
    darkRed: {
      color: '#8B0000',
      meaning: 'Blood that has taken longer to leave the uterus and has oxidized. This is normal and common, especially at the beginning or end of your period.',
      when: 'Usually seen at the start or end of period'
    },
    brown: {
      color: '#8B4513',
      meaning: 'Old blood that has had time to oxidize. This is normal and common at the end of your period or during spotting.',
      when: 'Typically appears at the end of period'
    },
    black: {
      color: '#000000',
      meaning: 'Very old blood that has taken a long time to leave the uterus. Usually normal, but if accompanied by clots or foul odor, consult a doctor.',
      when: 'Can appear at the beginning or end of period'
    },
    pink: {
      color: '#FFB6C1',
      meaning: 'Blood mixed with cervical fluid. Could indicate low estrogen levels. If persistent, consult your healthcare provider.',
      when: 'May indicate light spotting or implantation bleeding'
    },
    orange: {
      color: '#FFA500',
      meaning: 'Blood mixed with cervical fluid or infection. If accompanied by unusual odor or itching, consult a healthcare provider.',
      when: 'May indicate infection if accompanied by other symptoms'
    },
    gray: {
      color: '#808080',
      meaning: 'May indicate an infection or miscarriage. If you see gray blood, consult your healthcare provider immediately.',
      when: 'Unusual color that requires medical attention'
    }
  };

  return (
    <div className="page-container">
      <h1>Health Tracking</h1>
      <div className="period-color-guide">
        <h2>Period Blood Color Guide</h2>
        <p>Click on a color to learn more about what it means</p>
        
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
              />
              <span>{key.replace(/([A-Z])/g, ' $1').toLowerCase()}</span>
            </div>
          ))}
        </div>

        {selectedColor && (
          <div className="color-info">
            <h3>{selectedColor.replace(/([A-Z])/g, ' $1').toLowerCase()}</h3>
            <p><strong>When:</strong> {colorInfo[selectedColor].when}</p>
            <p><strong>What it means:</strong> {colorInfo[selectedColor].meaning}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Health;
