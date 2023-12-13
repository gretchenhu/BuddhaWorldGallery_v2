// Login.jsx
import { useState, useContext } from "react";
import { loginUser } from "../services/Authentication"; 
import { UserContext } from "../context/UserContext"; 
import { PropTypes } from "prop-types";

const Login = ({ onClose, onSuccessfulLogin, isAdminLogin = false }) => {
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("")
  const { setUser } = useContext(UserContext); // Use setUser to update global user state
  const [adminSecretKey, setAdminSecretKey] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginUser(userName, password, 
        isAdminLogin ? adminSecretKey : null);
      console.log("Registration successful:", user);
      setUser(user); // Update the global user context
      if (onSuccessfulLogin) {
        onSuccessfulLogin(); // call the callback
      } else if (onClose) {
        onClose(); // Close the login modal
      }
    } catch (error) {
      // Handle login errors (e.g., show an error message)
      setLoginError("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="login-modal">
      <div className="login-content">
        {onClose && (
          <span className="close" onClick={onClose}>&times;</span>
        )}
        <form onSubmit={handleLogin}>
          <div>
            <label htmlFor="userName">Username:</label>
            <input
              type="text"
              id="username"
              value={userName}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="text"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {loginError && <div className="login-error">{loginError}</div>}
          {isAdminLogin && (
        <div>
          <label htmlFor="adminSecretKey">Admin Secret Key:</label>
          <input
            type="text"
            id="adminSecretKey"
            value={adminSecretKey}
            onChange={(e) => setAdminSecretKey(e.target.value)}
            required={isAdminLogin}
          />
        </div>
      )}
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

Login.propTypes = {
  onClose: PropTypes.func, 
  onSuccessfulLogin: PropTypes.func,
  isAdminLogin: PropTypes.bool
};

export default Login;