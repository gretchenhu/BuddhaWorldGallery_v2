// Authentication logic
export const API_URL = "";

// Login Function
export const loginUser = async (username, password, adminSecretKey = null) => {
  const loginUrl = `${API_URL}/login`;
  const body = { username, password };

  if (adminSecretKey) {
    body.adminSecretKey = adminSecretKey;
  }

  try {
    const response = await fetch(loginUrl, {
      method: "POST",
      credentials: "include", // Important for session cookies
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body), // Correctly pass the body object
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || "Login failed");
    }

    const user = await response.json();
    return user;
  } catch (error) {
    console.error("Login error:", error);
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
    //console.error("Logout failed:", error);
  }
};

// Registration Function
export const registerUser = async (username, password) => {
  try {
    const response = await fetch(`${API_URL}/register`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
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
      // 404
      method: "GET",
      credentials: "include", // Necessary for sessions
    });
    if (!response.ok) {
      throw new Error("User is not authenticated");
    }
    return await response.json(); // The server should respond with user info if a session exists
  } catch (error) {
    console.error("Checking authentication status failed", error);
    // Handle error
  }
};
