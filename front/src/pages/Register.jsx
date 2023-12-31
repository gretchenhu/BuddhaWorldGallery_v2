import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/Authentication";
import "./Register.css";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [adminSecretKey, setAdminSecretKey] = useState("");
  const navigate = useNavigate();

  // Inside your component...
  const handleRegister = async (event) => {
    event.preventDefault();
    try {
      const response = await registerUser(username, password, adminSecretKey);
      console.log("Registration successful:", response);
      navigate("/MemberLogin"); // naviagate to login pg post-registration
    } catch (error) {
      console.error("Registration failed:", error);
      // Handle registration errors (e.g., display an error message)
    }
  };

  return (
    <div className="register-form">
      <Navbar />
      <div>
        <form onSubmit={handleRegister}>
          <div>
            <label>Username:</label>
            <input
              type="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <label>Admin Secret Key (optional):</label>
            <input
              type="adminSecretKey"
              value={adminSecretKey}
              onChange={(e) => setAdminSecretKey(e.target.value)}
              placeholder="Enter key for admin registration"
            />
          </div>
          <button type="submit">Register</button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default Register;
