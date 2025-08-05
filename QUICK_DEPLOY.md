# 🚀 Quick Deployment Guide

## Prerequisites
- GitHub repository with your code
- MongoDB Atlas account
- Vercel account (free)
- Railway account (free)

## Step 1: Set up MongoDB Atlas
1. Go to [MongoDB Atlas](https://cloud.mongodb.com)
2. Create a free cluster
3. Create a database user
4. Get your connection string
5. Add `0.0.0.0/0` to IP whitelist

## Step 2: Deploy Backend (Railway)
1. Go to [Railway](https://railway.app)
2. Click "New Project" → "Deploy from GitHub repo"
3. Select your repository
4. Set root directory to `backend`
5. Add environment variables:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/threadswear_pk
   JWT_SECRET=your-super-secret-key
   NODE_ENV=production
   ```
6. Deploy and copy your Railway URL

## Step 3: Deploy Frontend (Vercel)
1. Go to [Vercel](https://vercel.com)
2. Click "New Project" → Import your GitHub repo
3. Configure:
   - Framework: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. Add environment variable:
   ```
   VITE_API_URL=https://your-railway-app.railway.app/api
   ```
5. Deploy

## Step 4: Test Your Deployment
```bash
# Test locally
npm run test:deployment

# Or test manually
curl https://your-railway-app.railway.app/api/health
```

## Quick Commands
```bash
# Windows
deploy.bat

# Linux/Mac
chmod +x deploy.sh
./deploy.sh

# Manual deployment
npm run deploy:railway  # Backend
npm run deploy:vercel   # Frontend
```

## Environment Variables

### Backend (Railway)
- `MONGODB_URI`: Your MongoDB connection string
- `JWT_SECRET`: Secret key for JWT tokens
- `NODE_ENV`: production

### Frontend (Vercel)
- `VITE_API_URL`: Your Railway backend URL + `/api`

## Troubleshooting
- Check logs in Railway and Vercel dashboards
- Verify environment variables are set correctly
- Test API endpoints individually
- Check CORS configuration if you get CORS errors

## Support
- Railway Docs: https://docs.railway.app/
- Vercel Docs: https://vercel.com/docs
- MongoDB Atlas: https://docs.atlas.mongodb.com/ 