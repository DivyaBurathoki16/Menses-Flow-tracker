import { useState, useContext } from "react";
import { UserContext } from "../context/UserContext";

const ProfilePage = () => {
  const { user, login, signup, logout } = useContext(UserContext);
  const [isLogin, setIsLogin] = useState(true); // Toggle Login/Signup
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("Female");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Handle Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLogin) {
      await login(email, password);
    } else {
      await signup(name, age, gender, email, password);
    }
  };

  // If user is logged in, show profile
  if (user) {
    return (
      <div className="profile-page">
        <h2>Welcome, {user.name}!</h2>
        <p><strong>Age:</strong> {user.age}</p>
        <p><strong>Gender:</strong> {user.gender}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <button onClick={logout}>Log Out</button>
      </div>
    );
  }

  return (
    <div className="auth-page">
      <h2>{isLogin ? "Login" : "Sign Up"}</h2>
      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <>
            <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
            <input type="number" placeholder="Age" value={age} onChange={(e) => setAge(e.target.value)} required />
            <select value={gender} onChange={(e) => setGender(e.target.value)}>
              <option value="Female">Female</option>
              <option value="Male">Male</option>
              <option value="Other">Other</option>
            </select>
          </>
        )}
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">{isLogin ? "Login" : "Sign Up"}</button>
      </form>
      <p>
        {isLogin ? "Don't have an account?" : "Already have an account?"}
        <button onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? " Sign Up" : " Login"}
        </button>
      </p>
    </div>
  );
};

export default ProfilePage;
