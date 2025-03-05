import { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if user is already logged in (from localStorage)
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const login = async (email, password) => {
    try {
      const response = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        setUser(data);
        localStorage.setItem("user", JSON.stringify(data)); // Save user info
      } else {
        console.error("Login failed:", data.message);
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const signup = async (name, age, gender, email, password) => {
    try {
      const response = await fetch("http://localhost:5000/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, age, gender, email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        setUser(data);
        localStorage.setItem("user", JSON.stringify(data));
      } else {
        console.error("Signup failed:", data.message);
      }
    } catch (error) {
      console.error("Signup error:", error);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <UserContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </UserContext.Provider>
  );
};
