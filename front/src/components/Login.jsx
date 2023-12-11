// Login.jsx
import { useState, useContext } from 'react';
import { loginUser } from "../services/Authentication"; 
import { UserContext } from "../context/UserContext"; 
import { PropTypes } from 'prop-types';

const Login = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setUser } = useContext(UserContext); // Use setUser to update global user state

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginUser(email, password);
      setUser(user); // Update the global user context
      if (onClose) {
        onClose(); // Close the login modal
      }
    } catch (error) {
      // Handle login errors (e.g., show an error message)
      console.error('Login failed:', error);
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
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

Login.propTypes = {
  onClose: PropTypes.func 
  // Not required, used in standalone MemberLogin page and modal in ArtifactDetails
};

export default Login;