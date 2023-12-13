import express from "express";
import passport from "passport";
import crypto from "crypto";
import myDB from "../db/myMongoDB.js";

const router = express.Router();

router.post("/login", function(req, res, next) {
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
          salt
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

export default router;
