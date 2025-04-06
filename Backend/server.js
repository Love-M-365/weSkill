require('dotenv').config();
const express = require('express');
const cors = require('cors'); // Import CORS middleware
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const profileRoutes = require('./routes/profileRoutes');
const workRoutes = require('./routes/workRoutes');
const commentRoutes = require('./routes/commentRoutes');
const paymentRoutes =require('./routes/paymentRoutes')
const placeOrder = require('./routes/placeOrderRoutes')

const app = express();

// Connect to the database
connectDB();

// Use CORS middleware
app.use(
  cors({
    origin: 'https://we-skill-lake.vercel.app/', // Allow requests from your frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
    credentials: true, // If using cookies or auth headers
  })
);
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/profiles', profileRoutes);
app.use('/api/works', workRoutes);
app.use('/api/comments', commentRoutes);
app.use("/api/placeOrder", paymentRoutes);

app.use("/api/orders",placeOrder);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
