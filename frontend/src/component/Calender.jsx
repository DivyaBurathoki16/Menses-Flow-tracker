import React, { useContext, useEffect, useState } from "react";
import { PeriodTrackerContext } from "../context/PeriodTrackerContext";
import "../CSS/Calendar.css";

const Calendar = () => {
  const { trackerData } = useContext(PeriodTrackerContext);
  const [markedDates, setMarkedDates] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  // Get days in selected month
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  
  // Adjust for Sunday as 0 in JS
  const startDay = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

  useEffect(() => {
    if (trackerData.length > 0) {
      let periodDates = [];

      trackerData.forEach(entry => {
        const entryDate = new Date(entry.lastPeriodDate);
        const entryMonth = entryDate.getMonth();
        const entryYear = entryDate.getFullYear();
        const lastPeriodDay = entryDate.getDate();
        const periodDuration = entry.periodDuration;

        // Only add markings if the logged period is in the selected month/year
        if (entryMonth === currentMonth && entryYear === currentYear) {
          periodDates = periodDates.concat(
            Array.from({ length: periodDuration }, (_, i) => lastPeriodDay + i)
          );
        }
      });

      setMarkedDates(periodDates);
    }
  }, [trackerData, currentMonth, currentYear]);

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  return (
    <div className="calendar-container">
      <h2 className="calendar-title">Menstrual Calendar</h2>

      {/* Month Navigation */}
      <div className="calendar-header">
        <button onClick={handlePrevMonth}>&lt;</button>
        <h3>
          {new Date(currentYear, currentMonth).toLocaleString("default", {
            month: "long",
            year: "numeric",
          })}
        </h3>
        <button onClick={handleNextMonth}>&gt;</button>
      </div>

      <div className="calendar">
        <div className="weekdays">
          {["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"].map((day, index) => (
            <div key={index} className="weekday">{day}</div>
          ))}
        </div>

        <div className="days">
          {Array.from({ length: startDay }).map((_, index) => (
            <div key={`empty-${index}`} className="empty-day"></div>
          ))}
          {Array.from({ length: daysInMonth }, (_, i) => {
            const date = i + 1;
            const isPeriodDate = markedDates.includes(date);

            return (
              <div key={date} className={`day ${isPeriodDate ? "marked" : ""}`}>
                {isPeriodDate && <span className="dot"></span>}
                {date}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
