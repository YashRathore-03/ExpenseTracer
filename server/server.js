const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose'); // Ensure mongoose is required
const connectDB = require('./config/db'); // Assuming connectDB is in this file

dotenv.config();

// Check if MONGODB_URI is defined IMMEDIATELY after dotenv.config()
if (!process.env.MONGODB_URI) {
  console.error("Error: MONGODB_URI is not defined in .env file");
  process.exit(1);
}

// Call connectDB() to connect to MongoDB
connectDB();

const app = express();

// CORS Configuration
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? 'https://expense-tracer-git-main-yashrathore-03s-projects.vercel.app'
    : 'http://localhost:3000',
  credentials: true
}));

app.use(express.json());

// Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/expenses', require('./routes/expenses'));
app.use('/api/categories', require('./routes/categories'));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Server Error');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
