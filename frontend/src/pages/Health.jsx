import React, { useEffect, useState } from "react";
import { useTracker } from "../Context/TrackerContext";
import "./Health.css";

const Health = () => {
  const { cycles } = useTracker();
  const [periodStartDate, setPeriodStartDate] = useState(null);
  const [cycleEndDate, setCycleEndDate] = useState(null);
  const cycleLength = 28; // Default cycle length

  useEffect(() => {
    console.log("📌 Fetched Cycles:", cycles); // ✅ Debugging

    if (cycles.length > 0 && cycles[0]?.cycleStartDate) {
      let startDate = new Date(cycles[0].cycleStartDate);
      let endDate = new Date(cycles[0].cycleEndDate);

      if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
        console.error("❌ Invalid Date Format:", cycles[0]);
      } else {
        setPeriodStartDate(startDate);
        setCycleEndDate(endDate);
      }
    }
  }, [cycles]);

  if (!periodStartDate || !cycleEndDate) {
    return <p>Loading cycle data...</p>;
  }

  // ✅ Helper function to format dates
  const formatDate = (date) => date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });

  // ✅ Define cycle phases
  const phases = [
    {
      name: "Menstrual Phase",
      start: periodStartDate,
      end: new Date(periodStartDate.getTime() + 5 * 24 * 60 * 60 * 1000), 
      description: "This phase involves shedding the uterine lining.",
    },
    {
      name: "Follicular Phase",
      start: new Date(periodStartDate.getTime() + 5 * 24 * 60 * 60 * 1000), 
      end: new Date(periodStartDate.getTime() + 13 * 24 * 60 * 60 * 1000), 
    },
    {
      name: "Ovulation",
      start: new Date(periodStartDate.getTime() + 13 * 24 * 60 * 60 * 1000), 
      end: new Date(periodStartDate.getTime() + 14 * 24 * 60 * 60 * 1000), 
      description: "The mature egg is released.",
    },
    {
      name: "Luteal Phase",
      start: new Date(periodStartDate.getTime() + 14 * 24 * 60 * 60 * 1000), 
      end: cycleEndDate, // End of cycle
      description: "Hormonal changes prepare for pregnancy.",
    },
  ];

  return (
    <div className="health-container">
      <h1>Health Overview</h1>

      {/* ✅ Display Cycle Phases */}
      <section className="health-section">
        <h2>Cycle Phases</h2>
        <ul className="phase-list">
          {phases.map((phase, index) => (
            <li key={index}>
              <h3 className="phase-title">{phase.name}</h3>
              <p className="phase-date">
                <strong>From:</strong> {formatDate(phase.start)}{" "}
                <strong>To:</strong> {formatDate(phase.end)}
              </p>
              <p className="phase-description">{phase.description}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default Health;
