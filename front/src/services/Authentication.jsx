export const API_URL = "http://localhost:3000/api/auth"; // Adjust the port if your app runs on a different one

// Login Function
export const loginUser = async (email, password) => {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      credentials: "include", // This is important for session cookies to be sent and received
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password }),
    });
    if (!response.ok) {
      throw new Error("Login failed");
    }
    return await response.json(); // The server should set a cookie upon successful login
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
};

// Logout Function
export const logoutUser = async () => {
  try {
    const response = await fetch(`${API_URL}/logout`, {
      method: "POST",
      credentials: "include", // Ensures cookies are sent to the server
    });
    if (!response.ok) {
      throw new Error("Logout failed");
    }
    // The server should clear the session cookie upon logout
  } catch (error) {
    console.error("Logout failed:", error);
  }
};

// Registration Function
export const registerUser = async (userData) => {
  try {
    const response = await fetch(`${API_URL}/register`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userData),
    });
    if (!response.ok) {
      throw new Error("Registration failed");
    }
    return await response.json(); // Handle response, possibly auto-login the user
  } catch (error) {
    console.error("Registration failed:", error);
    throw error;
  }
};

// Check Authentication Status Function
export const checkAuthStatus = async () => {
  try {
    const response = await fetch(`${API_URL}/check-status`, {
      method: "GET",
      credentials: "include", // Necessary for sessions
    });
    if (!response.ok) {
      throw new Error("User is not authenticated");
    }
    return await response.json(); // The server should respond with user info if a session exists
  } catch (error) {
    console.error("Checking authentication status failed:", error);
    // Handle error
  }
};