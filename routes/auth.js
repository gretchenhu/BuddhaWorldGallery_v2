import { Router } from 'express';
import passport from 'passport';
import { MongoClient } from 'mongodb';
import bcrypt from 'bcrypt';

const router = Router();
const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017'; // Use the same URI as in myMongoDB.js
const client = new MongoClient(uri);

// Use connect method to connect to the server
let db;
client.connect().then(client => {
  db = client.db('BuddhaWorld');
}).catch(error => {
  console.error('Database connection error:', error);
  process.exit(1);
});

// Login route
router.post('/login', passport.authenticate('local'), (req, res) => {
  res.json({ message: 'Logged in successfully', user: req.user });
});

// Logout route
router.post('/logout', (req, res) => {
  req.logout();
  res.json({ message: 'Logged out successfully' });
});

// Registration route
router.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }

    const collection = db.collection('RegisteredUsers');

    // Check if email already exists
    const existingUser = await collection.findOne({ email: email });
    if (existingUser) {
      return res.status(409).json({ message: 'Email already exists.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      email: email,
      password: hashedPassword
    };

    await collection.insertOne(newUser);
    res.status(201).json({ message: 'Registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error registering new user', error: error.message });
  }
});

// Status check route
router.get('/check-status', (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ message: 'User is authenticated', user: req.user });
  } else {
    res.json({ message: 'User is not authenticated' });
  }
});

export default router;
