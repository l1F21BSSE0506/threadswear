@echo off
chcp 65001 >nul
echo 🚀 Threadswear.pk Deployment Script
echo ==================================

:menu
echo.
echo Choose an option:
echo 1) Check tools and install dependencies
echo 2) Deploy backend to Railway
echo 3) Deploy frontend to Vercel
echo 4) Deploy both (backend first, then frontend)
echo 5) Exit
echo.

set /p choice="Enter your choice (1-5): "

if "%choice%"=="1" goto check_tools
if "%choice%"=="2" goto deploy_backend
if "%choice%"=="3" goto deploy_frontend
if "%choice%"=="4" goto deploy_both
if "%choice%"=="5" goto exit
echo Invalid option. Please try again.
goto menu

:check_tools
echo Checking required tools...
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js is not installed. Please install Node.js first.
    pause
    goto menu
)

npm --version >nul 2>&1
if errorlevel 1 (
    echo ❌ npm is not installed. Please install npm first.
    pause
    goto menu
)

echo ✅ Node.js and npm are installed
call :install_deps
goto menu

:install_deps
echo Installing dependencies...
echo Installing frontend dependencies...
npm install

echo Installing backend dependencies...
cd backend
npm install
cd ..

echo ✅ Dependencies installed successfully
goto menu

:deploy_backend
echo Deploying backend to Railway...

railway --version >nul 2>&1
if errorlevel 1 (
    echo Installing Railway CLI...
    npm install -g @railway/cli
)

cd backend

echo Please make sure you have:
echo 1. Railway account and CLI logged in
echo 2. MongoDB Atlas connection string
echo 3. JWT secret key
echo.

pause

railway up

cd ..
echo ✅ Backend deployment initiated
pause
goto menu

:deploy_frontend
echo Deploying frontend to Vercel...

vercel --version >nul 2>&1
if errorlevel 1 (
    echo Installing Vercel CLI...
    npm install -g vercel
)

echo Please make sure you have:
echo 1. Vercel account and CLI logged in
echo 2. Railway backend URL
echo.

pause

vercel --prod

echo ✅ Frontend deployment initiated
pause
goto menu

:deploy_both
call :check_tools
call :deploy_backend
echo Waiting for backend deployment to complete...
timeout /t 10 /nobreak >nul
call :deploy_frontend
goto menu

:exit
echo Goodbye! 👋
pause
exit /b 0 