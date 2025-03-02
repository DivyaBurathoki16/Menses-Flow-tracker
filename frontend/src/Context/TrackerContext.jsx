import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import UserContext from "./UserContext";

const TrackerContext = createContext();

export const TrackerProvider = ({ children }) => {
  const { user } = useContext(UserContext);
  const [cycles, setCycles] = useState([]);

  const API_BASE_URL = "http://localhost:5000/api/tracking";

  // ✅ Load user-specific cycle history (excluding deleted ones)
  const loadUserCycles = async () => {
    if (!user || !user._id) return;

    try {
      const response = await axios.get(`${API_BASE_URL}/history/${user._id}`);
      setCycles(response.data);
    } catch (error) {
      console.error("❌ Error fetching cycle history:", error);
      setCycles([]);
    }
  };

  // ✅ Add a new cycle
  const addCycle = async (cycleData) => {
    if (!user || !user._id) return;

    try {
      await axios.post(`${API_BASE_URL}/track`, { ...cycleData, userId: user._id });
      await loadUserCycles();
    } catch (error) {
      console.error("❌ Error saving tracking data:", error);
    }
  };

  // ✅ Delete cycle (soft delete)
  const deleteCycle = async (cycleId) => {
    try {
      await axios.delete(`${API_BASE_URL}/delete/${cycleId}`); // ✅ Changed to DELETE
      await loadUserCycles();
    } catch (error) {
      console.error("❌ Error deleting cycle:", error);
    }
  };

  useEffect(() => {
    loadUserCycles();
  }, [user]);

  return (
    <TrackerContext.Provider value={{ cycles, loadUserCycles, addCycle, deleteCycle }}>
      {children}
    </TrackerContext.Provider>
  );
};

export const useTracker = () => useContext(TrackerContext);
