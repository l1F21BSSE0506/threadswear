# 🚀 Deployment Guide - Threadswear.pk

## Overview
This guide explains how to deploy the Threadswear.pk application to Vercel (frontend) and Railway (backend).

## Prerequisites
- GitHub repository: `https://github.com/l1F21BSSE0506/threadswear.git`
- MongoDB Atlas account
- Vercel account
- Railway account

## Backend Deployment (Railway)

### 1. MongoDB Atlas Setup
1. Create a free MongoDB Atlas cluster
2. Set up database user with read/write permissions
3. Allow network access from anywhere (0.0.0.0/0)
4. Get your connection string

### 2. Railway Deployment
1. Go to [Railway](https://railway.app/)
2. Connect your GitHub repository
3. Set root directory to `backend`
4. Add environment variables:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/threadswear_pk
   JWT_SECRET=your-secret-key
   JWT_EXPIRE=24h
   NODE_ENV=production
   PORT=5000
   ```
5. Deploy and get your Railway URL

## Frontend Deployment (Vercel)

### 1. Update API Configuration
Update `src/services/api.js` with your Railway backend URL:
```javascript
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://your-railway-app.railway.app/api'
  : 'http://localhost:5000/api';
```

### 2. Vercel Deployment
1. Go to [Vercel](https://vercel.com/)
2. Import your GitHub repository
3. Configure:
   - Framework: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. Add environment variable: `NODE_ENV=production`
5. Deploy

## Environment Variables

### Backend (Railway)
- `MONGODB_URI`: Your MongoDB Atlas connection string
- `JWT_SECRET`: Secret key for JWT tokens
- `JWT_EXPIRE`: Token expiration time
- `NODE_ENV`: Set to `production`
- `PORT`: Railway will set this automatically

### Frontend (Vercel)
- `NODE_ENV`: Set to `production`

## Post-Deployment

### 1. Initialize Database
After deployment, you need to initialize your database with sample data:
1. Access your Railway backend URL
2. Use the admin dashboard or API endpoints to add products
3. Create admin user if needed

### 2. Test Your Application
1. Visit your Vercel frontend URL
2. Test all features: login, product browsing, bidding, etc.
3. Check admin dashboard functionality

## Troubleshooting

### Common Issues
1. **CORS Errors**: Update CORS configuration in `backend/server.js`
2. **Database Connection**: Verify MongoDB Atlas connection string
3. **Environment Variables**: Ensure all variables are set in Railway
4. **Build Errors**: Check Vercel build logs for frontend issues

### Support
- Railway Documentation: https://docs.railway.app/
- Vercel Documentation: https://vercel.com/docs
- MongoDB Atlas Documentation: https://docs.atlas.mongodb.com/ 