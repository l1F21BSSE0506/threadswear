#!/bin/bash

# Threadswear.pk Deployment Script
# This script helps deploy the application to Vercel and Railway

echo "🚀 Threadswear.pk Deployment Script"
echo "=================================="

# Check if required tools are installed
check_tools() {
    echo "Checking required tools..."
    
    if ! command -v node &> /dev/null; then
        echo "❌ Node.js is not installed. Please install Node.js first."
        exit 1
    fi
    
    if ! command -v npm &> /dev/null; then
        echo "❌ npm is not installed. Please install npm first."
        exit 1
    fi
    
    echo "✅ Node.js and npm are installed"
}

# Install dependencies
install_deps() {
    echo "Installing dependencies..."
    
    echo "Installing frontend dependencies..."
    npm install
    
    echo "Installing backend dependencies..."
    cd backend
    npm install
    cd ..
    
    echo "✅ Dependencies installed successfully"
}

# Deploy backend to Railway
deploy_backend() {
    echo "Deploying backend to Railway..."
    
    if ! command -v railway &> /dev/null; then
        echo "Installing Railway CLI..."
        npm install -g @railway/cli
    fi
    
    cd backend
    
    echo "Please make sure you have:"
    echo "1. Railway account and CLI logged in"
    echo "2. MongoDB Atlas connection string"
    echo "3. JWT secret key"
    
    read -p "Press Enter to continue with Railway deployment..."
    
    railway up
    
    cd ..
    echo "✅ Backend deployment initiated"
}

# Deploy frontend to Vercel
deploy_frontend() {
    echo "Deploying frontend to Vercel..."
    
    if ! command -v vercel &> /dev/null; then
        echo "Installing Vercel CLI..."
        npm install -g vercel
    fi
    
    echo "Please make sure you have:"
    echo "1. Vercel account and CLI logged in"
    echo "2. Railway backend URL"
    
    read -p "Press Enter to continue with Vercel deployment..."
    
    vercel --prod
    
    echo "✅ Frontend deployment initiated"
}

# Main menu
main_menu() {
    while true; do
        echo ""
        echo "Choose an option:"
        echo "1) Check tools and install dependencies"
        echo "2) Deploy backend to Railway"
        echo "3) Deploy frontend to Vercel"
        echo "4) Deploy both (backend first, then frontend)"
        echo "5) Exit"
        
        read -p "Enter your choice (1-5): " choice
        
        case $choice in
            1)
                check_tools
                install_deps
                ;;
            2)
                deploy_backend
                ;;
            3)
                deploy_frontend
                ;;
            4)
                check_tools
                install_deps
                deploy_backend
                echo "Waiting for backend deployment to complete..."
                sleep 10
                deploy_frontend
                ;;
            5)
                echo "Goodbye! 👋"
                exit 0
                ;;
            *)
                echo "Invalid option. Please try again."
                ;;
        esac
    done
}

# Run main menu
main_menu 