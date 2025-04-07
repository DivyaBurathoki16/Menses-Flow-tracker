import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { MoodTrackerProvider } from "../context/MoodTrackerContext";
import MoodTrackerComponent from "../component/MoodTrackerComponnet";
import PeriodSuggestionComponent from "../component/PeriodSuggestionComponent";
import BeforeH from "../component/BeforeH"
import Blood from "../component/Blood"


const HealthPage = () => {
  const { user } = useContext(UserContext);

  if (!user) {
    return <BeforeH/>;
  }

  return (
    <MoodTrackerProvider>
      <div className="health-page">
        <Blood/>
        <MoodTrackerComponent />
        <PeriodSuggestionComponent/>
        
      </div>
    </MoodTrackerProvider>
  );
};

export default HealthPage;
