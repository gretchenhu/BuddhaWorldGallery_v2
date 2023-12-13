// app.js
import express from "express";
import path, { dirname } from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import { fileURLToPath } from "url";

import session from "express-session";

import passport from "passport";
import LocalStrategy from "passport-local";
import crypto from "crypto";

import myDB from "./db/myMongoDB.js";
import MongoStore from "connect-mongo";

import indexRouter from "./routes/index.js";
import authRouter from "./routes/auth.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let app = express();

const myStrategy = new LocalStrategy(async function verify(username, password, done) {
    try {
        const user = await myDB.getUserByUsername(username);
        console.log("Retrieved user in app.js:", user);

        if (!user) {
            // User not found
            return done(null, false, { message: "Incorrect username or password" });
        }

        console.log("found user", user);
        const salt = user.salt;

        // Computes the hash password from the user input
        crypto.pbkdf2(password, salt, 310000, 32, "sha256", function (err, hashedPassword) {
            if (err) {
                return done(err);
            }
            if (!crypto.timingSafeEqual(Buffer.from(user.hashedPassword, "hex"), hashedPassword)) {
                console.log("passwords don't match");
                // User found but password incorrect
                return done(null, false, { message: "Incorrect username or password" });
            }

            console.log("passwords match");
            // User found and authenticated
            return done(null, user); // Pass the entire user object
        });
    } catch (err) {
        return done(err);
    }
});


passport.use(myStrategy);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "front", "dist")));


// Manually set CORS headers
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5173'); // Vite: front-end address
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Access-Control-Allow-Credentials', 'true');
  
  // Intercepts OPTIONS method
  if (req.method === "OPTIONS") {
    // Respond with 200
    res.sendStatus(200);
  } else {
    // Move on
    next();
  }
});


// Session configuration
app.use(session({
  secret: process.env.SESSION_SECRET, // Environment variable, see .env file
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI }),
  cookie: { 
    secure: process.env.NODE_ENV === "production",
    maxAge: 1000*60*60*24 } // cookie expires after 1 day  
}));

// Passport configuration
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, cb) => { 
  process.nextTick(function () {
    return cb(null, user); 
  });
});

passport.deserializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, user);
  });
});

app.use(passport.authenticate("session"));

// Routes
app.use("/", indexRouter);
app.use("/", authRouter); 

export default app;
