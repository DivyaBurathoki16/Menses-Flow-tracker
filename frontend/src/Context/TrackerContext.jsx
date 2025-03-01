import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import UserContext from "./UserContext";

const TrackerContext = createContext();

export const TrackerProvider = ({ children }) => {
  const { user } = useContext(UserContext);
  const [cycles, setCycles] = useState([]);

  const API_BASE_URL = "http://localhost:5000/api/tracking"; // Change if deployed

  // Fetch user-specific cycle data
  const loadUserCycles = async () => {
    if (!user || !user._id) return; // Prevent API calls if user isn't available

    try {
      const response = await axios.get(`${API_BASE_URL}/history/${user._id}`);
      if (Array.isArray(response.data)) {
        setCycles(response.data);
      } else {
        setCycles([]); // Fallback in case response is not an array
        console.error("Unexpected response format:", response.data);
      }
    } catch (error) {
      console.error("Error fetching cycle history:", error);
      setCycles([]); // Handle failure by resetting state
    }
  };

  // Add a new cycle
  const addCycle = async (cycleData) => {
    if (!user || !user._id) {
      console.error("User is not logged in.");
      return;
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/track`, {
        ...cycleData,
        userId: user._id,
      });

      if (response.data?.newCycle) {
        setCycles((prev) => [response.data.newCycle, ...prev]);
      } else {
        console.error("Invalid response format:", response.data);
      }
    } catch (error) {
      console.error("Error saving tracking data:", error);
    }
  };

  // Delete a cycle
  const deleteCycle = async (cycleId) => {
    try {
      await axios.delete(`${API_BASE_URL}/delete/${cycleId}`);
      setCycles((prev) => prev.filter((cycle) => cycle._id !== cycleId));
    } catch (error) {
      console.error("Error deleting cycle:", error);
    }
  };

  // Fetch cycles when user changes
  useEffect(() => {
    if (user) {
      loadUserCycles();
    }
  }, [user]); // Reload data when user changes

  return (
    <TrackerContext.Provider value={{ cycles, loadUserCycles, addCycle, deleteCycle }}>
      {children}
    </TrackerContext.Provider>
  );
};

export const useTracker = () => useContext(TrackerContext);
