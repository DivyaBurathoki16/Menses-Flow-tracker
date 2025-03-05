import React from "react";
import ReactDOM from "react-dom/client"; // <-- Use `react-dom/client`
import App from "./App";
import { UserProvider } from "./context/UserContext";
import { PeriodTrackerProvider } from "./context/PeriodTrackerContext";

const root = ReactDOM.createRoot(document.getElementById("root")); // <-- Use `createRoot`
root.render(
  <React.StrictMode>
    <UserProvider>
    <PeriodTrackerProvider>
      <App />
      </PeriodTrackerProvider>
    </UserProvider>
  </React.StrictMode>
);
