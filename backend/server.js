const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config({ path: './config.env' });

// Import routes
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');
const orderRoutes = require('./routes/orders');
const userRoutes = require('./routes/users');

// Import error handling middleware
const errorMiddleware = require('./middleware/error');

const app = express();

// Middleware
app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://localhost:3000',
    'https://*.vercel.app',

    process.env.FRONTEND_URL
  ].filter(Boolean),
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/users', userRoutes);

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Threadswear.pk API is running',
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString()
  });
});

// Simple test route
app.get('/api/test', (req, res) => {
  res.json({ 
    message: 'API is working!',
    env: process.env.NODE_ENV,
    vercel: !!process.env.VERCEL
  });
});

// Error handling middleware
app.use(errorMiddleware);

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ 
    success: false, 
    message: 'Route not found' 
  });
});

// Connect to MongoDB with serverless-optimized options
if (process.env.MONGODB_URI) {
  const mongooseOptions = {
    maxPoolSize: 1, // Limit connection pool for serverless
    serverSelectionTimeoutMS: 10000, // Increase timeout
    socketTimeoutMS: 45000, // Increase socket timeout
    bufferCommands: false, // Disable buffering
    bufferMaxEntries: 0, // Disable buffering
    connectTimeoutMS: 10000, // Connection timeout
    retryWrites: true,
    w: 'majority'
  };

  // For Vercel serverless, use different connection strategy
  if (process.env.VERCEL) {
    mongooseOptions.bufferCommands = false;
    mongooseOptions.bufferMaxEntries = 0;
    mongooseOptions.maxPoolSize = 1;
  }

  // Add connection options to URI for better serverless compatibility
  let mongoUri = process.env.MONGODB_URI;
  if (process.env.VERCEL && !mongoUri.includes('?')) {
    mongoUri += '?retryWrites=true&w=majority&maxPoolSize=1&bufferCommands=false';
  }

  // Add connection event listeners
  mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB successfully');
  });

  mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
  });

  mongoose.connection.on('disconnected', () => {
    console.log('MongoDB disconnected');
  });

  // Connect with retry logic for serverless
  const connectWithRetry = () => {
    mongoose.connect(mongoUri, mongooseOptions)
      .then(() => {
        console.log('Connected to MongoDB successfully');
      })
      .catch((err) => {
        console.error('MongoDB connection error:', err);
        if (process.env.VERCEL) {
          // For serverless, don't retry immediately
          console.log('Connection failed in serverless environment');
        } else {
          // For regular server, retry after 5 seconds
          setTimeout(connectWithRetry, 5000);
        }
      });
  };

  connectWithRetry();
} else {
  console.error('MONGODB_URI environment variable is not set');
  if (!process.env.VERCEL) {
    process.exit(1);
  }
}

// Only start server if not in serverless environment
if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`API URL: http://localhost:${PORT}/api`);
  });
}

module.exports = app; 