// app.js
import express, { json, urlencoded } from "express";
import path, { dirname } from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import { fileURLToPath } from "url";
import session from "express-session";
import MongoStore from "connect-mongo";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcryptjs";
import { MongoClient, ObjectId } from "mongodb";
import myDB from "./db/myMongoDB.js";
import { config } from "dotenv";

import indexRouter from "./routes/index.js";
import authRouter from "./routes/auth.js"; // need to add th auth.js to router folder

config(); // Load environment variables from .env

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let app = express();

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

passport.use(new LocalStrategy({ usernameField: "email" },
  //userinput email, used to find user in db, and to match with password  
  async (email, password, done) => {
    try {
      const user = await myDB.getUserByEmail(email);
      console.log("R U here, email entered is", email);
      console.log("Authenticating User is", user);
      if (!user){
        return done (null, false, { message: "Email does not exist."});
    }
    // should i call the getUserByEmail to return the user in db?
      const isMatch = await bcrypt.compare(password, user.password);
      console.log("Input password is", password, "and user password in our db is", user.password);
      console.log("pw match?",isMatch);
      if (!isMatch) {
        return done(null, false, { message: "Incorrect password." });
      }
      return done (null, user);
    } catch (error) {
      console.error("Authentication error:", error);
     return done(error);
  }}
));

passport.serializeUser((user, done) => {
  done(null, user._id.toString()); // MongoDB _id is an ObjectID
});

passport.deserializeUser(async (user, done) => {
  try {
    const usersCollection = db.collection("RegisteredUsers");
    const user = await usersCollection.findOne({ email: email });
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

// Routes
app.use("/", indexRouter);
app.use("/", authRouter); 

export default app;
