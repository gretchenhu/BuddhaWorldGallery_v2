// app.js
import express, { json, urlencoded } from "express";
import path, { dirname } from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import { fileURLToPath } from "url";
import session from "express-session";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcryptjs";
import { MongoClient, ObjectId } from "mongodb";
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
  if ('OPTIONS' === req.method) {
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
  store: sessionStore,
  cookie: { 
    secure: process.env.NODE_ENV === "production",
    maxAge: 1000*60*60*24 } // seconds in 1 day  
}));


// MongoDB connection
const client = new MongoClient(process.env.MONGODB_URI); // Environment variable, see .env file
let db = null;

async function connectDB() {
  try {
    await client.connect();
    db = client.db(client.s.options.dbName);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Could not connect to MongoDB", error);
  }
}
connectDB();

// Passport configuration
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy({ usernameField: "email" },
  async (email, password, done) => {
    try {
      const usersCollection = db.collection("RegisteredUsers");
      const user = await usersCollection.findOne({ email: email });
      
      if (!user) {
        return done(null, false, { message: "Incorrect email." });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return done(null, false, { message: "Incorrect password." });
      }
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }
));

passport.serializeUser((user, done) => {
  done(null, user._id.toString()); // MongoDB _id is an ObjectID
});

passport.deserializeUser(async (id, done) => {
  try {
    const usersCollection = db.collection("RegisteredUsers");
    // Assuming pw is hashed
    const user = await usersCollection.findOne({ _id: new ObjectId(id) });
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

// Routes
app.use("/", indexRouter);
app.use("/", authRouter); 

export default app;
