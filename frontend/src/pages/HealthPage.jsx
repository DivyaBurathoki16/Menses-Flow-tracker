import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { MoodTrackerProvider } from "../context/MoodTrackerContext";
import MoodTrackerComponent from "../component/MoodTrackerComponnet";
import PeriodSuggestionComponent from "../component/PeriodSuggestionComponent";
import Chatbot from "../utils/Chatbot";

const HealthPage = () => {
  const { user } = useContext(UserContext);

  if (!user) {
    return <p>Please log in to access the Mood Tracker.</p>;
  }

  return (
    <MoodTrackerProvider>
      <div className="health-page">
        <h1>🌿 Health & Wellness</h1>
        <MoodTrackerComponent />
        <PeriodSuggestionComponent/>
        <Chatbot/>
      </div>
    </MoodTrackerProvider>
  );
};

export default HealthPage;
