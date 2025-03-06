import { useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import "./SignupPage.css"

const SignupPage = () => {
  const { signup } = useContext(UserContext);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("Female");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    await signup(name, age, gender, email, password);
  };

  return (
    <div className="auth-page">
      <h2>Sign Up</h2>
      <form onSubmit={handleSignup}>
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <input type="number" placeholder="Age" value={age} onChange={(e) => setAge(e.target.value)} required />
        <select value={gender} onChange={(e) => setGender(e.target.value)}>
          <option value="Female">Female</option>
          <option value="Male">Male</option>
          <option value="Other">Other</option>
        </select>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignupPage;
