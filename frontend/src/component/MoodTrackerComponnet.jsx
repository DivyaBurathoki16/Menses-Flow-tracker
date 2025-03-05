import { useState, useContext } from "react";
import { MoodTrackerContext } from "../context/MoodTrackerContext";

const MoodTrackerComponent = () => {
  const { moodData, addMoodEntry, deleteMoodEntry } = useContext(MoodTrackerContext);

  const [formData, setFormData] = useState({
    mood: "",
    energyLevel: "",
    stressLevel: "",
    sleepHours: "",
    exerciseActivity: "",
    diet: "",
    waterIntake: "",
    socialInteraction: "",
    journalEntry: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { mood, energyLevel, stressLevel, sleepHours, exerciseActivity, diet, waterIntake, socialInteraction } = formData;

    if (!mood || !energyLevel || !stressLevel || !sleepHours || !exerciseActivity || !diet || !waterIntake || !socialInteraction) {
      alert("Please fill all required fields!");
      return;
    }

    addMoodEntry({
      ...formData,
      energyLevel: Number(formData.energyLevel),
      stressLevel: Number(formData.stressLevel),
      sleepHours: Number(formData.sleepHours)
    });

    setFormData({
      mood: "",
      energyLevel: "",
      stressLevel: "",
      sleepHours: "",
      exerciseActivity: "",
      diet: "",
      waterIntake: "",
      socialInteraction: "",
      journalEntry: ""
    });
  };

  return (
    <div className="mood-tracker">
      <h2>🧘 Mood & Wellness Tracker</h2>

      <form onSubmit={handleSubmit}>
        <label>Mood:</label>
        <select name="mood" value={formData.mood} onChange={handleChange} required>
          <option value="">Select</option>
          <option value="Happy">😊 Happy</option>
          <option value="Sad">😢 Sad</option>
          <option value="Stressed">😰 Stressed</option>
          <option value="Relaxed">😌 Relaxed</option>
          <option value="Angry">😡 Angry</option>
        </select>

        <label>Energy Level (1-10):</label>
        <input type="number" name="energyLevel" value={formData.energyLevel} onChange={handleChange} min="1" max="10" required />

        <label>Stress Level (1-10):</label>
        <input type="number" name="stressLevel" value={formData.stressLevel} onChange={handleChange} min="1" max="10" required />

        <label>Sleep Hours:</label>
        <input type="number" name="sleepHours" value={formData.sleepHours} onChange={handleChange} min="0" max="12" required />

        <label>Exercise Activity:</label>
        <select name="exerciseActivity" value={formData.exerciseActivity} onChange={handleChange} required>
          <option value="">Select</option>
          <option value="Yoga">🧘 Yoga</option>
          <option value="Walking">🚶 Walking</option>
          <option value="Running">🏃 Running</option>
          <option value="Stretching">🤸 Stretching</option>
          <option value="No Exercise">🚫 No Exercise</option>
        </select>

        <label>Diet:</label>
        <select name="diet" value={formData.diet} onChange={handleChange} required>
          <option value="">Select</option>
          <option value="Balanced Meal">🥗 Balanced Meal</option>
          <option value="Vegetarian">🥦 Vegetarian</option>
          <option value="High Protein">🍗 High Protein</option>
          <option value="Junk Food">🍔 Junk Food</option>
        </select>

        <label>Water Intake:</label>
        <select name="waterIntake" value={formData.waterIntake} onChange={handleChange} required>
          <option value="">Select</option>
          <option value="0.5 L">0.5 L</option>
          <option value="1.0 L">1.0 L</option>
          <option value="1.5 L">1.5 L</option>
          <option value="2.0 L">2.0 L</option>
          <option value="2.5+ L">2.5+ L</option>
        </select>

        <label>Social Interaction:</label>
        <select name="socialInteraction" value={formData.socialInteraction} onChange={handleChange} required>
          <option value="">Select</option>
          <option value="None">🚫 None</option>
          <option value="Minimal (Online/Texting)">💬 Minimal (Online/Texting)</option>
          <option value="In-person Chat">👥 In-person Chat</option>
          <option value="Group Hangout">🎉 Group Hangout</option>
        </select>

        <label>Journal Entry:</label>
        <textarea name="journalEntry" value={formData.journalEntry} onChange={handleChange}></textarea>

        <button type="submit">Log Mood</button>
      </form>

      <h3>Previous Mood Entries</h3>
      {moodData.length > 0 ? (
        <ul>
          {moodData.map((entry) => (
            <li key={entry._id}>
              <strong>{entry.date?.slice(0, 10) || "Unknown Date"}:</strong> {entry.mood} | Energy: {entry.energyLevel}/10 | Stress: {entry.stressLevel}/10
              <button onClick={() => {
                if (window.confirm("Are you sure you want to delete this entry?")) {
                  deleteMoodEntry(entry._id);
                }
              }}>🗑 Delete</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No mood data recorded yet.</p>
      )}
    </div>
  );
};

export default MoodTrackerComponent;
