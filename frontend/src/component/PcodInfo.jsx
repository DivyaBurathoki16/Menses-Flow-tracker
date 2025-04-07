import React from 'react';
import '../CSS/PCOSD.css';

const PCOSPCODInfo = () => {
  return (
    <div className="pcos-container">
      <h1>PCOS vs PCOD: What You Should Know</h1>

      <section className="info-section">
        <h2>🔹 Introduction</h2>
        <p>Polycystic Ovary Syndrome (PCOS) and Polycystic Ovarian Disease (PCOD) are hormonal disorders affecting millions of women. Though similar, they differ in severity, causes, and treatments.</p>
      </section>

      <section className="comparison-chart">
        <h2>🔸 PCOS vs PCOD - Comparison</h2>
        <table>
          <thead>
            <tr><th>Feature</th><th>PCOS</th><th>PCOD</th></tr>
          </thead>
          <tbody>
            <tr><td>Definition</td><td>Endocrine disorder</td><td>Ovarian disorder</td></tr>
            <tr><td>Severity</td><td>More severe</td><td>Milder</td></tr>
            <tr><td>Fertility</td><td>May lead to infertility</td><td>Rarely causes infertility</td></tr>
            <tr><td>Hormonal Imbalance</td><td>Significant</td><td>Mild</td></tr>
          </tbody>
        </table>
      </section>

      <section className="tips-section">
        <h2>💡 Lifestyle Tips</h2>
        <ul>
          <li>Adopt a balanced diet rich in fiber and protein.</li>
          <li>Exercise regularly: yoga, walking, strength training.</li>
          <li>Manage stress with mindfulness and breathing techniques.</li>
          <li>Regular medical checkups and hormone level tests.</li>
        </ul>
      </section>
    </div>
  );
};

export default PCOSPCODInfo;
