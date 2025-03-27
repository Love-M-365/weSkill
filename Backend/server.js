require('dotenv').config();
const express = require('express');
const cors = require('cors'); // Import CORS middleware
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const profileRoutes = require('./routes/profileRoutes');
const workRoutes = require('./routes/workRoutes');
const commentRoutes = require('./routes/commentRoutes');

const app = express();

// Connect to the database
connectDB();

// Use CORS middleware
app.use(
  cors({
    origin: 'http://localhost:3000', // Allow requests from your frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
    credentials: true, // If using cookies or auth headers
  })
);

// Middleware to parse JSON request bodies
app.use(express.json());

// Define routes
app.use('/api/auth', authRoutes);
app.use('/api/profiles', profileRoutes);
app.use('/api/works', workRoutes);
app.use('/api/comments', commentRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
