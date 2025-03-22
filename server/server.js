const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const connectDB = require('./config/db');

// Load environment variables first
dotenv.config();

// Validate required environment variables
const requiredEnvVars = ['MONGODB_URI', 'JWT_SECRET'];
requiredEnvVars.forEach(varName => {
  if (!process.env[varName]) {
    console.error(`Error: ${varName} is not defined in environment variables`);
    process.exit(1);
  }
});

// Database connection
connectDB().catch(err => {
  console.error('Database connection failed:', err);
  process.exit(1);
});

const app = express();

// CORS Configuration
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};
app.use(cors(corsOptions));

// Body parser
app.use(express.json());

// Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/expenses', require('./routes/expenses'));
app.use('/api/categories', require('./routes/categories'));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(`[${new Date().toISOString()}] Error:`, err.stack);
  res.status(err.statusCode || 500).json({
    success: false,
    error: process.env.NODE_ENV === 'development' ? err.message : 'Server Error'
  });
});

// Server setup
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error(`Unhandled Rejection: ${err.message}`);
  server.close(() => process.exit(1));
});

module.exports = app;
