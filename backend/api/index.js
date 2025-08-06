// Vercel serverless function entry point
try {
  console.log('Starting serverless function...');
  console.log('Environment variables:', {
    NODE_ENV: process.env.NODE_ENV,
    MONGODB_URI: process.env.MONGODB_URI ? 'SET' : 'NOT SET',
    JWT_SECRET: process.env.JWT_SECRET ? 'SET' : 'NOT SET',
    VERCEL: process.env.VERCEL
  });
  
  const app = require('../server');
  console.log('Server loaded successfully');
  
  // Export the Express app as a Vercel function
  module.exports = app;
} catch (error) {
  console.error('Error loading serverless function:', error);
  throw error;
} 