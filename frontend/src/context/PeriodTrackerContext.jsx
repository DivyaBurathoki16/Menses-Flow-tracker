import { createContext, useState, useContext, useEffect } from "react";
import { UserContext } from "./UserContext"; // Import UserContext

export const PeriodTrackerContext = createContext();

export const PeriodTrackerProvider = ({ children }) => {
  const { user } = useContext(UserContext); // Get the logged-in user
  const [trackerData, setTrackerData] = useState([]);

  useEffect(() => {
    if (user) {
      fetchTrackerData();
    }
  }, [user]);

  const fetchTrackerData = async () => {
    if (!user || !user._id) {
      console.error("User ID is missing! Cannot fetch tracker data.");
      return;
    }

    try {
      console.log(`Fetching data for user ID: ${user._id}`);
      const response = await fetch(`http://localhost:5000/api/tracker/${user._id}`);
      
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error fetching tracker data:", errorData);
        return;
      }
  
      const data = await response.json();
      setTrackerData(data);
    } catch (error) {
      console.error("Network error fetching tracker data:", error);
    }
  };

  const addPeriodEntry = async (entry) => {
    if (!user) return;
  
    try {
      const response = await fetch("http://localhost:5000/api/tracker", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...entry, userId: user._id, periodDuration: entry.periodDuration || 5 }), // Ensure periodDuration is included
      });
  
      if (response.ok) {
        fetchTrackerData(); // Refresh data after adding
      } else {
        const errorData = await response.json();
        console.error("Error response:", errorData);
      }
    } catch (error) {
      console.error("Error adding period entry:", error);
    }
  };

  const deletePeriodEntry = async (entryId) => {
    if (!user) return;
  
    try {
      const response = await fetch(`http://localhost:5000/api/tracker/${entryId}`, {
        method: "DELETE",
      });
  
      if (response.ok) {
        setTrackerData((prevData) => prevData.filter((entry) => entry._id !== entryId)); // Remove from state
      } else {
        console.error("Failed to delete period entry.");
      }
    } catch (error) {
      console.error("Error deleting period entry:", error);
    }
  };

  return (
    <PeriodTrackerContext.Provider value={{ trackerData, addPeriodEntry, deletePeriodEntry }}>
      {children}
    </PeriodTrackerContext.Provider>
  );
};
