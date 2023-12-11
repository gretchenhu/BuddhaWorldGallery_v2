import { useState } from 'react';
import { registerUser } from "../services/Authentication"; 
import "./Register.css"

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  
// Inside your component...
const handleRegister = async (event) => {
  event.preventDefault();
  try {
    const response = await registerUser(email, password);
    console.log('Registration successful:', response);
    // Handle post-registration logic (e.g., redirect to login page)
  } catch (error) {
    console.error('Registration failed:', error);
    // Handle registration errors (e.g., display an error message)
  }
};

  return (
    <div>
      <form onSubmit={handleRegister}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
