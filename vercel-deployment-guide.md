# Vercel Deployment Guide - Threadswear.pk

This guide will help you deploy both frontend and backend on Vercel.

## 🚀 Backend Deployment

### 1. Create Backend Project
- Go to: https://vercel.com/dashboard
- Click "New Project"
- Import GitHub repository: `threadswear`

### 2. Configure Backend Settings
- **Project Name**: `threadswear-backend`
- **Root Directory**: `backend`
- **Framework Preset**: "Other"
- **Build Command**: (leave empty)
- **Output Directory**: (leave empty)
- **Install Command**: `npm install`
- **Development Command**: `npm start`

### 3. Add Environment Variables
```
MONGODB_URI = mongodb+srv://threadswear_user:threadswear123456@cluster0.qbbtu6z.mongodb.net/threadswear_db?retryWrites=true&w=majority
JWT_SECRET = threadswear-super-secret-jwt-key-2024
NODE_ENV = production
```

### 4. Deploy Backend
- Click "Deploy"
- Wait for deployment to complete
- Copy the backend URL (e.g., `https://threadswear-backend.vercel.app`)

## 🌐 Frontend Deployment

### 1. Create Frontend Project
- Go to: https://vercel.com/dashboard
- Click "New Project"
- Import GitHub repository: `threadswear` (same repo)

### 2. Configure Frontend Settings
- **Project Name**: `threadswear-frontend`
- **Root Directory**: (leave empty - root)
- **Framework Preset**: "Vite"
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`
- **Development Command**: `npm run dev`

### 3. Add Environment Variable
```
VITE_API_URL = https://your-backend-url.vercel.app/api
```
Replace `your-backend-url` with your actual backend URL

### 4. Deploy Frontend
- Click "Deploy"
- Wait for deployment to complete

## ✅ Test Your Deployment

### Backend Test
```
https://your-backend-url.vercel.app/api/health
```
Should return: `{"status":"OK","message":"Threadswear.pk API is running"}`

### Frontend Test
```
https://your-frontend-url.vercel.app
```
Should show your website homepage

## 🔧 Troubleshooting

### If Backend Fails:
1. Check environment variables are set correctly
2. Verify MongoDB Atlas connection
3. Check Vercel build logs

### If Frontend Shows Blank:
1. Verify VITE_API_URL is set correctly
2. Check browser console for errors
3. Ensure backend URL is accessible

## 📱 Final URLs
- **Backend**: `https://threadswear-backend.vercel.app`
- **Frontend**: `https://threadswear-frontend.vercel.app`

## 🎯 Benefits of Vercel-Only Deployment
- **Unified Dashboard**: Manage both frontend and backend in one place
- **Better Integration**: Seamless communication between services
- **Simplified CI/CD**: Single platform for all deployments
- **Cost Effective**: No need for multiple hosting services 