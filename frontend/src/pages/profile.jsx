import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../Context/UserContext"; 
import "./Profile.css";

const Profile = () => {
  const { user, setUser, loading } = useContext(UserContext);
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
    age: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Debugging logs
  console.log("User Context Value:", user);
  console.log("Loading State:", loading);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const response = await fetch("http://localhost:5000/auth/user", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();

        if (response.ok) {
          setUser(data);
        } else {
          localStorage.removeItem("token");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [setUser]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/profile"); // Redirect to profile page after logout
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const url = isLogin ? "http://localhost:5000/auth/login" : "http://localhost:5000/auth/signup";
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        setUser(data.user);
        navigate("/profile"); // Redirect to profile after login/signup
      } else {
        setError(data.error || "Something went wrong");
      }
    } catch (error) {
      setError("Server error, please try again later.");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="profile-container">
      {user ? (
        <div className="profile-card">
          <h2>Welcome, {user.username || "User"}!</h2>
          <div className="profile-info">
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Age:</strong> {user.age || "N/A"}</p>
          </div>
          <button className="profile-button logout-button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      ) : (
        <div className="auth-card">
          <div className="auth-header">
            <h2>{isLogin ? "Login" : "Sign Up"}</h2>
            <p>Track your menstrual cycle with ease</p>
          </div>

          {error && <div className="error-message">{error}</div>}

          <form onSubmit={handleSubmit} className="auth-form">
            {!isLogin && (
              <>
                <div className="form-group">
                  <label>Username</label>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Age</label>
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    placeholder="Enter your age"
                    min="8"
                    max="100"
                    required
                  />
                </div>
              </>
            )}

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
              />
            </div>

            <button type="submit" className="auth-button">
              {isLogin ? "Login" : "Sign Up"}
            </button>
          </form>

          <div className="auth-footer">
            <p>
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button className="toggle-auth-button" onClick={() => setIsLogin(!isLogin)}>
                {isLogin ? "Sign Up" : "Login"}
              </button>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
