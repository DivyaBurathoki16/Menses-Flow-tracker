// src/contexts/AuthContext.jsx
import React, { createContext, useState } from "react";
import axios from "axios";

// Create the context
export const AuthContext = createContext();

// Create a provider component
export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    token: null,
    user: null,
  });

  // Login function that calls the backend and updates state
  const login = async (email, password) => {
    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", { email, password });
      const { token, userId } = response.data;
      setAuth({ token, user: { id: userId, email } });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  // Registration function that calls the backend
  const register = async (name, email, password) => {
    try {
      const response = await axios.post("http://localhost:5000/api/auth/register", { name, email, password });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  // Logout to clear state
  const logout = () => {
    setAuth({ token: null, user: null });
  };

  return (
    <AuthContext.Provider value={{ auth, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
