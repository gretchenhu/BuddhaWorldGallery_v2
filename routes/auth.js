import express from "express";
import passport from "passport";
import crypto from "crypto";
import myDB from "../db/myMongoDB.js";

const router = express.Router();

router.post(
  "/login/password", //deleted api/
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
  })
);

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

router.post("/register", async function (req, res, next) {
  console.log("**** register", req.body);

  const user = await myDB.getUserByUsername(req.body.username);
  if (user) {
    return res.status(400).json({ ok: false, msg: "Username already exists" });
  }

  var salt = crypto.randomBytes(16);
  crypto.pbkdf2(
    req.body.password,
    salt,
    310000,
    32,
    "sha256",
    async function (err, hashedPassword) {
      if (err) {
        return next(err);
      }

      const insertResponse = await myDB.insertUser({
        username: req.body.username,
        hashedPassword: hashedPassword.toString("hex"),
        salt: salt.toString("hex"),
      });

      console.log("inserted new user", insertResponse);

      res.status(200).json({ ok: true, msg: "Signed up " });
    }
  );
});

export default router;
