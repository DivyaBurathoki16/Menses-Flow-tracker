import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { UserProvider } from "./Context/UserContext"; 
import { TrackerProvider } from "./Context/TrackerContext";


const root = ReactDOM.createRoot(document.getElementById("root")); 
root.render(
  <UserProvider>
    <TrackerProvider>
   
        <App />
     
    </TrackerProvider>
  </UserProvider>
);
