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

// Database connection middleware
app.use('/api', async (req, res, next) => {
  if (!isConnected && mongoose.connection.readyState !== 1) {
    try {
      await connectDB();
    } catch (error) {
      console.error('Database connection failed:', error);
      return res.status(500).json({ 
        success: false, 
        message: 'Database connection failed' 
      });
    }
  }
  next();
});

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

// MongoDB connection setup
let isConnected = false;

const connectDB = async () => {
  if (isConnected) {
    console.log('Using existing database connection');
    return;
  }

  if (!process.env.MONGODB_URI) {
    console.error('MONGODB_URI environment variable is not set');
    if (!process.env.VERCEL) {
      process.exit(1);
    }
    return;
  }

  try {
    const mongooseOptions = {
      maxPoolSize: 1,
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
      bufferCommands: true, // Enable buffering for serverless
      bufferMaxEntries: 0,
      connectTimeoutMS: 10000,
      retryWrites: true,
      w: 'majority'
    };

    // Add connection options to URI
    let mongoUri = process.env.MONGODB_URI;
    if (!mongoUri.includes('?')) {
      mongoUri += '?retryWrites=true&w=majority';
    }

    await mongoose.connect(mongoUri, mongooseOptions);
    isConnected = true;
    console.log('Connected to MongoDB successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    if (!process.env.VERCEL) {
      process.exit(1);
    }
  }
};

// Connect to MongoDB
connectDB();

// Add connection event listeners
mongoose.connection.on('connected', () => {
  console.log('MongoDB connected');
  isConnected = true;
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
  isConnected = false;
});

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected');
  isConnected = false;
});

// Only start server if not in serverless environment
if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`API URL: http://localhost:${PORT}/api`);
  });
}

module.exports = app; 