# MongoDB Atlas Setup Guide - Threadswear.pk

## 🗄️ MongoDB Atlas Setup Steps

### 1. Account Creation
- Go to: https://www.mongodb.com/atlas
- Click "Try Free" or "Sign Up"
- Create account with your email

### 2. Create Database Cluster
- Choose "FREE" plan (M0)
- Select Cloud Provider: AWS/Google Cloud/Azure
- Select Region: Mumbai (India) or closest
- Click "Create"

### 3. Create Database User
- Go to: Security → Database Access
- Click "Add New Database User"
- Username: `threadswear_user`
- Password: `threadswear123456`
- Role: "Read and write to any database"
- Click "Add User"

### 4. Allow Network Access
- Go to: Security → Network Access
- Click "Add IP Address"
- Click "Allow Access from Anywhere" (0.0.0.0/0)
- Click "Confirm"

### 5. Get Connection String
- Go to: Database → Connect
- Choose "Connect your application"
- Copy the connection string

### 6. Update Connection String
Replace with your details:
```
mongodb+srv://threadswear_user:threadswear123456@cluster0.xxxxx.mongodb.net/threadswear_db?retryWrites=true&w=majority
```

### 7. Set Environment Variables in Vercel
Add these in Vercel dashboard:
```
MONGODB_URI = mongodb+srv://threadswear_user:threadswear123456@cluster0.xxxxx.mongodb.net/threadswear_db?retryWrites=true&w=majority
JWT_SECRET = threadswear-super-secret-jwt-key-2024
NODE_ENV = production
```

## ✅ Test Connection
After setup, test your connection:
```
https://your-backend-url.vercel.app/api/health
```

Should return: `{"status":"OK","message":"Threadswear.pk API is running"}` 