import { createContext, useState, useContext, useEffect } from "react";
import { UserContext } from "./UserContext";


export const MoodTrackerContext = createContext();

export const MoodTrackerProvider = ({ children }) => {
  const { user } = useContext(UserContext);
  const [moodData, setMoodData] = useState([]);

  useEffect(() => {
    if (user) {
      fetchMoodData();
    }
  }, [user]);

  const fetchMoodData = async () => {
    if (!user || !user._id) {
      console.error("User ID is missing! Cannot fetch mood data.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/mood/${user._id}`);

      if (!response.ok) {
        const errorResponse = await response.json();
        console.error("Error fetching mood data:", errorResponse.message);
        return;
      }

      const data = await response.json();
      setMoodData(data);
    } catch (error) {
      console.error("Network error fetching mood data:", error);
    }
  };

  const addMoodEntry = async (entry) => {
    if (!user) return;

    try {
      const response = await fetch("http://localhost:5000/api/mood", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...entry, userId: user._id }),
      });

      if (response.ok) {
        fetchMoodData(); // Refresh data after adding
      } else {
        const errorResponse = await response.json();
        console.error("Error adding mood entry:", errorResponse.message);
      }
    } catch (error) {
      console.error("Error adding mood entry:", error);
    }
  };

  const deleteMoodEntry = async (entryId) => {
    if (!entryId) return;

    try {
      const response = await fetch(`http://localhost:5000/api/mood/${entryId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setMoodData((prevData) => prevData.filter((entry) => entry._id !== entryId));
      } else {
        const errorResponse = await response.json();
        console.error("Error deleting mood entry:", errorResponse.message);
      }
    } catch (error) {
      console.error("Error deleting mood entry:", error);
    }
  };

  return (
    <MoodTrackerContext.Provider value={{ moodData, addMoodEntry, deleteMoodEntry }}>
      {children}
    </MoodTrackerContext.Provider>
  );
};
