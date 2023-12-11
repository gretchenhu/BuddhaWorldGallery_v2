import { createContext, useState, useEffect } from 'react';
import PropTypes from "prop-types";
import { checkAuthStatus } from '../services/Authentication';

// Create a context for the user's data
export const UserContext = createContext(null);

// Define the UserProvider component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // This function checks if the user is already logged in when the app loads
    const verifyUser = async () => {
      try {
        const userData = await checkAuthStatus();
        if (userData) {
          setUser(userData); // Set the user data if the user is already logged in
        }
      } catch (error) {
        console.error("User is not authenticated", error);
      }
    };

    verifyUser();
  }, []);

  // Provide the user data and setUser function to all child components
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.node.isRequired
};
