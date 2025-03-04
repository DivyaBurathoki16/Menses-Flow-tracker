// src/pages/Profile.jsx
import React, { useState } from "react";
import Login from "../components/Login";
import Register from "../components/Register";
import "./Profile.css";

const Profile = () => {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <div className="profile-container">
      <div className="profile-buttons">
        <button onClick={() => setShowLogin(true)}>Login</button>
        <button onClick={() => setShowLogin(false)}>Register</button>
      </div>
      <hr />
      {showLogin ? <Login /> : <Register />}
    </div>
  );
};

export default Profile;
