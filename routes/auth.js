import express from "express";
import passport from "passport";
import crypto from "crypto";
import myDB from "../db/myMongoDB.js";

const router = express.Router();

router.post("/login", function(req, res, next) {
  const { username, password, adminSecretKey } = req.body;
  console.log("1.adminSecretKey is", adminSecretKey, "env key is", process.env.ADMIN_SECRET_KEY);

  // Check if it's an admin login attempt
  if (adminSecretKey) {
    if (adminSecretKey !== process.env.ADMIN_SECRET_KEY) {
      return res.status(401).json({ message: "Invalid admin secret key." });
    }

    // Proceed with authentication
    passport.authenticate("local", function(err, user, info) {
      if (err) { return next(err); }
      if (!user) { 
        return res.status(401).json({ message: "Authentication failed." });
      }
      console.log("user role is", user.role)
      // Check if the authenticated user is an admin
      if (user.role !== "admin") {
        return res.status(403).json({ message: "Access denied. User is not an admin." });
      }

      req.logIn(user, function(err) {
        if (err) { return next(err); }
        return res.json({ message: "Admin authentication successful.", user });
      });
    })(req, res, next);
  } else {
    // Handle regular user authentication
    passport.authenticate("local", function(err, user, info) {
      if (err) { return next(err); }
      if (!user) { 
        return res.status(401).json({ message: "Authentication failed." });
      }
      req.logIn(user, function(err) {
        if (err) { return next(err); }
        return res.json({ message: "Authentication successful.", user });
      });
    })(req, res, next);
  }
});



router.post("/logout", function (req, res, next) { // deleted api/
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.status(200).json({ username: null, msg: "Logged out", ok: true });
  });
});

// Status check route
router.get('/check-status', (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ message: 'User is authenticated', user: req.user });
  } else {
    res.json({ message: 'User is not authenticated' });
  }
});

router.get("/getUser", function (req, res) {
  console.log("getUser", req.user);
  res.status(200).json({ username: req.user?.username });
});

// register as member or Admin
router.post("/register", async (req, res) => {
  const { username, password, adminSecretKey } = req.body;
  console.log("received key:", adminSecretKey, "expected key:", process.env.ADMIN_SECRET_KEY);
  
  // Check if the user already exists
  try {
      const existingUser = await myDB.getUserByUsername(username);
      if (existingUser) {
          return res.status(409).json({ message: "Username already exists" });
      }
  } catch (error) {
      return res.status(500).json({ message: "Error checking existing user", error: error.message });
  }

  // Generate a salt and hash the password
  const salt = crypto.randomBytes(16).toString('hex');
  crypto.pbkdf2(password, salt, 310000, 32, 'sha256', async (err, hashedPassword) => {
      if (err) {
          return res.status(500).json({ message: "Error hashing password", error: err.message });
      }

      // Determine role based on provided adminSecretKey
      const role = (adminSecretKey === process.env.ADMIN_SECRET_KEY) ? "admin" : "member";

      // Construct the new user object
      const newUser = {
          username,
          hashedPassword: hashedPassword.toString('hex'),
          salt,
          role
      };
      console.log("hasedpasswrd in auth.js is", hashedPassword);
      // Insert the new user into the database
      try {
          await myDB.insertUser(newUser);
          res.status(200).json({ message: `User registered successfully as ${role}` });
      } catch (dbError) {
          res.status(500).json({ message: "Error registering new user", error: dbError.message });
      }
  });
});

/*
// register as member
router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  
  // Check if the user already exists
  try {
      const existingUser = await myDB.getUserByUsername(username);
      if (existingUser) {
          return res.status(409).json({ message: "Username already exists" });
      }
  } catch (error) {
      return res.status(500).json({ message: "Error checking existing user", error: error.message });
  }

  // Generate a salt and hash the password
  const salt = crypto.randomBytes(16).toString('hex');
  crypto.pbkdf2(password, salt, 310000, 32, 'sha256', async (err, hashedPassword) => {
      if (err) {
          // Handle error during password hashing
          return res.status(500).json({ message: "Error hashing password", error: err.message });
      }

      // Construct the new user object
      const newUser = {
          username,
          hashedPassword: hashedPassword.toString('hex'),
          salt,
          role: "member" // Default role for new users
      };

      // Insert the new user into the database
      try {
          await myDB.insertUser(newUser);
          res.status(200).json({ message: "User registered successfully" });
      } catch (dbError) {
          // Handle database insertion error
          res.status(500).json({ message: "Error registering new user", error: dbError.message });
      }
  });
});

// Register as an Admin
router.post("/register-admin", async (req, res) => {
  // Only allow this route to be accessed if a certain condition is met
  // This could be a special token, a secret key, or a check for an existing admin session

  const { username, password, adminSecretKey } = req.body;

  if (!adminSecretKey || adminSecretKey !== process.env.ADMIN_SECRET_KEY){
    return res.status(403).json( { message: "Invalid or missing secret key."});
  }

  const salt = crypto.randomBytes(16).toString('hex');
  crypto.pbkdf2(password, salt, 310000, 32, 'sha256', async (err, hashedPassword) => {
      if (err) {
          return res.status(500).json({ message: "Error hashing password", error: err.message });
      }

      const newUser = {
          username,
          hashedPassword: hashedPassword.toString('hex'),
          salt,
          role: "admin" // Set role as admin
      };

      try {
          await myDB.insertUser(newUser);
          res.status(200).json({ message: "Admin registered successfully" });
      } catch (dbError) {
          res.status(500).json({ message: "Error registering admin", error: dbError.message });
      }
  });
});
*/

export default router;
