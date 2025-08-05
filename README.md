# Threadswear.pk - Second-Hand Fashion Marketplace

A modern, fully functional second-hand fashion marketplace built with React, Node.js, and MongoDB. Features real-time bidding, user authentication, and a beautiful responsive design.

## Features

### 🛍️ **Product Management**
- Browse products by category (Men, Women, Kids)
- Real-time product filtering and search
- Product condition indicators (Excellent, Good, Fair, Poor)
- Stock management and availability tracking
- Product ratings and reviews

### 💰 **Bidding System**
- Real-time bidding on products
- Current bid tracking
- Bid history display
- Automatic bid validation

### 👤 **User Authentication**
- Secure login/registration system
- Role-based access (Admin, Seller, Buyer)
- JWT token authentication
- Protected routes

### 🎨 **Modern UI/UX**
- Responsive design for all devices
- Beautiful animations and transitions
- Elegant color scheme and typography
- Loading states and error handling

### 🔧 **Admin Features**
- Product management dashboard
- User management
- Order tracking
- Analytics and reporting

## Tech Stack

### Frontend
- **React 18** - Modern UI framework
- **Vite** - Fast build tool
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Axios** - HTTP client

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing

## Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **MongoDB** (local installation or MongoDB Atlas)

## Installation & Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd asf
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create environment file
cp config.env.example config.env
```

### 3. Configure Environment Variables

Edit `backend/config.env` with your configuration:

```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/threadswear
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=7d
COOKIE_EXPIRE=7
```

### 4. Start MongoDB

Make sure MongoDB is running on your system:

```bash
# Start MongoDB service
mongod
```

### 5. Seed the Database

```bash
# Run the seed script to create sample data
npm run seed
```

This will create:
- Admin user (email: admin@threadswear.pk, password: admin123)
- Sample products with images and bidding data

### 6. Start Backend Server

```bash
# Start the development server
npm run dev
```

The backend will be running on `http://localhost:5000`

### 7. Frontend Setup

Open a new terminal and navigate to the project root:

```bash
# Install frontend dependencies
npm install

# Start the development server
npm run dev
```

The frontend will be running on `http://localhost:5173`

## Usage

### Default Admin Account
- **Email**: admin@threadswear.pk
- **Password**: admin123

### Features Available

1. **Browse Products**: Visit the homepage to see all available products
2. **Category Filtering**: Use the dropdown to filter by Men, Women, or Kids
3. **Product Details**: Click on any product to view details and place bids
4. **Bidding**: Log in to place bids on products with bidding enabled
5. **Admin Dashboard**: Access seller dashboard for product management

### API Endpoints

#### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get user profile

#### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `POST /api/products/new` - Create new product (Seller/Admin)
- `PUT /api/products/:id` - Update product (Seller/Admin)
- `DELETE /api/products/:id` - Delete product (Seller/Admin)
- `POST /api/products/:id/bid` - Place bid on product

#### Orders
- `POST /api/orders/new` - Create new order
- `GET /api/orders/me` - Get user orders
- `GET /api/orders/:id` - Get single order

## Project Structure

```
asf/
├── backend/                 # Backend server
│   ├── config.env          # Environment variables
│   ├── middleware/         # Express middleware
│   ├── models/            # MongoDB models
│   ├── routes/            # API routes
│   ├── uploads/           # File uploads
│   ├── utils/             # Utility functions
│   ├── package.json       # Backend dependencies
│   └── server.js          # Server entry point
├── src/                   # Frontend React app
│   ├── components/        # Reusable components
│   ├── context/          # React context providers
│   ├── pages/            # Page components
│   ├── services/         # API services
│   ├── App.jsx           # Main app component
│   └── main.jsx          # App entry point
├── package.json          # Frontend dependencies
└── README.md            # Project documentation
```

## Development

### Adding New Features

1. **Backend**: Add new routes in `backend/routes/`
2. **Frontend**: Create new components in `src/components/`
3. **API Integration**: Update `src/services/api.js`

### Database Schema

#### User Model
- name, email, password, role, isVerified, createdAt

#### Product Model
- name, description, price, condition, category, brand, size, color, images, seller, stock, isBiddingEnabled, bids, ratings, reviews

#### Order Model
- orderItems, shippingInfo, paymentInfo, user, status, totalPrice, paidAt, deliveredAt

## Deployment

### Backend Deployment
1. Set up MongoDB Atlas or cloud MongoDB instance
2. Update environment variables for production
3. Deploy to Heroku, Vercel, or your preferred platform

### Frontend Deployment
1. Build the project: `npm run build`
2. Deploy the `dist` folder to Netlify, Vercel, or your preferred platform

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions, please open an issue in the repository or contact the development team.

---

**Threadswear.pk** - Quality Second-Hand, Imported Fashion at Flea Market Prices 