# Deployment Guide for Threadswear.pk

This guide will help you deploy your Threadswear.pk application on Vercel (frontend) and Railway (backend).

## Prerequisites

1. **GitHub Account**: Your code should be in a GitHub repository
2. **MongoDB Atlas**: Set up a MongoDB database cluster
3. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
4. **Railway Account**: Sign up at [railway.app](https://railway.app)

## Step 1: Set up MongoDB Atlas

1. Go to [MongoDB Atlas](https://cloud.mongodb.com)
2. Create a new cluster (free tier is fine)
3. Create a database user with read/write permissions
4. Get your connection string
5. Add your IP address to the whitelist (or use 0.0.0.0/0 for all IPs)

## Step 2: Deploy Backend to Railway

### Option A: Using Railway CLI

1. Install Railway CLI:
   ```bash
   npm install -g @railway/cli
   ```

2. Login to Railway:
   ```bash
   railway login
   ```

3. Navigate to backend directory:
   ```bash
   cd backend
   ```

4. Initialize Railway project:
   ```bash
   railway init
   ```

5. Set environment variables:
   ```bash
   railway variables set MONGODB_URI="your_mongodb_connection_string"
   railway variables set JWT_SECRET="your_super_secret_jwt_key"
   railway variables set NODE_ENV="production"
   ```

6. Deploy:
   ```bash
   railway up
   ```

### Option B: Using Railway Dashboard

1. Go to [Railway Dashboard](https://railway.app/dashboard)
2. Click "New Project"
3. Select "Deploy from GitHub repo"
4. Connect your GitHub account and select your repository
5. Set the root directory to `backend`
6. Add environment variables in the Variables tab:
   - `MONGODB_URI`: Your MongoDB connection string
   - `JWT_SECRET`: Your JWT secret key
   - `NODE_ENV`: production

## Step 3: Deploy Frontend to Vercel

### Option A: Using Vercel CLI

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Login to Vercel:
   ```bash
   vercel login
   ```

3. Navigate to project root:
   ```bash
   cd ..
   ```

4. Deploy:
   ```bash
   vercel --prod
   ```

5. Set environment variables:
   ```bash
   vercel env add VITE_API_URL
   # Enter your Railway backend URL: https://your-app.railway.app/api
   ```

### Option B: Using Vercel Dashboard

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Import your GitHub repository
4. Configure the project:
   - Framework Preset: Vite
   - Root Directory: ./
   - Build Command: `npm run build`
   - Output Directory: `dist`
5. Add environment variable:
   - `VITE_API_URL`: Your Railway backend URL (e.g., `https://your-app.railway.app/api`)

## Step 4: Update CORS Settings

After deployment, you may need to update CORS settings in your backend. Update `backend/server.js`:

```javascript
// Update CORS configuration
app.use(cors({
  origin: [
    'https://your-frontend-domain.vercel.app',
    'http://localhost:5173' // for local development
  ],
  credentials: true
}));
```

## Step 5: Test Your Deployment

1. **Test Backend Health Check**:
   ```
   GET https://your-backend-domain.railway.app/api/health
   ```

2. **Test Frontend**:
   Visit your Vercel domain and test the application

3. **Test API Integration**:
   - Try logging in
   - Browse products
   - Test all major functionality

## Environment Variables Reference

### Backend (Railway)
- `MONGODB_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT tokens
- `NODE_ENV`: Set to "production"
- `PORT`: Railway sets this automatically

### Frontend (Vercel)
- `VITE_API_URL`: Your Railway backend API URL

## Troubleshooting

### Common Issues

1. **CORS Errors**:
   - Make sure your frontend domain is in the CORS whitelist
   - Check that the API URL is correct

2. **MongoDB Connection Issues**:
   - Verify your connection string
   - Check if your IP is whitelisted in MongoDB Atlas
   - Ensure your database user has correct permissions

3. **Build Failures**:
   - Check that all dependencies are in package.json
   - Verify Node.js version compatibility

4. **Environment Variables**:
   - Ensure all required variables are set
   - Check variable names match exactly

### Debugging Commands

```bash
# Check Railway logs
railway logs

# Check Vercel deployment status
vercel ls

# Test API locally
curl http://localhost:5000/api/health
```

## Production Checklist

- [ ] MongoDB Atlas cluster is running
- [ ] Environment variables are set correctly
- [ ] CORS is configured for production domains
- [ ] JWT secret is strong and unique
- [ ] All API endpoints are working
- [ ] Frontend can connect to backend
- [ ] File uploads work (if applicable)
- [ ] Error handling is working
- [ ] Performance is acceptable

## Monitoring

### Railway
- Monitor your app in the Railway dashboard
- Check logs for errors
- Monitor resource usage

### Vercel
- Use Vercel Analytics (if enabled)
- Monitor build times and performance
- Check deployment status

## Support

If you encounter issues:
1. Check the logs in both Railway and Vercel dashboards
2. Verify all environment variables are set correctly
3. Test API endpoints individually
4. Check browser console for frontend errors 